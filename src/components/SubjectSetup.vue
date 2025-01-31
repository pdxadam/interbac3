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
    function addClass(c, seq){
        console.log("Yu added " + c.title);
        if (seq.includes(c.classID)){
            console.log("it's already there");
            return;
        }
        else{
            props.subject.courseSequence.push({courseID: c.courseID, year: c.year, sequence: c.sequence }); // changed to handle a year/sequence
            seq.push(c.classID);
            
        }
        console.log(seq.classSequence);
    }
</script>
<template>
    <b-tabs>
        <b-tab-item label="Standard Level" v-if = "subject.offersSL">
            <div>
                <h2>Select classes in this group</h2>
                <!-- <div id='classList'>
                    <b-field>
                
                        <b-checkbox-button @click = "console.log(subject.classSequence);" v-for = "c in program.classes" v-model = "subject.classSequence" type="is-success" :native-value = c>{{ c.title }}</b-checkbox-button>
                    
                    </b-field>
                </div> -->
                <ClassesVue :omitList = "subject.classSequence" :classes = program.classes @classSelected = "(c) => { addClass(c, subject.classSequence); }" :program = program />

                
            </div>
        </b-tab-item>
        <b-tab-item label="Higher Level" v-if = "subject.offersHL">
            <div>
                <h2>Select classes in this group</h2>
                <!-- <div id='classList'>
                    <b-field>
                
                        <b-checkbox-button @click = "console.log(subject.classSequence);" v-for = "c in program.classes" v-model = "subject.classSequence" type="is-success" :native-value = c>{{ c.title }}</b-checkbox-button>
                    
                    </b-field>
                </div> -->
                <ClassesVue :omitList = "subject.HL_ClassSequence" :classes = program.classes @classSelected = "(c) => { addClass(c, subject.HL_ClassSequence); }" :program = program />

                
            </div>
        </b-tab-item>
    </b-tabs>


</template>
<style scoped>
    #classList{
        width: 200px;
        float: right;
    }
</style>