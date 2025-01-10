<script setup>
    import { ref } from 'vue';
    import Program from '@/obj/Program.js';
    import Teacher from '@/obj/Teacher.js';
    import TeacherVue from '@/components/TeacherVue.vue';
    import ClassesVue from '@/components/ClassesVue.vue';
    const props = defineProps({
        program: Program,
        teachers: [Teacher],
    });
    const selectedTeacher = ref(null);
    const editTeacher = ref(false);
    const selectedClass = ref(null);
    function setOffering(term, period){
        console.log("Creating offering for teacher:" + selectedTeacher.value.name);
        console.log("class: " + selectedClass.value.title);
        console.log("term:" + term );
        console.log("period: " + period);
    }
    function addTeacher(){
        let periods = 5;
        let terms = 3;
        if (props.teachers.count > 0){
            periods = props.teachers[0].periods;
            terms = props.teachers[0].terms;

        }
        props.teachers.unshift(new Teacher("--new--",terms, periods));
    }
    function selectClass(c){
        selectedClass.value = c;

    }
</script>
<template>
    <nav>
        <h1>
            Teachers &nbsp; <b-button @click=addTeacher()> + </b-button></h1>
        <b-field>
            <div v-for = "t in teachers">
                <TeacherVue :teacher = t @click="selectedTeacher = t" />               
            </div>
        </b-field>
    </nav>
    <div id="classList">
        <ClassesVue :classes = program.classes @classSelected = "(c) => selectClass(c)" />
    </div>
    <div id="selectedTeacher">
        <table v-if = "selectedTeacher != null">
        <thead>
            <tr>
                <th v-if = "editTeacher"><input type='text' v-model = selectedTeacher.name /></th>
                <th v-else>{{ selectedTeacher.name }}</th>   
                <td><b-button @click = "editTeacher = !editTeacher">{{ editTeacher?"Save":"Edit" }}</b-button></td>        
            </tr>
            <tr >
                <td>&nbsp;</td>
                <td v-for = "i in program.terms">Term {{ i }}</td>
            </tr>

        </thead>
        <tbody>
        <tr v-for = "period in program.periods">
            <th>class {{ period }}</th>
            <td v-for = "term in program.terms" @click="setOffering(term, period)">
                ---
            </td>
        </tr>
    </tbody>
    </table>
    </div>
    
</template>

<style scoped>
    nav{
        width: 150px;
        float: left;
    }
    #selectedTeacher{
        margin-left: 155px;
    }
    #classList{
        float: right;
    }
    td{
        border: 1px dashed grey;
        width: 18%;
        padding: 2px 4px;
        font-size: 0.8rem;
    }
</style>
