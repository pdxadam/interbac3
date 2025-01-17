<script setup>
//TODO: Add support for SL/HL as an option instead of a separate subject;
    import { ref } from 'vue';
    import Program from '@/obj/Program.js';
    import Offering from '@/obj/Offering.js';
    import Group from '@/obj/Group.js';
    import Classy from '@/obj/Classy.js';
    const props = defineProps({
        program: Program,
    });
    const schedule = ref({"11": [],"12": []});
    console.log("Groups---");
    console.log(props.program.groups);
    console.log(props.program.classes);
    const selections = ref({});
    const viableOptions = ref([]); //holds the possible options after we do checkAll
    function checkAll(){
        //TODO: avoid duplicates with different levels (BIO SL and BIO HL);
        console.log("checking");
        //loop through all the combintations and process the options
        //this might be recursive: 
        //rules: no fewer than three HL, no more thanp 4

        var allOptions = [];
        for (let group of props.program.groups){
            
            allOptions = group.generateOptions(allOptions, props.program);
            console.log(allOptions.length + " options are: " + JSON.stringify(allOptions, null, 2));

        }
        console.log("-----  I collected them all -----");
        console.log(allOptions.length);
        console.log(JSON.stringify(allOptions, null, 2));
        console.log("--------------------------------");
        var deletable = [];
        //now go through the options and check the rules
        for (var o = 0; o < allOptions.length; o++){
            //count the high level options
            let highLevel = 0;
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
                }
                else{
                    valueSoFar[option[i].subjID] = true;
                }
                
            }
            if (highLevel < 3 || highLevel > 4){ //eliminate it if it's high level
                    console.log(allOptions[o] + " eliminated because high level choices = " + highLevel);
                    allOptions[o].deletable = true;
            }//end high level check
        }
        
        //now it is time to delete the deletables -- go backwards
        for (var i = allOptions.length-1; i>=0; i--){
            if (allOptions[i].deletable){
                allOptions.splice(i,1)
            }
        }
        console.log("Options remaining: count = " + allOptions.length);
        for (let option of allOptions){
            for(let subj of option){
            console.log(props.program.getSubjectById(subj.subjID).name);
            }
            console.log("-----");
        } 
        // Now we'll go through the remaining ones again, grab the schedules and verify them.
        for (var i = 0; i < allOptions.length; i++){
            let proposedSchedule = getSchedule(allOptions[i]);
            let terms = {};
            console.log("Schedule: ", proposedSchedule);   
                for (let year in proposedSchedule){   
                    console.log(year, ": ", proposedSchedule[year]); 
                    terms[year] = [];                    
                    for (let offering of proposedSchedule[year]){
                        let courseTerm = offering.term;
                        if (terms[year][courseTerm] == null){
                            terms[year][courseTerm] = 0;
                        }
                        terms[year][courseTerm]++;
                        console.log("There are ", props.program.periods, " periods in the program");
                        if (terms[year][courseTerm] > props.program.periods){
                            console.log("Option deleted because too many courses in term ", year, ": ", courseTerm);
                            console.log("Coures Count: ", terms[year][courseTerm]);
                            allOptions[i].deletable = true;
                        }
                    }
                    console.log("terms: ", terms);
            }
            //now loop through each year
            //and each term
            // and count the classes in each term
        }
        //now it is time to delete the deletables -- go backwards
        for (var i = allOptions.length-1; i>=0; i--){
            if (allOptions[i].deletable){
                allOptions.splice(i,1)
            }
        }
        
        console.log(allOptions.length, " options remain");
        viableOptions.value = allOptions;
        

    }

    function process(){
        //TODO: MAKE SURE YOU'RE DOING THIS BY SEQUENCE
        //TODO: adjust layout to handle the 'offersSL', 'offersHL' options
        //reset the schedule
        //need to strip out the lead
        alert("process");
        console.log("processing: ", selections.value);
        
        let groupedSelections = [];
        for (let group in selections.value){
            console.log("Selection," , selections.value[group]);
            groupedSelections.push(selections.value[group]);

        }
        getSchedule(groupedSelections);
        // schedule.value = {"11":[],"12":[]};
        // console.log(selections.value);
        // for (let key in selections.value){
        //     //looping through the chosen subjects
        //     //sort the classes?
        //     console.log("Selection " + selections.value[key]);
        //     console.log("classes:");
        //     let currSubject = props.program.getSubjectById(selections.value[key]);
        //     for (let c of currSubject.classSequence){
        //         var thisClass = props.program.getClassById(c);
               
                
        //         //looping through the classes
        //         //now loop through and grab the first offering for every class and add it to selections
        //         if (thisClass.offerings.length == 0){
        //             console.log("A class is missing an offering");
        //         }
        //         else{
        //             schedule.value[thisClass.year].push(thisClass.offerings[0]);
        //         }
        //     }
        // }
        console.log("Schedule");
        console.log(schedule.value);
    }
    function getSchedule(subjects){
       
        //takes subjects as array of objects of {"subjID":int, "HL":boolean}
        schedule.value = {"11":[],"12":[]};
        for (let subject of subjects){
            console.log("subject1", subject);
           
            console.log("classes:");

            let currSubject = props.program.getSubjectById(subject.subjID);
            console.log("currSubject", currSubject);
            let currSequence = currSubject.HL?currSubject.classSequence:currSubject.HL_ClassSequence;
            
            for (let c of currSequence){
                var thisClass = props.program.getClassById(c);           
                
                //looping through the classes
                //now loop through and grab the first offering for every class and add it to selections
                if (thisClass.offerings.length == 0){
                    console.log("A class is missing an offering");
                }
                else{
                    schedule.value[thisClass.year].push(thisClass.offerings[0]);
                    console.log("offering: ", thisClass.offerings[0].courseTitle);
                }
            }
        }
        return schedule.value;
        //take in an array of subject ids, and build the appropriate schedule for that
    }
    // function getLabel(groupname){
    //     console.log(groupname);
    //     if (selections.value[groupname] ==  undefined){
    //         return groupname;
    //     }
    //     else{
    //         return selections.value[groupname];
    //     }
    // }
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
                    :label = "typeof(selections[group.name]) == 'undefined'?group.name:program.getSubjectById(selections[group.name].subjID).name"
                    type="is-primary" expanded
                    :icon-right="active ? 'menu-up' : 'menu-down'" />
                </template>
                <div v-for = "subject in group.subjects">            
                    <b-dropdown-item v-if = "program.getSubjectById(subject) != null && program.getSubjectById(subject).offersSL" :value = '{"subjID": subject, "HL": false}'>{{ subject }}: {{ program.getSubjectById(subject).name }} SL</b-dropdown-item>
                    <b-dropdown-item v-if = "program.getSubjectById(subject) != null && program.getSubjectById(subject).offersHL" :value = '{"subjID": subject, "HL": true}'>{{ subject }}: {{ program.getSubjectById(subject).name }} HL</b-dropdown-item>
                    <b-dropdown-item v-if = "program.getSubjectById(subject) == null">Error retrieving{{  subject }}</b-dropdown-item>
                </div>
            </b-dropdown>
            </section>
        </div>
    </div>
    <div id="results">
        
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
                        <p v-for = "c in value"><span v-if = "c.term == i">{{ c.courseTitle }}</span></p>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    <div id="checkAllResults" v-if = "viableOptions.length > 0">
        <h1>Viable Options</h1>
        <ul>
            <!-- TODO: Test that clicking this option displays the schedule -->
            <li v-for = "o in viableOptions" @click = "selections = o">
                <ul>
                    <li v-for = "s in o">
                        {{ program.getSubjectById(s.subjID) }} {{ s.HL?"HL":"SL" }}
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


</style>