<script setup>
    import { onMounted, ref } from 'vue';
    import Program from '../obj/Program.js';
    import Group from '../obj/Group.js';
    import CoursesVue from '@/components/CoursesVue.vue';
    import GroupsVue from '@/components/GroupsVue.vue';
    import School from '@/obj/School.js';
    import TeacherCourseSetup from '@/components/TeacherCourseSetup.vue';
    import ScenarioSetup from '@/views/ScenarioSetup.vue';
    import SubjectsVue from '@/components/SubjectsVue.vue';
    import AllTeachers from '@/components/AllTeachers.vue';
    import StudentsList from '@/components/StudentsList.vue';
    import edsuite from '@/EdSuite/edsuite.js';
    import StudentScheduler from '@/views/StudentScheduler.vue';
    const props = defineProps({       
        school: School,
    });
    const myedsuite = edsuite.GetAxios();
    const selectedProgram = ref(null);
    const selectedIndex = ref(null);
    const selectedGroup = ref(null);
    const editProgram = ref(false);
    
    function addGroup(){
        selectedProgram.value.groups.unshift(new Group("New Group"));
    }
    function createProgram(){
        props.school.programs.unshift(new Program("New Program", props.school.teachers));
    }
    function copyProgram(){
        var jProgram = JSON.stringify(selectedProgram.value);
        let newProgram = Program.FromJson(JSON.parse(jProgram));
        newProgram.name = "Copy of " + newProgram.name;
        props.school.programs.push(newProgram);
    }
    function selectProgram(program, index){
        selectedIndex.value = index;
        selectedProgram.value = program;
    }
    function deleteProgram(){
        
        if (confirm("Are you sure you want to delete this program (" + selectedProgram.value.name + ")? (Consider backing up your school first. )")){
            props.school.programs.splice(selectedIndex.value, 1);
            selectedProgram.value = null;
            selectedIndex.value = null;
            editProgram.value = false;
        }
    }
    
</script>
<template>    
    <nav>
        <h1>Programs</h1>
        <b-button @click=createProgram> + </b-button>
        <ul>
            <li v-for="program, index in school.programs" @click="selectProgram(program, index);">
                {{ program.name }} 
            </li>
        </ul>
    </nav>

    <section v-if="selectedProgram != null" id="programDetails">
        <h1>
            <span v-if="!editProgram">{{ selectedProgram.name }}</span>
            <span v-else><input type="text" v-model = selectedProgram.name /></span>
            <b-button @click="editProgram = !editProgram">{{ editProgram?"Save":"Edit" }}</b-button>
            <b-button @click="copyProgram" v-if="editProgram">Copy</b-button>
            <b-button @click = "deleteProgram" v-if="editProgram">Delete</b-button>
        </h1>
        <b-tabs>
            <b-tab-item label="Students">
                <StudentsList :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label="Courses">
                <CoursesVue :courses = selectedProgram.courses :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label="Subjects">
                <SubjectsVue :subjects = selectedProgram.subjects :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label="Subject Groups">
                <GroupsVue :groups = selectedProgram.groups :program = selectedProgram />

            </b-tab-item>
            <b-tab-item label="Teacher Schedules">
                <TeacherCourseSetup :teachers = selectedProgram.teachers :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label = "Complete Schedule">
                <AllTeachers :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label="Scenarios">
                <ScenarioSetup :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label="Student Scheduler">
                <StudentScheduler :program = selectedProgram />
            </b-tab-item>

        </b-tabs>
    
        
    </section>
    <section v-else>Select a program from the left</section>
    
</template>
<style scoped>
nav{
    width: 100px;
    border: 3px outset grey;
    float: left;
    margin-right: 10px;

}
nav ul{
    list-style: none;

}
nav li{
    font-size: 0.8rem;
    border: 1px solid black;
    margin: 5px 2px;
    padding: 1px 2px;
}
nav li:nth-child(even){
    background-color: lightgrey;
}
nav li:hover{
    background-color: aqua;
    cursor: pointer;
}
section{
    margin: 15px;
}
tbody tr:nth-child(even){
    background-color: rgb(227, 234, 250);
}
</style>
