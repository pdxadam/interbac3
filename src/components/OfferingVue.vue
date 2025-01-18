<script setup>
    import Offering from '@/obj/Offering.js';
    const props = defineProps({
        offering: Offering,
    })
</script>
<template>
    <div>
        <h1>{{ offering.getTitle() }}</h1>
    </div>
</template>
<style scoped>

</style>