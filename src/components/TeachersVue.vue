<script setup>
    import School from '../obj/School.js';
    import Teacher from '../obj/Teacher.js';
    import TeacherVue from './TeacherVue.vue';
    const props = defineProps({
        teachers:[Teacher],
        school: School,
    })
    function addTeacher(){
        props.teachers.push(new Teacher("newb", props.school.terms, props.school.periods));
    }
    function deleteTeacher(index){
        props.teachers.splice(index,1);
    }
</script>
<template>
    <h1>Teachers <b-button @click = addTeacher > + </b-button></h1>
    
    <section id="teacherSection">
        <TeacherVue v-for = "t, index in teachers" :teacher = t @deleteTeacher = deleteTeacher(index); />
    </section>
</template>
<style scoped>
    #teacherSection{
        display: flex;
        flex-flow: row wrap;
        
    }
</style>