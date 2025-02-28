<script setup>
    import { ref } from 'vue';
    import Program from '@/obj/Program.js';
    import Teacher from '@/obj/Teacher.js';
    const props = defineProps({
        program: Program,

    });
    const chosenCourse = ref(null);
    const departments = ref([]);
    const chosenDepartment = ref("Show All");
    function getDepartments(){
        departments.value = [];
        for (let c of props.program.teachers){
            if (!(departments.value.includes(c.department))){
                departments.value.push(c.department);
                console.log(c.department);
            }
        }
        departments.value.sort();
       
    }
    function shouldShow(teacher){
            if (chosenDepartment.value == "Show All"){
                return true;
            }
            if (teacher.department == chosenDepartment.value){
                return true;
            }
            return false;
        }
    function getCourse(teacher){
        if (shouldShow(teacher)){
            return "visible";
        }
        else{
            return "hidden";
        }
    }
    function startDrag(event, offeringObject){
        
        console.log(offeringObject);
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('courseID', offeringObject.courseID);
        
        event.dataTransfer.setData('action', "move");
        event.dataTransfer.setData('offeringIndex', offeringObject.offeringIndex);
    }
    function dragNewOffering(event, courseID){
        event.dataTransfer.dropEffect = 'copy';
        event.dataTransfer.effectAllowed = 'copy';
        event.dataTransfer.setData('action', "new");    
        event.dataTransfer.setData('courseID', courseID);


    }
    function drop(event, objTarget){
        const action = event.dataTransfer.getData('action');
        const term = objTarget.term;
        const period = objTarget.period;
        const teacherID = objTarget.teacherID;
        const course = props.program.getCourseByID(event.dataTransfer.getData("courseID"));
        if (action == "new"){
            course.createOffering(teacherID, term, period);
            return;
        } 
        const offeringIndex = event.dataTransfer.getData("offeringIndex");       
        const offering = course.offerings[offeringIndex];
        console.log("offering:", offering);
        offering.term = term;
        offering.period = period;
        offering.teacherID = teacherID;
       
    }
    function dropTrash(event){
        const course = props.program.getCourseByID(event.dataTransfer.getData("courseID"));
        const offeringIndex = event.dataTransfer.getData("offeringIndex");
        event.target.classList.remove("dropHere");
        course.offerings.splice(offeringIndex,1);
    }
    function dragEnterTrash(event){
        event.preventDefault();
        event.target.classList.add("dropHere");
    }
    function dragExitTrash(event){
        event.preventDefault();
        event.target.classList.remove("dropHere");
    }
    getDepartments();
</script>
<template>
    By Department:
    <b-dropdown v-model = "chosenDepartment">
        <template #trigger>
            <b-button :label = chosenDepartment type="is-primary" />
        </template>
        <b-dropdown-item value="Show All" >
            Show All
        </b-dropdown-item>
        <b-dropdown-item v-for = "d in departments" :value = d>
            {{ d }}
        </b-dropdown-item>
    </b-dropdown>
    <div id="schedule">
        <div id="dragOptions">
            <b-select placeholder="select a course" v-model="chosenCourse">
                <option v-for = "c in program.courses" :value="c">{{ c.title }}</option>
              

            </b-select>
            
            <div class='dragElement' draggable="true" :key = chosenCourse.courseID @dragstart="dragNewOffering($event, chosenCourse.courseID);" v-if="chosenCourse != null">{{ chosenCourse.title  }}</div>
            <div id="trash" @dragend = "dragExitTrash($event);" @dragover.prevent @dragenter = "dragEnterTrash($event)" @dragleave = "dragExitTrash($event);" @drop="dropTrash($event)">
                <b-icon @dragenter.prevent icon="delete" size="is-large" type="is-danger" /></div>
        </div>    
        <div id="schedules">
    <table v-for = "n in program.terms">
        <thead>
            <tr>
                <th :colspan = "program.teachers.length">Term {{ n }}</th>
            </tr>
            <tr>
                <template v-for = "teacher in program.teachers">
                <th v-if="shouldShow(teacher)" :course="getCourse(teacher)">
                    
                       {{ teacher.name }}
                    
                </th>
                </template>
            </tr>
        </thead>
        <tbody>
            <tr v-for = "period in program.periods">
                <template v-for = "teacher in program.teachers" :key = teacher.id>
                <td  v-if = "shouldShow(teacher)" :course="getCourse(teacher)" @dragover.prevent @dragenter.prevent @drop="drop($event, {term: n, period: period, teacherID: teacher.id})">
                
                        <div v-for = "c in program.courses" :key = c>
                            <div v-for = "o, index in c.offerings">
                                <div :key="index" v-if = "o.teacherID == teacher.id && o.term == n && o.period == period" draggable="true" class="dragElement"  @dragstart = "startDrag($event, {courseID:c.courseID,offeringIndex:index});">
                                    {{ c.title }} <br />({{ o.studentCount }})
                                </div>
                            </div>
                        </div>
                    
                </td>
            </template>
            </tr>
        </tbody>
    </table>
    </div>
</div>

</template>
<style scoped>
    #dragOptions{
        width: 100px;
        background-color: white;
    }
    #trash{
        text-align: center;
        margin-top: 50px;
    }
    .dropHere{
        background-color: dodgerblue;
    }
    #schedule{
        display: flex;
        flex-flow: row wrap;
        background-color: navy;
        justify-content: space-around;
    }
    #schedules{
        width: calc(100% - 105px);
        display: flex;
        flex-flow: row wrap;
    }
    table{
        background-color: white;
        overflow-x: scroll;
        border-collapse: collapse;
        margin: 5px 2px;

    }
    td, th{
        border: 1px solid black;
        padding: 2px;
        width: 200px !important;
    }
    tr{
        border: 2px solid navy;
    }
    tr:nth-child(odd){
        background-color: whitesmoke;
    }
    .hidden{
        display: none;
    }
    .dragElement{
        user-select: none;
        background-color: skyblue;
        border: 1px dashed navy;
        font-weight: bold;
        display: block;
    }
</style>