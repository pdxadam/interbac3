<script setup>
    import School from '../obj/School.js';
    import Teacher from '../obj/Teacher.js';
    import TeacherVue from './TeacherVue.vue';
    const props = defineProps({
        teachers:[Teacher],
        school: School,
    })
</script>
<template>
    <h1>Teachers</h1>
    <section id="teacherSection">
        <TeacherVue v-for = "t in teachers" :teacher = t />
    </section>
</template>
<style scoped>
    #teacherSection{
        display: flex;
        flex-flow: row wrap;
        
    }
</style>