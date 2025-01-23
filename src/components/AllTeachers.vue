<script setup>
    import Program from '@/obj/Program.js';
    import Teacher from '@/obj/Teacher.js';
    const props = defineProps({
        program: Program,

    });

</script>
<template>
    <table v-for = "n in program.terms">
        <thead>
            <tr>
                <th :colspan = "program.teachers.length">Term {{ n }}</th>
            </tr>
            <tr>
                <th v-for = "teacher in program.teachers">{{ teacher.name }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for = "period in program.periods">
                <td v-for = "teacher in program.teachers">
                    <span v-for = "c in program.classes">
                        <span v-for = "o in c.offerings">
                            <span v-if = "o.teacherID == teacher.id && o.term == n && o.period == period">
                                {{ c.title }}
                            </span>
                        </span>
                    </span>
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
</style>