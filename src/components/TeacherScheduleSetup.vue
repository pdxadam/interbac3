<script setup>
    import { ref } from 'vue';
    import Program from '@/obj/Program.js';
    import Teacher from '@/obj/Teacher.js';
    import TeachersVue from '@/components/TeachersVue.vue';
    import OfferingVue from '@/components/OfferingVue.vue';
    import Offering from '@/obj/Offering.js';
    
    import CoursesVue from '@/components/CoursesVue.vue';
    const props = defineProps({
        program: Program,
        teachers: [Teacher],
    });
    const selectedTeacher = ref(null);
    const editTeacher = ref(false);
    const selectedCourse = ref(null);
    function setOffering(term, period){
        if (selectedClass.value != null && selectedTeacher.value != null){

            let newOffering = selectedClass.value.createOffering(selectedTeacher.value.id, term, period);
            console.log(newOffering);
        }
    }
    function addTeacher(){
        let periods = 5;
        let terms = 3;
        if (props.teachers.count > 0){
            periods = props.teachers[0].periods;
            terms = props.teachers[0].terms;

        }
        props.teachers.unshift(new Teacher("--new--",terms, periods));
    }
    function selectCourse(c){
        selectedCourse.value = c;
        console.log(typeof c);

    }
    function selectTeacher(t){
        selectedTeacher.value = t;
        console.log(t);
    }
    function deleteOffering(objCourse, index){
        objCourse.offerings.splice(index, 1);
    }
    function shouldShowOffering(o, term, period){
        try{
            if (o.teacherID == selectedTeacher.value.id && o.term == term && o.period == period){
                return true;
            }
            else{
                return false;
            }
        }
        catch{
            return false;
        }
    }
    function pickOffering(c){
        selectedClass.value = c;
    }
    function swap(c,o, index){
        //puts the selected class in the current location and takes what's there as the new selectedClass
        deleteOffering(c, index);
        setOffering(o.term, o.period);
        selectedClass.value = c;
    }
</script>
<template>
    <nav>
        <!-- <h1>
            Teachers &nbsp; <b-button @click=addTeacher()> + </b-button></h1>
        <b-field>
            <div v-for = "t in teachers">
                <TeacherVue :teacher = t @click="selectedTeacher = t" />               
            </div>
        </b-field> -->
        Teachers
        <TeachersVue :teachers = teachers :program = program @teacherSelected = "(t) => selectTeacher(t)" />
    </nav>
    <div id="classList">
        <b-button @click = "selectedClass = null">Clear</b-button>
        Selected Class: {{ selectedClass==null?"[none]":selectedClass.title }}
        <br />
        <ClassesVue :classes = program.classes @classSelected = "(c) => selectClass(c)" />
    </div>
    <div id="selectedTeacher">
        <table v-if = "selectedTeacher != null">
        <thead>
            <tr>
                <td colspan="2">
                Key: Click to place the selected class.  Right-click to grab the class.  Alt+click to place and pick (swap)
                </td>
            </tr>
            <tr>
                <th v-if = "editTeacher"><input type='text' v-model = selectedTeacher.name /></th>
                <th v-else>{{ selectedTeacher.name }}</th>   
                <td><b-button @click = "editTeacher = !editTeacher">{{ editTeacher?"Save":"Edit" }}</b-button></td>        
            </tr>
            <tr >
                <td>&nbsp;</td>
                <td v-for = "i in program.terms">Term {{ i }}</td>
            </tr>

        </thead>
        <tbody>
        <tr v-for = "period in program.periods">
            <th>Course {{ period }}</th>
            <td v-for = "term in program.terms" @click="setOffering(term, period)">
                <!-- loop through the classes, then through the offerings and see fi the term, period, and teacherid match-->
                <div v-for = "c in program.classes">
                    <div v-for = "o, index in c.offerings">
                        <OfferingVue  v-if = "shouldShowOffering(o, term, period)" :offering = o @click.exact = "deleteOffering(c, index)" @click.alt.stop.prevent ="swap(c, o, index)" @click.right.prevent = "pickOffering(c);"/>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
    </table>
    </div>
    
</template>

<style scoped>
    nav{
        width: 150px;
        float: left;
    }
    #selectedTeacher{
        margin-left: 225px;
    }
    #courseList{
        float: right;
    }
    td{
        border: 1px dashed grey;
        width: 18%;
        padding: 2px 4px;
        font-size: 0.8rem;
    }
</style>
