<script setup>
    import Teacher from '../obj/Teacher.js';
    const props = defineProps({
        teacher: Teacher,
    });
    console.log(props.teacher.slots);
</script>
<template>
    <table>
        <tbody>
        <tr>
            <th>{{ teacher.name }}</th>
        </tr>
        <tr v-for = "term, index in teacher.slots">
            <th>term {{ index + 1 }}</th>
            <td v-for = "period, i2 in term">
                p{{ i2 + 1 }} {{ period }}
            </td>
        </tr>
    </tbody>
    </table>
    </template>




