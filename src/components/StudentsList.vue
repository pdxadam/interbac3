<script setup>
    import StudentVue from '@/components/StudentVue.vue';
    import Program from '@/obj/Program.js';
    import { ref } from 'vue';
    const props = defineProps({
        program: Program,
    });
    const newStudentName = ref("");
    const newStudentGrade = ref(9);
    const bulkNumber = ref(0);
    const bulkGrade = ref(9);
    function addStudent(){
        props.program.createStudent(newStudentName.value, newStudentGrade.value);

    }
    function bulkCreate(){
        let grade = bulkGrade.value;
        let count = bulkNumber.value;
        if (isNaN(count) || count <= 0){
            return;
        }
        if (!confirm("Are you sure you want to create " + count + " students in grade " + grade + "?")){
            return;
        }
        for (let n = 0; n < count; n++){
            let newStudent = props.program.createStudent("Student", grade);
            newStudent.name = "Student" + newStudent.studentID;
        }
    }

</script>
<template>
    <section>
        
        <div id="controls">
            <section>
                <b-label>Bulk Create: </b-label>
                <b-input type="number" v-model = "bulkNumber" /> students
                <b-label>in grade: </b-label><b-input type="number" v-model = "bulkGrade"></b-input>
                <b-button type="is-primary" @click="bulkCreate()">Bulk Create</b-button>
            </section>
            
            <section>
                <b-input type="text" v-model = newStudentName placeholder = "New Student Name" />
                <b-input type="number" v-model = newStudentGrade placeholder = "Grade" />
                <b-button label="create" @click = "addStudent()"/>
             </section>
            
        </div>
        <ul id="studentList">
            <li v-for = "student, index in program.students">
                <StudentVue :student = student @delete = deleteStudent(index) />
            </li>
        </ul>
    </section>

</template>
<style scoped>

</style>