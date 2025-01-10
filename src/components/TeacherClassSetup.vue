<script setup>
    import { ref } from 'vue';
    import Program from '@/obj/Program.js';
    import Teacher from '@/obj/Teacher.js';
    import TeacherVue from '@/components/TeacherVue.vue';
    const props = defineProps({
        program: Program,
        teachers: [Teacher],
    });
    const selectedTeacher = ref(null);
    const editTeacher = ref(false);
    const selectedClass = ref(null);
    function assignCourse(i1, i2){
        if (selectedClass.value == null){
            return;
        }        
        selectedTeacher.value.slots[i1][i2] = selectedClass.value;       
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
</script>
<template>
    <nav>
        <h1>
            Teachers &nbsp; <b-button @click=addTeacher()> + </b-button></h1>
        <b-field>
            <div v-for = "t in teachers">
                <TeacherVue :teacher = t />               
            </div>
        </b-field>
    </nav>
    <div id="classList">
       <b-field>
            <div v-for = "c in program.classes">
                <b-radio-button v-if = "c.teacher == null" v-model=selectedClass type="is-success is-light is-outlined"  :native-value = c>
                    {{ c.title }}
                </b-radio-button>
            </div>
        </b-field>
    </div>
    <div id="selectedTeacher">
        <table v-if = "selectedTeacher != null">
        <tbody>
        <tr>
            <th v-if = "editTeacher"><input type='text' v-model = selectedTeacher.name /></th>
            <th v-else>{{ selectedTeacher.name }}</th>   
            <td><b-button @click = "editTeacher = !editTeacher">{{ editTeacher?"Save":"Edit" }}</b-button></td>        
        </tr>
        <tr v-for = "term, index in selectedTeacher.slots">
            <th>term {{ index + 1 }}</th>
            <td v-for = "period, i2 in term" @click="assignCourse(index, i2)">
                {{ typeof period == "object"?period.title:"---" }}
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
