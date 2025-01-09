<script setup>
    import { ref } from 'vue';
    import Group from '@/obj/Group.js';
    import GroupVue from '@/components/GroupVue.vue';
    import Program from '@/obj/Program.js';
    const props = defineProps({
        groups: [Group],
        program: Program,
    })
    const selectedGroup = ref(null);
    const editMode = ref(false);
    function selectGroup(g){
        selectedGroup.value = g;
    }
    function addGroup(){
        props.groups.push(new Group("_New Group_"));
    }
</script>
<template>
    <table>
        <thead>
            <tr>
                <th>Groups: </th>
                <td><b-button @click="addGroup"> + </b-button></td>                
            </tr>
        </thead>
        <tbody>
            <tr v-for="group in groups" @click="selectGroup(group)">  
                {{ group.name }}                 
            </tr>
        </tbody>
    </table>
    <div v-if = "selectedGroup == null">
        Select a Group from the left
    </div>
    <div v-else>
        <GroupVue :group = selectedGroup :program = program />
    </div>
</template>
<style scoped>
    table{
        max-width: 150px;
        float: left;

    }
    tbody tr:nth-child(odd){
        background-color: lightgray;
    }
    div{
        border: 2px solid lightgrey;
        margin-left: 200px;
    }
</style>