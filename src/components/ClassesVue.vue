<script setup>
    const props = defineProps({
        classes: [Class],

    });
</script>
<template>
    <ul>
        <li v-for="c in classes" >
            {{ c.name }}
            </li>
    </ul>
</template>