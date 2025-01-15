<script setup>
    import Program from '../obj/Program.js';
    import Teacher from '../obj/Teacher.js';
    import TeacherVue from './TeacherVue.vue';
    import { ref, watch } from 'vue';
    const emit = defineEmits("teacherSelected");
    const props = defineProps({
        teachers:[Teacher],
        program: Program,
    })
    function addTeacher(name = "newb", department = "---"){
        if (chosenDepartment != "Show All"){
            department = chosenDepartment;
        }
        props.program.createTeacher(name, department);
        
    }
    function deleteTeacher(index){
        props.teachers.splice(index,1);
    }
    const departments = ref([]);
    const chosenDepartment = ref("Show All");
    const selectedTeacher = ref(null);
    function selectMe(t){
        selectedTeacher.value = t;
        console.log("selectme");
        emit("teacherSelected",t);

    }
    getDepartments();
    function shouldShow(deptName){
        if (chosenDepartment.value == "Show All"){
            return true;
        }
        else if (chosenDepartment.value == deptName){
            return true;
        }
        else{
            return false;
        }
    }
    watch(props.teachers, getDepartments, {deep: true});
    function getDepartments(){
        departments.value = [];
        for (let t of props.teachers){
        if (!(departments.value.includes(t.department))){
            departments.value.push(t.department);
            console.log(t.department);
        }
        console.log("teacher departments:  " + departments.value);
        }
        departments.value.sort();

    }

</script>
<template>
    By Department:
    <b-dropdown v-model = "chosenDepartment">
        <template #trigger>
            <b-button :label = chosenDepartment type="is-primary" />
        </template>
        <b-dropdown-item value="Show All" >
            Show All
        </b-dropdown-item>
        <b-dropdown-item v-for = "d in departments" :value = d>
            {{ d }}
        </b-dropdown-item>
    </b-dropdown>
    <h1>Teachers <b-button @click = addTeacher(); > + </b-button></h1>
    
    <section id="teacherSection" >
        <ul>
            <li v-for = "t, index in teachers">
                <TeacherVue :isVisible = "shouldShow(t.department)"  :teacher = t @deleteTeacher = deleteTeacher(index); @click = "selectMe(t);" />
            </li>
        </ul>
   </section>
</template>
<style scoped>
    #teacherSection{
        display: flex;
        flex-flow: row wrap;
        
    }
</style>