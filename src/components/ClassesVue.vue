<script setup>
    import Class from '@/obj/Classy.js'
    import ClassVue from '@/components/ClassVue.vue';
    const props = defineProps({
        classes: [Class],

    });
    function newClass(){
        props.classes.unshift(new Class("New Class"));

    }
    function deleteClass(index){
        props.classes.splice(index,1);    
    }
</script>
<template>

    <table>
        <thead>
        <tr>
            <th>Classes</th>
            <td><b-button @click=newClass> + </b-button></td>
        </tr>
    </thead>
    <tbody>
        <tr v-for="c, index in classes" >
            <ClassVue @deleteClass = deleteClass(index) :c = c />
        </tr>
    </tbody>
</table>
</template>