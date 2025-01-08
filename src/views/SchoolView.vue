<script setup>
    import School from '../obj/School.js';
    import TeachersVue from '../components/TeachersVue.vue';
    import Teacher from '../obj/Teacher.js';
    import { onMounted } from 'vue';
    var school = new School("RHS");
    //add Teachers
    for (var n = 0; n < 15; n++){
        school.teachers.push(new Teacher("newb " + n, school.terms, school.periods));
    }
    //create a program    
    let p = new Program("IB Draft");
    console.log(school.teachers);
    //add subjects to the program.
    p.subjects.push("Language Arts");
    p.subjects.push("Sciences");
    p.subjects.push("Arts");
    p.subjects.push("TOK");
    p.subjects.push("Extended Essay");
    p.subjects.push("Individuals and Societies");
    p.subjects.push("Language Acquisition");
    
    //add the program to the school. 
    school.programs.push(p);

    onMounted(() => 
        loadData()
    );

    function saveData(){
        let jsonSchool = JSON.stringify(school);
        localStorage.setItem("school", jsonSchool);

    }
    function loadData(){
        console.log("loading");
        let jsonSchool = localStorage.getItem("school");
        if (jsonSchool !== null){
            school = JSON.parse(jsonSchool);
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
        </b-tabs>
    </section>
</template>