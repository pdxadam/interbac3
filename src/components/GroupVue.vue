<script setup>
    import { ref } from 'vue';
    import Group from '../obj/Group.js';
    import SubjectsVue from '@/components/SubjectsVue.vue';
    import Program from '@/obj/Program.js';
    import SubjectVue from '@/components/SubjectVue.vue';
    const emit = defineEmits('deleteGroup');
    const props = defineProps({
        group: Group,
        program: Program,
        setup: {
            type: Boolean,
            default: true,
        },
    });
    function attachSubject(s){
        if (props.group.subjects.includes(s)){
            console.log("That already exists");
        }
        else{
            props.group.subjects.unshift(s);
        };
    }   
    function removeSubject(index){
        props.group.subjects.splice(index, 1);
    }
    const editMode = ref(false);
    
</script>
<template>
        <table>
            <thead>
                <tr>
                    <td v-if = "editMode == false">{{ group.name }}</td>
                    <td v-else><input type="text" v-model = group.name /></td>
                    <td>
                        <b-button @click="editMode = !editMode">{{  editMode?"save":"edit" }}</b-button>
                        <b-button v-if = "editMode" @click = "emit('deleteGroup')">Delete</b-button>
                    </td>
                </tr>
            </thead>
        </table>
        <div>
            <h1>SL Subjects in this group</h1>
            <ul>
                <li v-for = "s, index in group.subjects" @click = removeSubject(index)>   
                    
                    <div v-if = "program.getSubjectById(s) != null">
                        <SubjectVue :program = "program" :subject = "program.getSubjectById(s)" :setup = false  />
                    </div>
                    <div v-else>
                        Error: click to remove: {{ s }}
                    </div>
                </li>
            </ul>
            <div>
                <h1>
                    Add Subjects
                </h1>                
                <SubjectsVue :program = program :subjects = program.subjects :omitList = "group.subjects" @subjectSelected = '(s) => { attachSubject(s.subjectID); }' :editable = setup />
            </div>
        </div>
        
</template>
<style scoped>

</style>
