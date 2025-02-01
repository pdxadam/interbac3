<script setup>
    // import { ref } from 'vue';
    import CoursesVue from '@/components/CoursesVue.vue';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';

    const props = defineProps({
        program: Program,
        subject: Subject,

    });
    function omitList(isHL = false){
        let tempList = isHL?props.subject.HL_CourseSequence:props.subject.courseSequence;
        let omitList = [];
        for(let s of tempList){
            omitList.push(s.courseID);
        }
       
        return omitList;

    }
</script>
<template>
    <b-tabs>
        <b-tab-item label="Standard Level" v-if = "subject.offersSL">
            <div>
                <h2>Select courses in this group</h2>
               
                <CoursesVue :omitList = "omitList(false)" :courses = program.courses @courseSelected = "(c) => { subject.addCourse(c.courseID, c.year, c.sequence, false); }" :program = program />

                
            </div>
        </b-tab-item>
        <b-tab-item label="Higher Level" v-if = "subject.offersHL">
            <div>
                <h2>Select courses in this group</h2>
                <CoursesVue :omitList = "omitList(true)" :courses = program.courses @courseSelected = "(c) => { subject.addCourse(c.courseID, c.year, c.sequence, true); }" :program = program />
             </div>
        </b-tab-item>
    </b-tabs>


</template>
<style scoped>
    
</style>