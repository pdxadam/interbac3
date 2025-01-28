<script setup>
    import { ref } from 'vue';
    import Program from '../obj/Program.js';
    import Group from '../obj/Group.js';
    import ClassesVue from '@/components/ClassesVue.vue';
    import GroupsVue from '@/components/GroupsVue.vue';
    import School from '@/obj/School.js';
    import TeacherClassSetup from '@/components/TeacherClassSetup.vue';
    import ScenarioSetup from '@/views/ScenarioSetup.vue';
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
</script>
<template>    
    <nav>
        <h1>Programs</h1>
        <b-button @click=createProgram> + </b-button>
        <ul>
            <li v-for="program in school.programs" @click="selectedProgram = program">{{ program.name }}</li>
        </ul>
    </nav>

    <section v-if="selectedProgram != null" id="programDetails">
        <h1>
            <span v-if="!editProgram">{{ selectedProgram.name }}</span>
            <span v-else><input type="text" v-model = selectedProgram.name /></span>
            <b-button @click="editProgram = !editProgram">{{ editProgram?"Save":"Edit" }}</b-button>
        </h1>
        <h2>Notes:</h2>
        <b-input type="textarea" v-model="selectedProgram.notes"></b-input>
        <b-tabs>
            <b-tab-item label="Classes">
                <ClassesVue :classes = selectedProgram.classes :program = selectedProgram />
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
h1{
    font-size: 1.2em;
    color: navy;
    font-weight: bold;

}
h2{
    font-size: 1.1em;
    color: black;
    font-weight: bold;
}

</style>
