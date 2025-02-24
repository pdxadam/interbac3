<script setup>  
    import { ref } from 'vue'; 
    import Student from '@/obj/Student.js';
    import Program from '@/obj/Program.js';
    const props = defineProps({
        student: Student,
        program: Program,

    });
    const emit = defineEmits(["delete"]);
    const editMode = ref(false);
    function getTitle(c){
        return props.program.getCourseByID(c).title;
    }
    function clearClasses(){
        if (confirm("Are you sure you want to clear all class assignments from this student? ")){
            props.student.requirements = [];
        }
    }
</script>
<template>
    <section>
    <b-collapse
      class="card">
        <template #trigger = props>
            <div class="card-header elStudent" role="button">
                <p class="card-header-title">
                    <span class="name"> {{ student.name }}</span>
                    <span class="grade"> g{{ student.grade }}</span>
                </p>
                <div class="hoverControls">
                    <b-button type="is-danger is-light" size="is-small" @click="emit('delete')">
                        <b-icon icon="delete"></b-icon>
                    </b-button>
                    <b-button type="is-success is-light" size="is-small" @click = 'editMode = true'>
                        <b-icon icon="pencil"></b-icon>
                    </b-button>
                </div>  
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-up' : 'menu-down'">
                    </b-icon>
                </a>
                
            </div>

        </template>
        <div class="card-content">
            
            <div class="content">
                <div  v-if = "editMode">
                <b-input type="text" size="is-small" placeholder="Student Name" v-model="student.name" />
                <b-input type="number" size="is-small" placeholder = "Student grade" v-model="student.grade" />
                <b-button @click="editMode = false"><b-icon icon="content-save" /></b-button>
                
            </div>
            <span v-for = "c in student.requirements">{{ getTitle(c) }}, </span>
            <b-button @click="clearClasses()">Clear Class Assignments</b-button>    
        </div>
        </div>
        
    </b-collapse>
    </section>
</template>
<style scoped>
    .name{
        
        font-weight: bold;
        font-family: Garamond, serif;
    }
    .sID{
        font-size: 0.8em;
        color: grey;

    }
    .grade{
        font-weight:  normal;

    }
    h1{
        font-weight: bold;
        text-align: left;
    }
    .elStudent{
        position: relative;
        width: fit-content;
        padding: 5px;
        padding-right: 100px;
        border-radius: 3px;
        margin: 2px 5px;

    }
    .hoverControls{
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s;
        position: absolute;
        top: 0px;
        right: 0px;
    }
    .elStudent:hover .hoverControls{
        opacity: 1;
        pointer-events: all;
    }
    .elStudent:hover .name{
        color: rgb(47, 180, 206);
    }

</style>