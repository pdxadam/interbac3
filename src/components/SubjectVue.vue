<script setup>
    import { ref } from 'vue';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';
    import SubjectSetup from '@/components/SubjectSetup.vue';
    import CourseVue from '@/components/CourseVue.vue';
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
    function removeCourse(i){
        props.subject.courseSequence.splice(i,1);
    }
</script>
<template>
    <h1>
    <span v-if="editMode == false">{{ subject.name }}</span>
    <span v-else><input type='text' v-model = subject.name /></span>
    <span><b-button @click = "editMode = !editMode">{{ editMode?"Save":"Edit" }}</b-button></span>
    <span v-if = "editMode"><b-button @click = deleteSubject>Delete</b-button></span>

    </h1>
    <h2>Courses in this subject</h2>
    <ul>
        <!-- <li v-for = "c in subject.classSequence">{{ program.getClassById(c).title }}</li> -->
        <li v-for = "c,index in subject.courseSequence">
            <CourseVue :c = program.getCourseById(c) :editable=false />
            {{ program.getCourseById(c.CourseID) }} Year: {{ c.year }} Sequence: c.sequence
            <b-button class="cmdRemove" @click = editCourse(index)>&#x720e;</b-button>
            <b-button class='cmdRemove' @click = removeCourse(index)>X</b-button>
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