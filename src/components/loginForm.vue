<script setup>
    import { ref, emit } from 'vue';
    import edsuite from 'edsuite';
    const ed = edsuite.GetAxios();

    const isLoginSuccessful = ref(false);
    const loginMessage = ref("");
    const username = ref("");
    const password = ref("");
    const emits = defineEmits(["close"]);
    function login(){
        ed.sendPost({"rq": 10, 
        "u": username.value, 
        "p": password.value, 
        "app": 2});
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
                                :value="username"
                                placeholder="Your username"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                :value="password"
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