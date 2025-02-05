<script setup>
    import { ref } from 'vue';
    import Course from '@/obj/Course.js'
    const props = defineProps({
        c: Course,
        isVisible: {
            type: Boolean,
            default: true
        },
        editCourse: Boolean,
        editable: {
            type: Boolean,
            default: true
        },
    })
    function deleteCourse(){
        editCourse.value = false;
        emit("deleteCourse");

    }
    const emit = defineEmits(['deleteCourse']);
    const editCourse = ref(false);

</script>
<template>
    <div v-if = "editCourse || isVisible">
        <table>
            <thead>
                <tr>
                    <td v-if='!editCourse'><strong>{{ c.courseID }} </strong>::{{ c.title }} {{ c.year==0?"":"(y " + c.year + ")" }} {{ c.sequence < 0?"":("(seq." + c.sequence + ")" )}}</td>
                    <td v-else>
                        title: <input type='text' v-model = c.title />
                        year: <input type='number' v-model = c.year />
                        sequence: <input type='number' v-model = c.sequence />

                    </td>
                    <td v-if = "editable"><b-button @click='editCourse = !editCourse'>{{ editCourse?"Save":"Edit" }}</b-button></td>
                    <td v-if='editCourse'>
                        <b-button @click='deleteCourse()'>Delete</b-button>
                    </td>
                </tr>
            </thead>
            <tbody> 
                <tr v-if = "editCourse">
                    <td colspan="2">
                        department:<input type='text' v-model = c.department />                    
                    </td>
                </tr>
                <tr v-else>
                    <td>Department: {{ c.department == null?"?":c.department }}</td>
                </tr>
                <tr><td>{{ c.offerings.length }}</td></tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    div{
        box-shadow: 2px 2px grey;
        border: 1px solid navy;
        margin: 2px;
    }

    td:nth-child(1){
        width: auto;
        padding-right: 5px;
    }
    td{
        margin: 2px 5px;


    }
    th{
        width: fit-content;
    }
</style>