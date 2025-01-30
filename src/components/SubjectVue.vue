<script setup>
    import { ref } from 'vue';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';
    import SubjectSetup from '@/components/SubjectSetup.vue';
    import ClassVue from '@/components/ClassVue.vue';
    const emit = defineEmits(['deleteSubject']);
    const props = defineProps({
        subject: Subject,
        program: Program,
    });

    const editMode = ref(false);
    function deleteSubject(){
        editMode.value = false;
        emit('deleteSubject');
    }
    function removeClass(i){
        props.subject.classSequence.splice(i,1);
    }
</script>
<template>
    <h1>
    <span v-if="editMode == false">{{ subject.name }}</span>
    <span v-else><input type='text' v-model = subject.name /></span>
    <span><b-button @click = "editMode = !editMode">{{ editMode?"Save":"Edit" }}</b-button></span>
    <span v-if = "editMode"><b-button @click = deleteSubject>Delete</b-button></span>

    </h1>
    <h2>Classes in this subject</h2>
    <ul>
        <!-- <li v-for = "c in subject.classSequence">{{ program.getClassById(c).title }}</li> -->
        <li v-for = "c,index in subject.classSequence">
            <ClassVue :c = program.getClassById(c) :editable=false />
            {{ program.getClassById(c.classID) }} Year: {{ c.year }} Sequence: c.sequence
            <b-button class="cmdRemove" @click = editClass(index)>&#x720e;</b-button>
            <b-button class='cmdRemove' @click = removeClass(index)>X</b-button>
        </li>
    </ul>
    <hr>
    <div>
 
        <SubjectSetup :subject = subject :program = program />
    </div>


</template>
<style scoped>
    li{
        position: relative;
        width: 450px;

    }
    .cmdRemove{
        position: absolute;
        top: 2px;
        right: 2px;

    }

</style>