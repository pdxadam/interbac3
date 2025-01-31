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
        setup: {
            type: Boolean, 
            default: true,
        },
    });

    const editMode = ref(false);
    function deleteSubject(){
        editMode.value = false;
        emit('deleteSubject');
    }
    function removeCourse(i, hl = false){
        if (hl){
            props.subject.HL_CourseSequence.splice(i, 1);
        }
        else{
            props.subject.courseSequence.splice(i,1);
        }
    }
</script>
<template>
    <h1>
    <span v-if="editMode == false">{{ subject.name }}{{ subject.offersSL?"SL":"__" }}/{{ subject.offersHL?"HL":"__" }}</span>
    <span v-else>
        <input type='text' v-model = subject.name />
        <b-field><b-checkbox v-model="subject.offersSL">Offers SL</b-checkbox></b-field>
        <b-field><b-checkbox v-model="subject.offersHL">Offers HL</b-checkbox></b-field>
    </span>    
    <span v-if = "setup"><b-button @click = "editMode = !editMode">{{ editMode?"Save":"Edit" }}</b-button></span>
    <span v-if = "editMode"><b-button @click = deleteSubject>Delete</b-button></span>
    
    </h1>
    <div v-if = "setup">
        <h2>Courses in this subject</h2>
        <div v-if = "subject.offersSL">
            <h3>Standard Level</h3>
            <ul>
               <li v-for = "c,index in subject.courseSequence">
                    <CourseVue :c = program.getCourseByID(c) :editable=false />
                    <b-button class='cmdRemove' @click = "removeCourse(index, false)" >X</b-button>
                </li>
            </ul>
        </div>
        <div v-if = "subject.offersHL">
            <h3>High Level</h3>
            <ul>
               <li v-for = "c,index in subject.HL_CourseSequence">
                    <CourseVue :c = program.getCourseByID(c) :editable=false />
                    <b-button class='cmdRemove' @click = "removeCourse(index, true)" >X</b-button>
                </li>
            </ul>
        </div>
        <hr>
        <div>
    
            <SubjectSetup :subject = subject :program = program />
        </div>
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
    h1{
        font-family: papyrus;
    }

</style>