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
        //rules: no fewer than three HL, no more than 4

        var allOptions = [];
        for (let group of props.program.groups){
            
            allOptions = group.generateOptions(allOptions);
            console.log(allOptions.length + " options are: " + JSON.stringify(allOptions));

        }
        console.log("-----  I checked them all -----");
        console.log(allOptions.length);
        console.log(JSON.stringify(allOptions));
        console.log("--------------------------------")

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