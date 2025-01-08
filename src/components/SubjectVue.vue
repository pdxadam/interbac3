<script setup>
    import { ref } from 'vue';
    import Subject from '../obj/Subject.js';
    const props = defineProps({
        subject: Subject,
    });
    const editMode = ref(false);

</script>
<template>
    <h1 v-if = "editMode == false">{{ subject.name }}</h1>
    <h1 v-else><input type="text" v-model = subject.name /></h1>
    <b-button @click="editMode = !editMode">{{  editMode?"save":"edit" }}</b-button>
</template>