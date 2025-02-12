<script setup>
    import edsuite from '@/obj/edsuite';
    import { ref } from 'vue';
    import LoginForm from '@/components/loginForm.vue';
    const appID = 2;
    const ed = edsuite.GetAxios();
    const loggedIn = ref(false);
    const loginFormActive = ref(false);
    const registerFormActive = ref(false);
    
    const username = ref("dunno");
    function openLoginForm(){
        loginFormActive.value = true;
    }

    function openRegisterForm(){
        registerFormActive.value = true;
    }
   

</script>
<template>
    <nav>
        <span id="label">Server Status</span>
        <span id="serverTools" v-if = loggedIn>
            {{ username }}
            <b-button @click="saveToServer()">Save</b-button>
            <b-button @click="logout()">Log out</b-button>
        </span>
        <span id="login" v-else>
            <b-button @click="openLoginForm()">Login</b-button>
            <b-button @click="openRegisterForm()">Register</b-button>

        </span>
    </nav>
    <!-- Need a modal login page here -->
     <b-modal v-model = "loginFormActive" has-modal-card trap-focus :destroy-on-hide = "false">
        <LoginForm @close = "loginFormActive = false" />

     </b-modal>
    <!-- Need a modal create account page here -->
    

</template>
<style scoped>
    nav{
        z-index: 100;
        background: rgba(0,0,0,0.7);
        color: white;
    }
</style>