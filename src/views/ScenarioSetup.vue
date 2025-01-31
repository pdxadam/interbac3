<script setup>
    import { ref } from 'vue';
    import Program from '@/obj/Program.js';
    import Offering from '@/obj/Offering.js';
    import Group from '@/obj/Group.js';
    import Course from '@/obj/Course.js';
    const props = defineProps({
        program: Program,
    });
    const schedule = ref({"11": [],"12": []});
    console.log("Groups---");
    console.log(props.program.groups);
    console.log(props.program.courses);
    const selections = ref({});

    function process(){
        //reset the schedule
        schedule.value = {"11":[],"12":[]};
        console.log(selections.value);
        for (let key in selections.value){
            //looping through the chosen subjects
            
            console.log("Selection " + selections.value[key]);
            console.log("courses:");

            for (let c of selections.value[key].courseSequence){
                var thisCourse = props.program.getCourseById(c);
               
                
                //looping through the classes
                //now loop through and grab the first offering for every class and add it to selections
                if (thisCourse.offerings.length == 0){
                    console.log("A course is missing an offering");
                }
                else{
                    schedule.value[thisCourse.year].push(thisCourse.offerings[0]);
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
    <b-button @click = "process()">Process</b-button>
    <div id="groups">
        List all the groups with the subjects as dropdowns
        On Selection, fill the courses of the table
        <div v-for = "group in program.groups">
            <section>
            <b-dropdown type="is-primary" expanded v-model = selections[group.name] :icon-right = "active?'menu-up':'menu-down'">
                <template #trigger="{ active }">
                <b-button
                    :label = "typeof(selections[group.name]) == 'undefined'?group.name:selections[group.name].name"
                    type="is-primary" expanded
                    :icon-right="active ? 'menu-up' : 'menu-down'" />
                </template>
                <b-dropdown-item :value = subject v-for = "subject in group.subjects">{{ subject.name }}</b-dropdown-item>
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