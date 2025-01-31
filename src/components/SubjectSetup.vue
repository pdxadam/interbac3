<script setup>
    // import { ref } from 'vue';
    import Course from '@/obj/Course.js';
    import CoursesVue from '@/components/CoursesVue.vue';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';

    const props = defineProps({
        program: Program,
        subject: Subject,

    });
    function addCourse(c){
        console.log("You added " + c.title);
        if (props.subject.courseSequence.includes(c.courseID)){
            console.log("it's already there");
            return;
        }
        else{
            props.subject.courseSequence.push({courseID: c.courseID, year: c.year, sequence: c.sequence }); // changed to handle a year/sequence
        }
    }
</script>
<template>
    <div>
        <h2>Select courses in this group</h2>
        <!-- <div id='classList'>
            <b-field>
           
                   <b-checkbox-button @click = "console.log(subject.classSequence);" v-for = "c in program.classes" v-model = "subject.classSequence" type="is-success" :native-value = c>{{ c.title }}</b-checkbox-button>
             
             </b-field>
        </div> -->
        <CoursesVue :omitList = "subject.courseSequence" :courses = program.courses @courseSelected = "(c) => { addCourse(c); }" :program = program />

        
    </div>

</template>
<style scoped>
    #classList{
        width: 200px;
        float: right;
    }
</style>