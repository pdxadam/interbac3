<script setup>
    import { ref, watch } from 'vue';
    import json from '@/assets/IBStart.json';
    import School from '../obj/School.js';
    import Teacher from '../obj/Teacher.js';
    import Program from '../obj/Program.js';
    import ProgramSetup from './ProgramSetup.vue'
    import { onMounted } from 'vue';
    import Group from '../obj/Group.js';
    import LoginStatus from '@/EdSuite/ServerConnect.vue';
    const school = ref(new School("RHS"));
    const file = ref(null);
    const hasChanged = ref(false);
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
    
    onMounted(() => {
        //loadData();
        const unwatch = watch(school, saveData, { deep: true});
    });
    
    function saveData(){
        hasChanged.value = true;
        // let jsonSchool = JSON.stringify(school.value);
        // localStorage.setItem("school", jsonSchool);
    }
    function loadData(){
        let jsonSchool = localStorage.getItem("school");
        if (jsonSchool !== null){
            console.log(jsonSchool);
            school.value = School.FromJson(JSON.parse(jsonSchool));            
        }
        else{
            school.value = seedSchool();
        }
    }
    function downloadBackup(){
        var jSchool = school.value.getBackup();
        downloadFile(jSchool, "ibschool_backup.json");
    }
    function downloadFile(txt, filename) {
        
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
}

function loadStarter2(){
   
    if (confirm("Are you sure? Current data will be overwritten. Consider backing up first -- and turn off autosave")){
        
        let pSchool = School.CheckVersion(json);
        console.log("checkversioncomplete");
        const newSchool = School.FromJson(pSchool);
        console.log("new school complete");
        school.value = newSchool;

    }
}

function handleFile(file){
    var reader = new FileReader();
    reader.readAsText(file.value.files[0], "UTF-8");
    reader.onload = function(event){
        console.log(event.target.result);
        try{
            let rawSchool = JSON.parse(event.target.result);
            rawSchool = School.CheckVersion(rawSchool)
            const newSchool = School.FromJson(rawSchool);
            school.value = newSchool;
            
        alert("backup restored");
        }
        catch(e){
            alert("error restoring backup");
            console.log(e);            
        }      
    }
}
function handleFileUpload(){
    if (!confirm("This will delete current data. Are you sure? (We recommend you download a backup first.)")){
        return;
    }
    handleFile(file);

}
</script>
<template>
    
    <h1>{{ school.name }}</h1>
    <section>
        <LoginStatus @saved = "hasChanged = false" 
            @fetched = "(val) => Object.assign(school, School.FromJson(val))"
            :hasChanged = "hasChanged" 
            :appNumber = "2" 
            :obj = school />
    </section>
        <nav>
        <b-button @click="loadStarter2()">Load Starting Point (deletes current data)</b-button>
        <b-button @click="downloadBackup()">Download Backup</b-button>
        <h4>Upload backup: </h4><input type="file" v-on:change="handleFileUpload()" ref="file">
    </nav>
    <section>
        <b-tabs position="is-centered" class="block">                  
            <b-tab-item label="Programs">
                <ProgramSetup :school = school />
            </b-tab-item>
        </b-tabs>
    </section>
    <footer>
        Interbac by McLain
        <span>Data Version {{ parseFloat(school.version).toFixed(2) }}</span>
    </footer>
</template>
<style scoped>
    footer{
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background: radial-gradient(lightgray,whitesmoke);
        text-align: center;
    }
    footer span{
        position: absolute;
        right: 5px;
        font-size: 0.8rem;
        font-style: italic;
    }
</style>