<script setup>
    import { ref, watch } from 'vue';
    import SubjectVue from '@/components/SubjectVue.vue';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';
    const props = defineProps({
        subjects: [Subject],
        program: Program, 
        omitList: {
            type: [],
            default: [],
         }, //list of subject ids to omit from this list
        editable: {
            type: Boolean,
            default: true,
            
        }
    });
    const emit = defineEmits('subjectSelected');
    const selectedSubject = ref(null);
    const selectedIndex = ref(null);
    watch(props.subjects, clearSelection, {deep: false});
    function clearSelection(){
        selectedSubject.value = null;
        selectedIndex.value = null;
    }
    function selectSubject(s, i){
        selectedSubject.value = s;
        selectedIndex.value = i;
        emit('subjectSelected', s);
    }
    function deleteSubject(){
        // props.subjects.splice(selectedIndex.value, 1);
        console.log(selectedSubject.value);

        props.program.deleteSubject(selectedSubject.value.subjectID);

        selectedSubject.value = null;
        selectedIndex.value = null;
        
    }
</script>
<template>
    <table>
        <thead>
            <tr>
                <th>Subjects</th>
                <td v-if = "editable"><b-button @click='program.createSubject("---New Subject---")'>+</b-button></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for = "s, index in subjects"  @click = 'selectSubject(s, index);'>
                <td v-if = "! omitList.includes(s.subjectID)">{{ s.name }}</td>
            </tr>
        </tbody>
    </table>
    <div v-if = "editable && selectedSubject != null" id="subjectDetail">
        <SubjectVue :program = program :subject = selectedSubject @deleteSubject = deleteSubject() />
    </div>
    <div v-else>
        Select a subject
    </div>

</template>
<style scoped>
    table{
        max-width: 100px;
        border: 2px outset grey;
        float: left;
    }
    tbody tr:nth-child(odd){
        background-color: lightgray;
    }
    tbody tr:hover{
        background-color: aqua;
        cursor: pointer;
    }
    #subjectDetail{
        margin-left: 120px;
    }
</style>