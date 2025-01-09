<script setup>
    import { ref } from 'vue';
    import Class from '../obj/Class.js';
    const props = defineProps({
        c: Class,
    })
    function deleteClass(){
        editClass.value = false;
        emit("deleteClass");

    }
    const emit = defineEmits(['deleteClass']);
    const editClass = ref(false);

</script>
<template>
    <td v-if='!editClass'>{{ c.title }}</td>
    <td v-else><input type='text' v-model = c.title /></td>
    <td><b-button @click='editClass = !editClass'>{{ editClass?"Save":"Edit" }}</b-button></td>
    <td v-if='editClass'>
        <b-button @click='emit("deleteClass")'>Delete</b-button>
    </td>
</template>
<style scoped>
    td:nth-child(1){
        width: auto;
        padding-right: 5px;
    }
    td{
        margin: 2px 5px;
        width: 80px;


    }
    th{
        width: fit-content;
    }
</style>