<script setup>
    import { ref } from 'vue';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';
    import SubjectSetup from '@/components/SubjectSetup.vue';
    const emit = defineEmits(['deleteSubject']);
    const props = defineProps({
        subject: Subject,
        program: Program,
    });

    const editMode = ref(false);
    function deleteSubject(){
        editMode.value = false;
        emit('deleteSubject');
    }
</script>
<template>
    <h1>
    <span v-if="editMode == false">{{ subject.name }}</span>
    <span v-else><input type='text' v-model = subject.name /></span>
    <span><b-button @click = "editMode = !editMode">{{ editMode?"Save":"Edit" }}</b-button></span>
    <span v-if = "editMode"><b-button @click = deleteSubject>Delete</b-button></span>

    </h1>
    <h2>Classes in this subject</h2>
    <ul>
        <li v-for = "c in subject.classSequence">{{ program.getClassById(c).title }}</li>
    </ul>
    <hr>
    <div>
 
        <SubjectSetup :subject = subject :program = program />
    </div>


</template>
<style scoped>

</style>