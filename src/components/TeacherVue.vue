<script setup>
    import Teacher from '../obj/Teacher.js';
    import { ref } from 'vue';
    const props = defineProps({
        teacher: Teacher,
    });
    const editMode = ref(false);
    function enableEdit(){
        editMode.value = !editMode.value;
    }
    function deleteMe(){
        alert("deleted");
    }
</script>
<template>
    <table>
        <tbody>
        <tr>
            <th v-if="!editMode">{{ teacher.name }}</th>
            <th v-else><input type="text"  v-model = teacher.name /></th>
            <td><b-button @click='enableEdit'>{{ editMode?"Save":"Edit" }}</b-button></td>
            <td v-if="editMode"><b-button @click='deleteMe' >Delete</b-button></td>
        </tr>
        <tr v-for = "term, index in teacher.slots">
            <th>term {{ index + 1 }}</th>
            <td v-for = "period, i2 in term">
                p{{ i2 + 1 }} {{ period }}
            </td>
        </tr>
    </tbody>
    </table>
    </template>
<style scoped>
    table{
        border: 3px outset grey;
        border-collapse: collapse;
        margin: 5px;

    }
    th{
        font-weight: bold;
        border: 1px solid black;
        padding: 5px;
    }
    td{
        border: 1px solid black;
        padding: 2px;
    }
</style>



