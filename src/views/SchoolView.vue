<script setup>
    import { ref, watch } from 'vue';
    import School from '../obj/School.js';
    import TeachersVue from '../components/TeachersVue.vue';
    import Teacher from '../obj/Teacher.js';
    import Program from '../obj/Program.js';
    import ProgramSetup from './ProgramSetup.vue'
    import ClassesVue from '../components/ClassesVue.vue';
    import { onMounted } from 'vue';
    import Subject from '../obj/Subject.js';
    const school = ref(new School("RHS"));
    //add Teachers
    for (var n = 0; n < 15; n++){
        school.value.teachers.push(new Teacher("newb " + n, school.value.terms, school.value.periods));
    }
    //create a program    
    
    
    let p = new Program("IB Draft");
    //add subjects to the program.
    p.subjects.push(new Subject("Language Arts"));
    p.subjects.push(new Subject("Sciences"));
    p.subjects.push(new Subject("Arts"));
    p.subjects.push(new Subject("TOK"));
    p.subjects.push(new Subject("Extended Essay"));
    p.subjects.push(new Subject("Individuals and Societies"));
    p.subjects.push(new Subject("Language Acquisition"));
    
    //add the program to the school. 
    school.value.programs.push(p);
    console.log(school);
    onMounted(() => 
        loadData()
    );
    watch(school, saveData, { deep: true});
    function saveData(){
        let jsonSchool = JSON.stringify(school.value);
        localStorage.setItem("school", jsonSchool);

    }
    function loadData(){
        console.log("loading");
        let jsonSchool = localStorage.getItem("school");
        if (jsonSchool !== null){
            school.value = JSON.parse(jsonSchool);
        }

    }
</script>
<template>
    <h1>{{ school.name }}</h1>
    <section>
        <b-tabs position="is-centered" class="block">
            <b-tab-item label="Teachers">
                <TeachersVue :teachers = school.teachers />
            </b-tab-item>            
            <b-tab-item label="Programs">
                <ProgramSetup :programs = school.programs />
            </b-tab-item>
        </b-tabs>
    </section>
</template>