<script setup>
    import Course from '@/obj/Course.js'
    import CourseVue from '@/components/CourseVue.vue';
    import Program from '@/obj/Program.js';
    import { ref, watch } from 'vue';
    const emit = defineEmits('courseSelected');
    const props = defineProps({
        courses: [Course],
        program: Program,
        editable: {
            type: Boolean,
            default: true
        },
        omitList: [Number],

    });
    const departments = ref([]);
    const chosenDepartment = ref("Show All");
    const selectedCourse = ref(null);
    function selectMe(c){
        selectedCourse.value = c;
        emit("courseSelected",c);

    }
    getDepartments();
    function shouldShow(thisCourse){
        var shouldShow = false;
        if (chosenDepartment.value == "Show All"){
            shouldShow = true;
        }
        else if (chosenDepartment.value == thisCourse.department){
            shouldShow = true;
        }
        if (typeof(props.omitList) != 'undefined' && props.omitList.includes(thisCourse.courseID)){
            shouldShow = false;
        }
        return shouldShow;
    }
    watch(props.courses, getDepartments, {deep: true});
    function getDepartments(){
        console.log("getting");
        departments.value = [];
        for (let c of props.courses){
        if (!(departments.value.includes(c.department))){
            departments.value.push(c.department);
            console.log(c.department);
        }
        console.log("Course Departments");
        console.log(departments.value);
        }
        departments.value.sort();

    }
    function newCourse(){
        let newCourse = props.program.createCourse("__ New Course __");

        if (chosenDepartment.value != "Show All"){
            newCourse.department = chosenDepartment.value;
        }

    }
    function deleteCourse(courseID){
        console.log("Delete " + courseID);
        props.program.deleteCourse(courseID);
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
            <th>Courses</th>
            <td><b-button @click=newCourse> + </b-button></td>
        </tr>
    </thead>

    <tbody>
        <tr v-for="c, index in courses" >
            <CourseVue :isVisible = "shouldShow(c)" :course = 'c == selectedCourse?"selected":""' @deleteCourse = deleteCourse(c.courseID) :editCourse = false :c = c @click = "selectMe(c)"/>
        </tr>
    </tbody>
</table>
</template>
<style scoped>
    .selected{
        border: 2px solid orange;
    }
</style>