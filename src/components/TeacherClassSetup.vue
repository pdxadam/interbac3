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

    const selectedClass = ref(null);
    function assignCourse(i1, i2){
        if (selectedClass.value == null){
            return;
        }        
        selectedTeacher.value.slots[i1][i2] = selectedClass.value;       
    }

</script>
<template>
    <nav>
        <b-field>
            <div v-for = "t in teachers">
                <b-radio-button  v-model=selectedTeacher type="is-success is-light is-outlined"  :native-value = t>
                    {{ t.name }}
                </b-radio-button>
            </div>
        </b-field>
    </nav>
    <div id="classList">
       <b-field>
            <div v-for = "c in program.classes">
                <b-radio-button  v-model=selectedClass type="is-success is-light is-outlined"  :native-value = c>
                    {{ c.title }}
                </b-radio-button>
            </div>
        </b-field>
    </div>
    <div id="selectedTeacher">
        <table v-if = "selectedTeacher != null">
        <tbody>
        <tr>
            <th>{{ selectedTeacher.name }}</th>            
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
    }
</style>
