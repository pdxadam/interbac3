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
    function addCourse(c, seq){
        console.log("Yu added " + c.title);
        if (seq.includes(c.courseID)){
            console.log("it's already there");

            return;

        }
        else{
            seq.push(c.courseID);
            
        }
        console.log(seq.courseSequence);
    }
</script>
<template>
    <b-tabs>
        <b-tab-item label="Standard Level" v-if = "subject.offersSL">
            <div>
                <h2>Select courses in this group</h2>
               
                <CoursesVue :omitList = "subject.courseSequence" :courses = program.courses @courseSelected = "(c) => { addCourse(c, subject.courseSequence); }" :program = program />

                
            </div>
        </b-tab-item>
        <b-tab-item label="Higher Level" v-if = "subject.offersHL">
            <div>
                <h2>Select courses in this group</h2>
                <CoursesVue :omitList = "subject.HL_CourseSequence" :courses = program.courses @courseSelected = "(c) => { addCourse(c, subject.HL_CourseSequence); }" :program = program />

                
            </div>
        </b-tab-item>
    </b-tabs>


</template>
<style scoped>
    
</style>