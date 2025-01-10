<script setup>
    import { ref, watch } from 'vue';
    import School from '../obj/School.js';
    import TeachersVue from '../components/TeachersVue.vue';
    import Teacher from '../obj/Teacher.js';
    import Program from '../obj/Program.js';
    import ProgramSetup from './ProgramSetup.vue'
    import ClassesVue from '../components/ClassesVue.vue';
    import { onMounted } from 'vue';
    import Group from '../obj/Group.js';
    const school = ref(new School("RHS"));
    //add Teachers
    function seedSchool(){
        let s = new School("RHS");
        for (var n = 0; n < 15; n++){
            s.teachers.push(new Teacher("newb " + n, s.terms, s.periods));
        }
        //create a program    
        
        
        let p = new Program("IB Draft", school.value.teachers);
        //add subjects to the program.
        p.groups.push(new Group("Sciences"));
        p.groups.push(new Group("Language Arts"));
        p.groups.push(new Group("Arts"));
        p.groups.push(new Group("TOK"));
        p.groups.push(new Group("Extended Essay"));
        p.groups.push(new Group("Individuals and Societies"));
        p.groups.push(new Group("Language Acquisition"));
        
        //add the program to the school. 
        s.programs.push(p);
        return s;
    }
    
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
        console.log(jsonSchool);
        if (jsonSchool !== null){
            school.value = School.FromJson(JSON.parse(jsonSchool));
            
        }
        else{
            school.value = seedSchool();
        }

    }
</script>
<template>
    <h1>{{ school.name }}</h1>
    <section>
        <b-tabs position="is-centered" class="block">
            <b-tab-item label="Teachers">
                <TeachersVue :teachers = school.teachers :school = school />
            </b-tab-item>            
            <b-tab-item label="Programs">
                <ProgramSetup :school = school />
            </b-tab-item>
        </b-tabs>
    </section>
</template>