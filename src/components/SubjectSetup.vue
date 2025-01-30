<script setup>
    // import { ref } from 'vue';
    import Class from '@/obj/Classy.js';
    import ClassesVue from '@/components/ClassesVue.vue';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';

    const props = defineProps({
        program: Program,
        subject: Subject,

    });
    function addClass(c){
        console.log("You added " + c.title);
        if (props.subject.classSequence.includes(c.classID)){
            console.log("it's already there");
            return;
        }
        else{
            props.subject.classSequence.push({classID: c.classID, year: c.year, sequence: c.sequence }); // changed to handle a year/sequence
        }
    }
</script>
<template>
    <div>
        <h2>Select classes in this group</h2>
        <!-- <div id='classList'>
            <b-field>
           
                   <b-checkbox-button @click = "console.log(subject.classSequence);" v-for = "c in program.classes" v-model = "subject.classSequence" type="is-success" :native-value = c>{{ c.title }}</b-checkbox-button>
             
             </b-field>
        </div> -->
        <ClassesVue :omitList = "subject.classSequence" :classes = program.classes @classSelected = "(c) => { addClass(c); }" :program = program />

        
    </div>

</template>
<style scoped>
    #classList{
        width: 200px;
        float: right;
    }
</style>