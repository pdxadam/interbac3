<script setup>
    import { ref, watch } from 'vue';
    import Group from '../obj/Group.js';
    import SubjectsVue from '@/components/SubjectsVue.vue';
    import Program from '@/obj/Program.js';
    
    const props = defineProps({
        group: Group,
        program: Program,
    });
    const editMode = ref(false);
    
</script>
<template>
        <table>
            <thead>
                <tr>
                    <td v-if = "editMode == false">{{ group.name }}</td>
                    <td v-else><input type="text" v-model = group.name /></td>
                    <td><b-button @click="editMode = !editMode">{{  editMode?"save":"edit" }}</b-button></td>
                </tr>
            </thead>
        </table>
        <div>
            <h1>Subjects</h1>
            <SubjectsVue :program = program :subjects = group.subjects />
        </div>
        
</template>
<style scoped>

</style>
