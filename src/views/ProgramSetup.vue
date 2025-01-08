<script setup>
    import { ref } from 'vue';
    import Program from '../obj/Program.js';
    import Subject from '../obj/Subject.js';
    import ClassesVue from '@/components/ClassesVue.vue';
import SubjectVue from '@/components/SubjectVue.vue';
    const props = defineProps({
        programs: [Program],
    });
    const selectedProgram = ref(null);
    const editProgram = ref(false);
    console.log(props.programs);
    function addSubject(){
        selectedProgram.value.subjects.push(new Subject("New Subject"));
    }
    function createProgram(){
        props.programs.push(new Program("New Program"));
    }
</script>
<template>    
    <nav>
        <h1>Programs</h1>
        <b-button @click=createProgram> + </b-button>
        <ul>
            <li v-for="program in programs" @click="selectedProgram = program">{{ program.name }}</li>
        </ul>
    </nav>

    <section v-if="selectedProgram != null" id="programDetails">
        <h1>
            <span v-if="!editProgram">{{ selectedProgram.name }}</span>
            <span v-else><input type="text" v-model = selectedProgram.name /></span>
            <b-button @click="editProgram = !editProgram">{{ editProgram?"Save":"Edit" }}</b-button>
        </h1>
        <b-tabs>
            <b-tab-item label="Classes">
                    <ClassesVue :classes = selectedProgram.classes />
            </b-tab-item>
            <b-tab-item label="Subject Areas">
            <table>
                <tr>
                    <th>Subjects: </th>
                    <td><b-button @click="addSubject"> + </b-button></td>                
                </tr>
                <tr v-for="subject in selectedProgram.subjects">
                    <td>
                        <SubjectVue :subject = subject />
                    </td>
                </tr>
        </table>
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
</style>
