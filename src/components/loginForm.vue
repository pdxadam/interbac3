<script setup>
    import { ref } from 'vue';
    import edsuite from '@/obj/edsuite.js';
    const ed = edsuite.GetAxios();

    const isLoginSuccessful = ref(false);
    const loginMessage = ref("");
    const username = ref("");
    const password = ref("");
    const emit = defineEmits(["close"]);
    async function login(){
        const response = await ed.sendPost({"rq": 10, 
        "u": username.value, 
        "p": password.value, 
        "app": 2});
        alert(response);
    }
    function close(){
        username.value = "";
        password.value = "";
        emit("close");
    }
</script>
<template>
    <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Login</p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Email">
                            <b-input
                                type="text"
                                v-model="username"
                                placeholder="Your username"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                v-model="password"
                                password-reveal
                                placeholder="Your password"
                                required>
                            </b-input>
                        </b-field>

                        <b-checkbox>Remember me</b-checkbox>
                    </section>
                    <footer class="modal-card-foot">
                        <b-button
                            label="Close"
                            @click="close()" />
                        <b-button
                            label="Login"
                            type="is-primary" 
                            @click = "login()"/>
                    </footer>
                </div>
            </form>

</template>
<style scoped>

</style>