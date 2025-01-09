<script setup>
    // import { ref } from 'vue';
    import Class from '@/obj/Class.js';
    import Subject from '@/obj/Subject.js';
    import Program from '@/obj/Program.js';

    const props = defineProps({
        program: Program,
        subject: Subject,

    });

</script>
<template>
    <div>
        <h2>Select classes in this group</h2>
        <div id='classList'>
            <b-field>
           
                   <b-checkbox-button @click = "console.log(subject.classSequence);" v-for = "c in program.classes" v-model = "subject.classSequence" type="is-success" :native-value = c>{{ c.title }}</b-checkbox-button>
             
             </b-field>
        </div>
                    

        
    </div>

</template>
<style scoped>
    #classList{
        width: 200px;
        float: right;
    }
</style>