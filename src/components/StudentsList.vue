<script setup>
    import StudentVue from '@/components/StudentVue.vue';
    import Program from '@/obj/Program.js';
    import { ref, onMounted, watch } from 'vue';
    const props = defineProps({
        program: Program,
    });
    const emit = defineEmits(["selectStudent"]);

    onMounted(() => {
        countStudents();
        const unwatch = watch(props.program.students, countStudents);
    });

    const newStudentName = ref("");
    const newStudentGrade = ref(9);
    const bulkNumber = ref(0);
    const bulkGrade = ref(9);
    const openSidebar = ref(false);
    const counts = ref({});
    function addStudent(){
        props.program.createStudent(newStudentName.value, newStudentGrade.value);
        newStudentName.value = "";
        
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
    function deleteStudent(index){
        props.program.students.splice(index,1);
    }
    function countStudents(){
        counts.value = {};
        for (let student of props.program.students){
            if (student.grade in counts.value){
                counts.value[student.grade] += 1;
            }
            else{
                counts.value[student.grade] = 1;
            }
        }
    }

</script>
<template>
        
    <section>
        <b-sidebar
            type="is-light"
            :fullheight = "false"
            :fullwidth = "false"
            :overlay = "false"
            :right = "false"
            v-model = "openSidebar"
        >

        <div id="controls">
            <section>
                <h1>Create Students (Bulk)</h1>
                <b-label>How many? </b-label>
                <b-input type="number" v-model = "bulkNumber" />
                <b-label>in grade: </b-label><b-input type="number" v-model = "bulkGrade"></b-input>
                <b-button type="is-primary" @click="bulkCreate()">Bulk Create</b-button>
            </section>
            <hr />
            <section>
                <h1>Create Single Student</h1>
                <b-input type="text" v-model = newStudentName placeholder = "New Student Name" />
                <b-input type="number" v-model = newStudentGrade placeholder = "Grade" />
                <b-button label="create" @click = "addStudent()"/>
             </section>
            <hr />
            <div style="text-align: right; margin: 5px;"><b-button @click="openSidebar = false"><b-icon icon="arrow-left" /></b-button>
            </div>
            </div>
        </b-sidebar>   
        <!-- ----- -->
        
        <b-button type="is-default" @click="openSidebar = true" ><b-icon icon="account-plus-outline" ></b-icon></b-button>
        <h1>Students <span class="studentCount">{{ program.students.length }}</span></h1>
        <span v-for = "value,key in counts" class = "studentCount">
            g{{ key }}: {{ value }}
        </span>
        <ul id="studentList">
            <li v-for = "student, index in program.students">
                <StudentVue @click = "emit('selectStudent', index)" :program = program :student = student @delete = deleteStudent(index) />
            </li>
        </ul>
    </section>

</template>
<style scoped>
   h1{
    font-weight: bold;
    font-size: 1.2rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
   }
    #studentList{
        padding: 10px 20px;
        background-color: whitesmoke;
    }
    #studentList li{
        margin: 5px;
    }
    .studentCount{
        background-color: lightgray;
        margin: 2px;
        border-radius: 3px;
        padding: 1px 2px;
    }
</style>