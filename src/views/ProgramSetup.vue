<script setup>
    import { ref } from 'vue';
    import Program from '../obj/Program.js';
    import Subject from '../obj/Subject.js';
import SubjectVue from '@/components/SubjectVue.vue';
    const props = defineProps({
        programs: [Program],
    });
    const selectedProgram = ref(null);
    console.log(props.programs);
    function addSubject(){
        selectedProgram.value.subjects.push(new Subject("New Subject"));
    }
</script>
<template>
    <div>
        <ul>
            <li v-for="program in programs" @click="selectedProgram = program">ttt{{ program.name }}</li>
        </ul>
    </div>
    <section v-if="selectedProgram != null" id="programDetails">
        <h1>{{ selectedProgram.name }}</h1>
        <table>
            <tr>
                <th>Subject</th>
                <td><b-button @click="addSubject"> + </b-button></td>                
            </tr>
            <tr v-for="subject in selectedProgram.subjects">
                <td>
                    <SubjectVue :subject = subject />
                </td>
                </tr>
        </table>
    </section>
    <section v-else>Select a program from the left</section>
    
</template>

