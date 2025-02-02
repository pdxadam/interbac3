<script setup>
    import { ref, nextTick } from 'vue';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';
    import SubjectSetup from '@/components/SubjectSetup.vue';
    import CourseVue from '@/components/CourseVue.vue';
    import EditRequirement from './EditRequirement.vue';
    const emit = defineEmits(['deleteSubject']);
    const props = defineProps({
        subject: Subject,
        program: Program,
        setup: {
            type: Boolean, 
            default: true,
        },
    });
    const isEditModalActive = ref(false);
    const editClass = ref(-1);
    const editHLClass = ref(-1);
    const editMode = ref(false);
    const activeRequirement = ref(null);
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
    async function editRequirement(r){
        activeRequirement.value = r;
        console.log(activeRequirement.value);
    
        isEditModalActive.value = true;
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
                    <!-- <CourseVue :c = program.getCourseByID(c) :editable=false /> -->
                    <div>
                        {{ program.getCourseByID(c.courseID).title }}
                        Year: {{ c.year }} Sequence: {{ c.sequence }}
                        <!-- TODO: clean up editing the year and sequence -->
                        <div class="buttonBlock">
                            <b-button type="is-primary" outlined @click = "editRequirement(c)"><b-icon icon="pencil-outline" size="is-small" /></b-button>
                            <b-button type="is-danger" outlined class='cmdRemove' @click = "removeCourse(index, false)" >X</b-button>
                        </div>
                    </div>
                </li>
            </ul>
            
        </div>
        <div v-if = "subject.offersHL">
            <h3>High Level</h3>
            <ul>
               <li v-for = "c,index in subject.HL_CourseSequence"> 
                    <div>
                        {{ program.getCourseByID(c.courseID).title }}
                        Year: {{ c.year }} Sequence: {{ c.sequence }}
                        <div class="buttonBlock">
                            <b-button type="is-primary" outlined @click = "editRequirement(c)"><b-icon icon="pencil-outline" size="is-small" /></b-button>
                            <b-button type="is-danger" outlined class='cmdRemove' @click = "removeCourse(index, false)" >X</b-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <hr>
        <div>
    
            <SubjectSetup :subject = subject :program = program />
        </div>
    </div>
    <b-modal v-model = "isEditModalActive" has-modal-card trap-focus :destroy-on-hide = "false">
        <EditRequirement :requirement = activeRequirement :program = program @close = "isEditModalActive = false" />
    </b-modal>

</template>
<style scoped>
    li{
        position: relative;
        width: 450px;
        background-color: rgb(213, 219, 235);
        height: 40px;

    }
    li:nth-child(odd){
        background-color: aliceblue;
    }
    li:hover{
        background-color: rgb(241, 251, 149);
    }
    .buttonBlock{
        position: absolute;
        top: 2px;
        right: 2px;
        background-color: white;

    }
    .buttonBlock > *{
        margin: 0px 2px;
    }
    h1{
        font-family: papyrus;
    }

</style>