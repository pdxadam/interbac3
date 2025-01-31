<script setup>
    import Classy from '@/obj/Course.js'
    import ClassVue from '@/components/ClassVue.vue';
    import Program from '@/obj/Program.js';
    import { ref, watch } from 'vue';
    const emit = defineEmits('classSelected');
    const props = defineProps({
        classes: [Classy],
        program: Program,
        editable: {
            type: Boolean,
            default: true
        },
        omitList: [Number],

    });
    const departments = ref([]);
    const chosenDepartment = ref("Show All");
    const selectedClass = ref(null);
    function selectMe(c){
        selectedClass.value = c;
        emit("classSelected",c);

    }
    getDepartments();
    function shouldShow(thisClass){
        var shouldShow = false;
        if (chosenDepartment.value == "Show All"){
            shouldShow = true;
        }
        else if (chosenDepartment.value == thisClass.department){
            shouldShow = true;
        }
        if (typeof(props.omitList) != 'undefined' && props.omitList.includes(thisClass.classID)){
            shouldShow = false;
        }
        return shouldShow;
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
        console.log("Class Departments");
        console.log(departments.value);
        }
        departments.value.sort();

    }
    function newClass(){
        let newClass = props.program.createClass("__ New Class __");

        if (chosenDepartment.value != "Show All"){
            newClass.department = chosenDepartment.value;
        }

    }
    function deleteClass(courseID){
        console.log("Delete " + courseID);
        props.program.deleteClass(courseID);
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
            <ClassVue :isVisible = "shouldShow(c)" :class = 'c == selectedClass?"selected":""' @deleteClass = deleteClass(c.courseID) :editClass = false :c = c @click = "selectMe(c)"/>
        </tr>
    </tbody>
</table>
</template>
<style scoped>
    .selected{
        border: 2px solid orange;
    }
</style>