<script setup>
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
    function checkAll(){
        console.log("checking");
        //loop through all the combintations and process the options
        //this might be recursive: 
        //rules: no fewer than three HL, no more thanp 4

        var allOptions = [];
        for (let group of props.program.groups){
            
            allOptions = group.generateOptions(allOptions);
            console.log(allOptions.length + " options are: " + JSON.stringify(allOptions));

        }
        console.log("-----  I collected them all -----");
        console.log(allOptions.length);
        console.log(JSON.stringify(allOptions));
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
                subj = props.program.getSubjectById(option[i]);
                if (subj.isHighLevel){
                    highLevel++;
                }
                //check for duplicates
                if (option[i] in valueSoFar){
                    allOptions[o].deletable = true;
                    console.log(allOptions[o] + " eliminated because of duplicates");
                }
                else{
                    valueSoFar[option[i]] = true;
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
        //Now we'll go through the remaining ones again, grab the schedules and verify them.
        // for (var i = 0; i < allOptions.length; i++){
        //     let schedule = getSchedule(allOptions[i]);
        //     let terms = {};
        //     for (let year in schedule){
        //         terms[year] = [];
        //         for (let option in schedule[year]){

        //         }
        //     }
        //     //now loop through each year
        //     //and each term
        //     // and count the classes in each term
        // }

    }
    function process(){
        //TODO: MAKE SURE YOU'RE DOING THIS BY SEQUENCE
        //reset the schedule
        schedule.value = {"11":[],"12":[]};
        console.log(selections.value);
        for (let key in selections.value){
            //looping through the chosen subjects
            //sort the classes?
            console.log("Selection " + selections.value[key]);
            console.log("classes:");
            let currSubject = props.program.getSubjectById(selections.value[key]);
            for (let c of currSubject.classSequence){
                var thisClass = props.program.getClassById(c);
               
                
                //looping through the classes
                //now loop through and grab the first offering for every class and add it to selections
                if (thisClass.offerings.length == 0){
                    console.log("A class is missing an offering");
                }
                else{
                    schedule.value[thisClass.year].push(thisClass.offerings[0]);
                }
            }
        }
        console.log("Schedule");
        console.log(schedule);
    }
    function getSchedule(subjects){
        schedule.value = {"11":[],"12":[]};
        for (let subject of subjects){
            //looping through the chosen subjects
            //sort the classes?
        
            console.log("classes:");
            let currSubject = props.program.getSubjectById(subject);
            for (let c of currSubject.classSequence){
                var thisClass = props.program.getClassById(c);           
                
                //looping through the classes
                //now loop through and grab the first offering for every class and add it to selections
                if (thisClass.offerings.length == 0){
                    console.log("A class is missing an offering");
                }
                else{
                    schedule.value[thisClass.year].push(thisClass.offerings[0]);
                }
            }
        }
        return schedule;
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
            <b-dropdown type="is-primary" expanded v-model = selections[group.name] :icon-right = "active?'menu-up':'menu-down'">
                <template #trigger="{ active }">
                <b-button
                    :label = "typeof(selections[group.name]) == 'undefined'?group.name:program.getSubjectById(selections[group.name]).name"
                    type="is-primary" expanded
                    :icon-right="active ? 'menu-up' : 'menu-down'" />
                </template>
                <div v-for = "subject in group.subjects">
            
                <b-dropdown-item :value = subject>{{ program.getSubjectById(subject).name }}</b-dropdown-item>
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

</style>