<script setup>
    import { ref } from 'vue';
    import Program from '../obj/Program.js';
    import Group from '../obj/Group.js';
    import ClassesVue from '@/components/ClassesVue.vue';
    import GroupsVue from '@/components/GroupsVue.vue';
    import School from '@/obj/School.js';
    import TeacherClassSetup from '@/components/TeacherClassSetup.vue';
    import ScenarioSetup from '@/views/ScenarioSetup.vue';
    import SubjectsVue from '@/components/SubjectsVue.vue';
    const props = defineProps({
       
        school: School,
    });
    const selectedProgram = ref(null);
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
    
</script>
<template>    
    <nav>
        <h1>Programs</h1>
        <b-button @click=createProgram> + </b-button>
        <ul>
            <li v-for="program in school.programs" @click="selectedProgram = program">
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
        </h1>
        <b-tabs>
            <b-tab-item label="Classes">
                <ClassesVue :classes = selectedProgram.classes :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label="Subjects">
                <SubjectsVue :subjects = selectedProgram.subjects :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label="Subject Groups">
                <GroupsVue :groups = selectedProgram.groups :program = selectedProgram />

            </b-tab-item>
            <b-tab-item label="Teacher Schedules">
                <TeacherClassSetup :teachers = selectedProgram.teachers :program = selectedProgram />
            </b-tab-item>
            <b-tab-item label="Scenarios">
                <ScenarioSetup :program = selectedProgram />
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
