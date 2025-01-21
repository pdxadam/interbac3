<script setup>

    import { ref, watch } from 'vue';
    import Program from '@/obj/Program.js';
    import Offering from '@/obj/Offering.js';
    import Group from '@/obj/Group.js';
    import Classy from '@/obj/Classy.js';
    const props = defineProps({
        program: Program,
    });
   
    const schedule = ref({"11": [],"12": []});
    const selections = ref({}); 
    const hasCheckedAll = ref(false);   
    const viableOptions = ref([]); //holds the possible options after we do checkAll
    const badOptions = ref([]);
    //  Pagination Variables 
    const currentGood = ref(1);
    const currentBad = ref(1);
    watch(currentGood, setSelection);
    watch(currentBad, setBadSelection);
    function setSelection(){
        console.log(currentGood.value);
        console.log(viableOptions.value[0]);
        getSchedule(viableOptions.value[currentGood.value - 1]);
    }
    function setBadSelection(){
        getSchedule(badOptions.value[currentBad.value-1]);
    }
    function checkAll(){  
        //loop through all the combintations and process the options
        //this might be recursive: 
        //rules: no fewer than three HL, no more thanp 4
        var allOptions = [];
        badOptions.value = [];
        for (let group of props.program.groups){            
            allOptions = group.generateOptions(allOptions, props.program);            
        }
        
        var deletable = [];
        //now go through the options and check the rules
        for (var o = 0; o < allOptions.length; o++){
            
            //count the high level options
            let highLevel = 0;
            allOptions[o].reason = "";
            let dupTest = {};
            let valueSoFar = Object.create(null);
            for (var i = 0; i < allOptions[o].length; i++){
                //count the high level entries
                let option = allOptions[o]
                let subj = props.program.getSubjectById(option[i].subjID);
                if (option[i].HL){
                    highLevel++;
                }
                //check for duplicates
                if (option[i].subjID in valueSoFar){
                    allOptions[o].deletable = true;
                    console.log(allOptions[o] + " eliminated because of duplicates");
                    allOptions[o].reason += "duplicate choices.  ";
                }
                else{
                    valueSoFar[option[i].subjID] = true;
                }
                
            }
            if (highLevel < 3 || highLevel > 4){ //eliminate it if it's high level
                    console.log(allOptions[o] + " eliminated because high level choices = " + highLevel);
                    allOptions[o].reason += " high-level choices = " + highLevel;
                    allOptions[o].deletable = true;
            }//end high level check
        }
        
        //now it is time to delete the deletables -- go backwards
        for (var i = allOptions.length-1; i>=0; i--){
            if (allOptions[i].deletable){
                badOptions.value.push(allOptions[i]);
                allOptions.splice(i,1)
            }
        }
        
     
        // Now we'll go through the remaining ones again, grab the schedules and verify them.
        for (var i = 0; i < allOptions.length; i++)
        {
            let proposedSchedule = getSchedule(allOptions[i]);
            let terms = {};  
            for (let year in proposedSchedule){   
                terms[year] = [];                    
                for (let offering of proposedSchedule[year]){
                    let courseTerm = offering.term;
                    if (terms[year][courseTerm] == null){
                        terms[year][courseTerm] = 0;
                    }
                    terms[year][courseTerm]++;
                    if (terms[year][courseTerm] > props.program.periods){
                        allOptions[i].deletable = true;
                        allOptions[i].reason += "too many courses in term year " + year + " term " + courseTerm
                    }
                }
            }
        }
        //now it is time to delete the deletables -- go backwards
        for (var i = allOptions.length-1; i>=0; i--){
            if (allOptions[i].deletable){
                badOptions.value.unshift(allOptions[i]);
                allOptions.splice(i,1)
            }
        }
 
        viableOptions.value = allOptions;
        // pBar.style = "display: none";
        hasCheckedAll.value = true;
    }
    function process(){
        //TODO: MAKE SURE YOU'RE DOING THIS BY SEQUENCE
        
        let groupedSelections = [];
        for (let group in selections.value){
            groupedSelections.push(selections.value[group]);

        }
        getSchedule(groupedSelections);
        
    }
    function getChoiceTitle(selection){
        let fullTitle = props.program.getSubjectById(selection.subjID).name;
        if (selection.HL){
            fullTitle += " HL";
        }
        else{
            fullTitle += " SL"
        }
        return fullTitle;
    }
    function getSchedule(subjects){
       
        //takes subjects as array of objects of {"subjID":int, "HL":boolean}
        schedule.value = {"11":[],"12":[]};
        for (let subject of subjects){        

            let currSubject = props.program.getSubjectById(subject.subjID);
            console.log("currSubject", currSubject);
            let currSequence = subject.HL?currSubject.HL_ClassSequence:currSubject.classSequence;
            
            for (let c of currSequence){
                var thisClass = props.program.getClassById(c);           
                
                //looping through the classes
                //now loop through and grab the first offering for every class and add it to selections
                if (thisClass.offerings.length == 0){
                    alert("A class is missing an offering: " + thisClass.title);
                }
                else{
                    //we are just taking the first offering
                    schedule.value[thisClass.year].push(thisClass.offerings[0]);
                }
            }
        }
        return schedule.value;

        
    }
    
</script>
<template>
    <b-button @click = "checkAll()">Check All</b-button>
    <b-button @click = "process()">Process</b-button>
    <div id="groups">
        List all the groups with the subjects as dropdowns
        On Selection, fill the classes of the table
        <div v-for = "group in program.groups">
            <section>
            <b-dropdown type="is-primary" expanded v-model = "selections[group.name]" :icon-right = "active?'menu-up':'menu-down'">
                <template #trigger="{ active }">
                <b-button
                    :label = "typeof(selections[group.name]) == 'undefined'?group.name:getChoiceTitle(selections[group.name])"
                    type="is-primary" expanded
                    :icon-right="active ? 'menu-up' : 'menu-down'" />
                </template>
                <div v-for = "subject in group.subjects">            
                    <b-dropdown-item v-if = "program.getSubjectById(subject) != null && program.getSubjectById(subject).offersSL" :value = '{"subjID": subject, "HL": false}'>{{ program.getSubjectById(subject).name }} SL</b-dropdown-item>
                    <b-dropdown-item v-if = "program.getSubjectById(subject) != null && program.getSubjectById(subject).offersHL" :value = '{"subjID": subject, "HL": true}'>{{ program.getSubjectById(subject).name }} HL</b-dropdown-item>
                    <b-dropdown-item v-if = "program.getSubjectById(subject) == null">Error retrieving{{  subject }}</b-dropdown-item>
                </div>
            </b-dropdown>
            </section>
        </div>
    </div>
    <div id="results">
        <table><tbody><tr>
            <td>
                <table v-for="(value, key) in schedule">
                    <thead>
                        <tr>
                            <th :colspan = "program.terms">
                                Schedule: {{ key }}
                            </th>
                        </tr>
                        <tr>
                            <th v-for = "i in program.terms">
                                Term {{ i }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td v-for = "i in program.terms">
                                <p v-for = "c in value"><span v-if = "c.term == i" style="padding: 2px; display: block;border: 1px solid black;">{{ c.courseTitle }}</span></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td id = "allResults" v-if = "viableOptions.length > 0 || badOptions.length > 0">
                <h2>Explore Options</h2>
                <h3 v-if = "hasCheckedAll">
                    Good Options: {{  viableOptions.length }}...Bad Options: {{ badOptions.length }}

                </h3>
                <b-tabs>
                    <b-tab-item label="Viable Options" v-if = "viableOptions.length > 0">
                                
                <table><!-- show the subject choices -->
                    <thead>
                        <tr><th>Subject Choices</th></tr>
                        <tr><td>
                            <!-- Pagination Buttons -->
                            <b-pagination
                                :total="viableOptions.length"
                                v-model="currentGood"
                                range-before="1"
                                range-after="2"
                                order="default"
                                size="is-small"
                                simple="true"
                                rounded="false"
                                per-page="1"
                                icon-prev="chevron-left"
                                icon-next="chevron-right"
                                aria-next-label="Next page"
                                aria-previous-label="Previous page"
                                aria-page-label="Page"
                                aria-current-label="Current page"
                                page-input="true"
                                page-input-position="default"
                             />
                        

                        </td></tr>
                    </thead>
                    <tbody>
                        <tr v-for = 'sel in viableOptions[currentGood - 1]'>
                            <td>{{ getChoiceTitle(sel) }}</td>
                        </tr>
                    </tbody>
                </table>
            </b-tab-item>
            <b-tab-item label="Bad Options" v-if = "badOptions.length > 0">
                <table><!-- show the subject choices -->
                    <thead>
                        <tr><th>Subject Choices</th></tr>
                        <tr><td>
                            <!-- Pagination Buttons -->
                            <b-pagination
                                :total="badOptions.length"
                                v-model="currentBad"
                                range-before="1"
                                range-after="2"
                                order="default"
                                size="is-small"
                                simple="true"
                                rounded="false"
                                per-page="1"
                                icon-prev="chevron-left"
                                icon-next="chevron-right"
                                aria-next-label="Next page"
                                aria-previous-label="Previous page"
                                aria-page-label="Page"
                                aria-current-label="Current page"
                                page-input="true"
                                page-input-position="default"
                             />
                        

                        </td></tr>
                    </thead>
                    <tbody>
                        <tr v-for = 'sel in badOptions[currentBad - 1]'>
                            <td>{{ getChoiceTitle(sel) }}</td>
                        </tr>
                        <tr>
                            <td>{{ badOptions[currentBad-1].reason }}</td>
                        </tr>
                    </tbody>
                </table>


            </b-tab-item>
        </b-tabs>
            </td>
        </tr></tbody></table>

    </div>
    <div id="checkAllResults" v-if = "viableOptions.length > 0 || badOptions.length > 0">
        <h1>Viable Options</h1>
        <ul>
            <li v-for = "o in viableOptions" @click = "selections = o">
                <ul id=goodOptions>
                    <li  @click = "getSchedule(o)">
                       <span v-for = "s in o"> {{ program.getSubjectById(s.subjID).name }} {{ s.HL?"HL":"SL" }} , </span>
                    </li>
                </ul>                    
            </li>
        </ul>
        <h1>Bad Options</h1>
        <ul>
            <li v-for = "o in badOptions" @click = "selections = o">
                {{ o.reason }}
                <ul id=badOptions>
                    <li @click = "getSchedule(o)">
                        
                       <span v-for = "s in o"> {{ program.getSubjectById(s.subjID).name }} {{ s.HL?"HL":"SL" }}, </span>
                    </li>
                </ul>                    
            </li>
        </ul>
    </div>





</template>
<style scoped>
    td{
        border: 1px solid black;
        padding: 2px;
    }
    table{
        border-collapse: collapse;
    }
    #groups{
        width: 200px;
        float: left;

    }
    #results{
        margin-left: 205px;
    }
    #checkAllResults{
        background-color: yellow;

    }
    #checkAllResults > ul{
        background-color: white !important; 
        margin: 5px !important;
        list-style: disc !important;

    }

    .hidden{
        display: none;
    }
    .processing{
        display: block;

    }
    #goodOptions{
        background-color: lightgreen;
    }
    #badOptions{
        background-color: #d6a7a8;
    }
    #allResults{
        width: 25%;
    }

</style>