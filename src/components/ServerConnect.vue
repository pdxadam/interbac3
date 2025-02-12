<script setup>
    import edsuite from '@/obj/edsuite';
    import { ref } from 'vue';
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
            <b-button @click="login()">Login</b-button>
            <b-button @click="register()">Register</b-button>

        </span>
    </nav>
    <!-- Need a modal login page here -->
     <b-modal v-model = "registerFormActive" has-modal-card trap-focus :destroy-on-hide = "false">
        <template>
            
        </template>

     </b-modal>
    <!-- Need a modal create account page here -->
    

</template>
<style scoped>
    nav{
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
    }
</style>