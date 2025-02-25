<script setup>
    import { ref } from 'vue';
    import StudentsList from '@/components/StudentsList.vue';
    import Program from '@/obj/Program.js';
    import Group from '@/obj/Group.js';
    const props = defineProps({
        program: Program,
    });
    const selectedStudents = ref([]);
    const selectedStudent = ref(-1);
    const selectedOptions = ref([]);
    const selections = ref({});
    function getStudent(index){
        console.log(index);
        selectedStudent.value = index;

    }
    function selectAll(){
        for (let i = 0; i < props.program.students.length; i++){
            selectedStudents.value.push(i);
        }
    }
    function getChoiceTitle(selection){
        let fullTitle = props.program.getSubjectById(selection.subjID).name;
        if (selection.HL){
            fullTitle += " HL";
        }
        else{
            fullTitle += " SL"
        }
        return fullTitle;
    }
    function assign(){
        //figure out all the requirements in the list. 
        console.log("Selections:---");
        console.log(selections.value);
        for (let key in selections.value){
            let subject = props.program.getSubjectById(selections.value[key].subjID);
            let courseSequence = subject.courseSequence;
            if (selections.value[key].HL){
                courseSequence = subject.HL_CourseSequence
            }
            
            for (let req in courseSequence){
                //loop through the courses
                let courseID = courseSequence[req].courseID
                let targetGrade = courseSequence[req].year;
                //loop through the students to assign to
                for (let studentIndex of selectedStudents.value){
                    console.log("studentindex: ", studentIndex);
                    let student = props.program.students[studentIndex];
                    if (student.grade == targetGrade){
                        console.log("Assigning ", courseID, "to ", student.name);
                        student.assignCourse(courseID);
                    }   
                }
            }
        }
        //checking our work
        console.log(selectedStudents.value);

        
   }



    function makeSchedule(){
        let success = 0;
        let failure = 0;
        
        for (let studentIndex of selectedStudents.value){
            let student = props.program.students[studentIndex];
            let tries = 0;
            let foundSchedule = false;
            student.schedulingLog = [];
            while(!foundSchedule && tries < 20 ){
                //scramble the requirements order
                student.randomizeRequirements();
                student.clearSchedule(props.program.terms, props.program.periods);
                let logEntry = {'requirements': JSON.parse(JSON.stringify(student.requirements)), schedule: [], reason: ""};
                tries++;
                foundSchedule = true;
                for (let courseID of student.requirements){
                    let course = props.program.getCourseByID(courseID);
                    let r = course.findAvailableOffering(student);
                    if (!r){
                        console.log("failed at ", course.title);
                        logEntry.schedule = JSON.parse(JSON.stringify(student.tempSchedule));
                        logEntry.reason = courseID;
                        student.schedulingLog.push(logEntry);
                        foundSchedule = false;
                        break;
                    }
                                                          
                }               
            }
            if (!foundSchedule){
                console.log("I couldn't find a complete schedule for ", student.name);
            }
            else{
                student.adoptTempSchedule(props.program);
            }

        }
        alert("Failures: " + failure + " and Success: " + success);
        
                
    }
    function clearSchedules(){
        for (let studentIndex of selectedStudents.value){
            let student = props.program.students[studentIndex];
            student.clearSchedule(props.program.terms, props.program.periods, false);
        }
        console.log(props.program);
        for (let course of props.program.courses){
            console.log("Course: ", course);
            course.clearStudents ();
        }
        alert("Schedules cleared");
    }
    /*---Now it is time to schedule.  For now I'm going to just do this one:
    so a student needs a schedule (program.terms x program.periods)
    each slot holds an offering (subjectID, Offering slot). This gets REALLY hard to clean up later.
    for each student
    for each required subject
        get the offerings from the subject in order of students (fewest to most)
        check if the offering fits a spot in the students' schedule
        if so, assign it and fill that spot in the student's schedule
        if not, then try the next one until there are no more
        
    ----OR: 
    --Create all combinations -- like we did with the basic scenario builder
    --discard the ones with conflicts (two classes in the same period
    --discard the ones with overflow in the classes
    */

</script>

<template>
    <div id="flexContainer">
        <div id="studentlist">
            <b-button @click="selectAll()" >Select all </b-button>
        <h1>Select Students</h1>
        
        <b-select multiple v-model = "selectedStudents" native-size="10">
                <option v-for = "(student, index) in program.students" :value = "index">{{ student.name }} ({{ student.grade }})</option>
            </b-select>
        </div>

        <div>
            <h1>
                Build a Packet (you don't need to choose everything)
            </h1>
            <table>
                <thead>
                    <tr>
                        <th>Possible Subjects</th>
                        <th>Chosen Sequences</th>                        
                        <!-- TODO: the trouble is that I can't choose high/low level here. I need to go more like in teh Scenarios tab.  -->
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div id="groups">
        List all the groups with the subjects as dropdowns
        On Selection, fill the courses of the table
        <div v-for = "group in program.groups">
            <section>
            <b-dropdown type="is-primary" expanded v-model = "selections[group.name]" :icon-right = "active?'menu-up':'menu-down'">
                <template #trigger="{ active }">
                <b-button
                    :label = "typeof(selections[group.name]) == 'undefined'?group.name:getChoiceTitle(selections[group.name])"
                    type="is-primary" expanded
                    :icon-right="active ? 'menu-up' : 'menu-down'" />
                </template>
                <div v-for = "subject in group.subjects">            
                    <b-dropdown-item v-if = "program.getSubjectById(subject) != null && program.getSubjectById(subject).offersSL" :value = '{"subjID": subject, "HL": false}'>{{ program.getSubjectById(subject).name }} SL</b-dropdown-item>
                    <b-dropdown-item v-if = "program.getSubjectById(subject) != null && program.getSubjectById(subject).offersHL" :value = '{"subjID": subject, "HL": true}'>{{ program.getSubjectById(subject).name }} HL</b-dropdown-item>
                    <b-dropdown-item v-if = "program.getSubjectById(subject) == null">Error retrieving{{  subject }}</b-dropdown-item>
                </div>
            </b-dropdown>
            </section>
        </div>
    </div>
                        </td>
                        <td>
                            {{ selectedOptions }}
                        </td>
                    </tr>
                </tbody>
                
            </table>
           
        </div>
        <b-button @click="assign()">Assign..</b-button>
        <b-button @click="makeSchedule()">Make Schedule</b-button>
        <b-button @click="clearSchedules()">clear Schedule</b-button>
        

    </div>
    
</template>
<style scoped>
    #flexContainer{
        display: flex;
        flex-flow: row wrap;
        position: sticky; 
        top: 0px;
        max-height: 100vh;
        overflow-y: scroll;
        background: aliceblue;
    }
</style>