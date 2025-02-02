<script setup>
    import Program from '@/obj/Program.js';
    import { onMounted } from 'vue';
    const props = defineProps({
        requirement: {courseID: Number, year: Number, sequence: Number},
        program: Program,
    });
    const emit = defineEmits(['close']);
    var startYear, startSequence;
    onMounted( () => {
         startYear = props.requirement.year;
         startSequence = props.requirement.sequence;
    });
  

    function resetData(){
        props.requirement.year = startYear;
        props.requirement.sequence = startSequence;
    }
</script>
<template>
    <form action = "">
     <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ program.getCourseByID(requirement.courseID).title }}</p>
            <button
                type="button"
                class="delete"  
                @click="$emit('close')"/>
        </header>
        <section class="modal-card-body">
            <b-field label="Year">
                <b-input
                    type="number"
                    v-model = "requirement.year"
                    placeholder="Year"
                    required>
                </b-input>
            </b-field>

            <b-field label="Sequence">
                <b-input
                    type="number"
                    v-model = requirement.sequence
                    placeholder="Sequence"
                    required>
                </b-input>
            </b-field>

        </section>
        <footer class="modal-card-foot">
            <b-button
                label="Reset"
                @click="resetData()" />
            <b-button
                label="Save"
                type="is-primary" 
                @click = "emit('close')" />
        </footer>
    </div>
</form>
</template>
<style scoped>

</style>