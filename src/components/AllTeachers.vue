<script setup>
    import { ref } from 'vue';
    import Program from '@/obj/Program.js';
    import Teacher from '@/obj/Teacher.js';
    const props = defineProps({
        program: Program,

    });
    const departments = ref([]);
    const chosenDepartment = ref("Show All");
    function getDepartments(){
        departments.value = [];
        for (let c of props.program.teachers){
            if (!(departments.value.includes(c.department))){
                departments.value.push(c.department);
                console.log(c.department);
            }
        }
        departments.value.sort();
       
    }
    function shouldShow(teacher){
            if (chosenDepartment.value == "Show All"){
                return true;
            }
            if (teacher.department == chosenDepartment.value){
                return true;
            }
            return false;
        }
    function getCourse(teacher){
        if (shouldShow(teacher)){
            return "visible";
        }
        else{
            return "hidden";
        }
    }
    getDepartments();
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
    <table v-for = "n in program.terms">
        <thead>
            <tr>
                <th :colspan = "program.teachers.length">Term {{ n }}</th>
            </tr>
            <tr>
                <th v-for = "teacher in program.teachers" :course="getCourse(teacher)">
                    <template v-if="shouldShow(teacher)">
                        {{ teacher.name }}
                    </template>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for = "period in program.periods">
                <td v-for = "teacher in program.teachers" :course="getCourse(teacher)">
                    <template v-if = "shouldShow(teacher)">
                        <span v-for = "c in program.courses">
                            <span v-for = "o in c.offerings">
                                <span v-if = "o.teacherID == teacher.id && o.term == n && o.period == period">
                                    {{ c.title }}
                                </span>
                            </span>
                        </span>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>

</template>
<style scoped>
    table{
        
        overflow-x: scroll;
        border-collapse: collapse;
        margin: 5px 2px;

    }
    td, th{
        border: 1px solid black;
        padding: 2px;
        width: 200px !important;
    }
    tr{
        border: 2px solid navy;
    }
    tr:nth-child(odd){
        background-color: whitesmoke;
    }
    .hidden{
        display: none;
    }
</style>