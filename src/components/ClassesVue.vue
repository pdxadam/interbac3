<script setup>
    import Classy from '@/obj/Classy.js'
    import ClassVue from '@/components/ClassVue.vue';
    import { ref, watch } from 'vue';
    const emit = defineEmits('classSelected');
    const props = defineProps({
        classes: [Classy],

    });
    const departments = ref([]);
    const chosenDepartment = ref("Show All");
    const selectedClass = ref(null);
    function selectMe(c){
        selectedClass.value = c;
        emit("classSelected",c);

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
    watch(props.classes, getDepartments, {deep: true});
    function getDepartments(){
        console.log("getting");
        departments.value = [];
        for (let c of props.classes){
        if (!(departments.value.includes(c.department))){
            departments.value.push(c.department);
            console.log(c.department);
        }
        console.log(departments.value);
        }
        departments.value.sort();

    }
    function newClass(){
        let newClass = new Classy("New Class");
        if (chosenDepartment.value != "Show All"){
            newClass.department = chosenDepartment.value;
        }
        props.classes.unshift(newClass);

    }
    function deleteClass(index){
        props.classes.splice(index,1);    
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
    <table>
        <thead>
        <tr>
            <th>Classes</th>
            <td><b-button @click=newClass> + </b-button></td>
        </tr>
    </thead>

    <tbody>
        <tr v-for="c, index in classes" >
            <ClassVue :isVisible = "shouldShow(c.department)" :class = 'c == selectedClass?"selected":""' @deleteClass = deleteClass(index) :editClass = false :c = c @click = "selectMe(c)"/>
        </tr>
    </tbody>
</table>
</template>
<style scoped>
    .selected{
        border: 2px solid orange;
    }
</style>