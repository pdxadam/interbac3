<script setup>
    import { ref } from 'vue';
    import Class from '@/obj/Classy.js'
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
    <div>
        <table>
            <thead>
                <tr>
                    <td v-if='!editClass'>{{ c.title }} {{ c.year==0?"":"(y " + c.year + ")" }} {{ c.sequence < 0?"":("(seq." + c.sequence + ")" )}}</td>
                    <td v-else>
                        title: <input type='text' v-model = c.title />
                        year: <input type='number' v-model = c.year />
                        sequence: <input type='number' v-model = c.sequence />
                    </td>
                    <td><b-button @click='editClass = !editClass'>{{ editClass?"Save":"Edit" }}</b-button></td>
                    <td v-if='editClass'>
                        <b-button @click='emit("deleteClass")'>Delete</b-button>
                    </td>
                </tr>
            </thead>
            <tbody> 
                <tr v-if = "editClass"><td colspan = "2">Edit details in program details editor</td></tr>
                <tr>
                    <td>Subject: {{ this.subject == null?"?":this.subject.name }}</td>
                    <td>Teacher: {{ this.teacher == null?"?":this.teacher.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    div{
        box-shadow: 2px 2px grey;
        border: 1px solid navy;
        margin: 2px;
    }

    td:nth-child(1){
        width: auto;
        padding-right: 5px;
    }
    td{
        margin: 2px 5px;


    }
    th{
        width: fit-content;
    }
</style>