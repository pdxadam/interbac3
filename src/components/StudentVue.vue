<script setup>  
    import { ref } from 'vue'; 
    import Student from '@/obj/Student.js';
    import Program from '@/obj/Program.js';
    const props = defineProps({
        student: Student,
        program: Program,

    });
    const hideScheduled = ref(false);
    const hideUnscheduled = ref(false);
    const cardOpen = ref(false);
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
    function isScheduled(courseID, sched){
        for (let term of sched){
            if (term.includes(courseID))return true;
        }
        return false;
    }
</script>
<template>
    <section>
    <b-collapse :model-value = "cardOpen"
      class="card" animation = "slide" :aria-expanded=props.open>
        <template #trigger = props>
            <div class="card-header elStudent" role="button">
                <p class="card-header-title">
                    <span :class="student.hasSchedule?'scheduled':'unscheduled'"> {{ student.name }}</span>
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
            <span v-for = "c in student.requirements" :class="isScheduled(c, student.schedule)?'scheduled':''">{{ getTitle(c) }}, </span>
            <b-button @click="clearClasses()">Clear Class Assignments</b-button>    
            Table:
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td v-for = "term of student.schedule.length">T{{ term }}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "period in student.schedule[0].length">
                        <td>p{{ period }}</td>
                        <td v-for = "term in student.schedule.length">
                            <span v-if = "student.schedule[term - 1][period - 1] != null">{{ getTitle(student.schedule[term - 1][period - 1]) }}</span>
                            <span v-else>---</span>
                        </td>
                    </tr>
                </tbody>
                   
            </table>
            <h1>Scheduling Log</h1>
            <div id="log">
                
                <table v-for = "entry in student.schedulingLog">      

                    <tbody>
                        <tr>
                            <th>Requirements:</th>
                            <td>
                                <span v-for = "c in entry.requirements" :class = "isScheduled(c, entry.schedule)?'scheduled':''">
                                   {{ getTitle(c) }}
                                , </span>
                            </td>

                        </tr>
                        <tr v-for = "term, index of entry.schedule">
                            <th>Term {{ index + 1 }}</th>
                            <td>
                                <span v-for = "c of term">{{ c==null?"--":getTitle(c) }}, </span>
                            </td> 

                        </tr>
                        <tr>
                            <th>Reason ID: </th>
                            <td>{{ entry.reason }}</td>
                        </tr>
                        <tr>
                            <th>Reason Title: </th>
                            <td>{{ getTitle(entry.reason) }}</td>
                        </tr>
                        <tr>
                            <th>Reason offerings: </th>
                            <td>{{ program.getCourseByID(entry.reason).offerings }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        
    </b-collapse>
    </section>
</template>
<style scoped>
    .scheduled{
        font-weight: bold;
    }
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
    .scheduled{
        background-color:rgb(172, 236, 168);
    }
    .unscheduled{
        background-color: #f7b19e;
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
    #log{
        max-height: 450px;
        overflow-y: scroll;
    }
    #log table{
        border: 3px outset lightgrey;
    }

</style>