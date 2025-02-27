<script setup>
    import Offering from '@/obj/Offering.js';
    const props = defineProps({
        offering: Offering,
    })
</script>
<template>
    <div>
        <h1>{{ offering.courseID }}: {{ offering.getTitle() }}</h1>
        <span>{{ offering.studentCount }} students</span>
    </div>
</template>
<style scoped>

</style>