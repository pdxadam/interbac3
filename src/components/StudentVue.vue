<script setup>
    import Student from '@/obj/Student.js';
    const props = defineProps({
        student: Student,

    });
</script>
<template>
    <section>
        <div>
            <h1><span class=sID>{{ student.studentID }}</span> {{ student.name }} <span class="grade"> g{{ student.grade }}</span></h1>

        </div>
    </section>
</template>
<style scoped>
    .sID{
        font-size: 0.8em;
        color: grey;

    }
    .grade{
        font-weight:  normal;

    }
    h1{
        font-weight: bold;
        text-align: left;
    }
</style>