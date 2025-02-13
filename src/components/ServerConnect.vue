<script setup>
    import edsuite from '@/obj/edsuite';
    import { ref } from 'vue';
    import { ToastProgrammatic as Toast } from 'buefy'
    import LoginForm from '@/components/loginForm.vue';
    import School from '@/obj/School.js';
    const props = defineProps({
        school: School,
    });
    const toast = new Toast();

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
    function updateLogin(value){
        if (value === true){
            toast.open({duration: 3000, type: "is-success", message: "Login Successful"});
        }
        else{
            toast.open({duration: 3000, type: "is-danger", message: "Login Failed"});
        }
        loggedIn.value = value;
    }
    async function fetchData(){
        if (!confirm("Are you sure you want to replace existing data with server data")){
            toast.open("Request Canceled");
            return;
        }

        let d = await ed.sendPost({rq:30});
        if (typeof(d) == "string" && d.startsWith("Error")){
            toast.open({duration: 3000, type: "is-danger", message: d });
        }
        else if (d.length == 0){
            toast.open({duration: 3000, type: "is-warning", message: "Server data was empty"});
        }
        else{
            Object.assign(props.school, School.FromJson(d));
            toast.open({duration: 3000, type: "is-success", message: "School information updated" });
        }
    }
    async function saveToServer(){
        const jsonSchool = JSON.stringify(props.school);
        const res = await(ed.sendPost({ rq:40, d: jsonSchool }));
        toast.open(res);
        //TODO: verify these results as the kind of json we want.--there is some ugliness here.
        

    }
    async function logout(){
        const res = await ed.sendPost({rq:100});
        if (res == "User logged out"){
            toast.open("Logout Successful");
            loggedIn.value = false;
        }
        else{
            toast.open({duration: 3000, type: "is-warning", message: "There was a problem logging out."});
        }
    }

</script>
<template>
    <nav>
        <span id="label">Server Status</span>
        {{ loggedIn }}
        <span id="serverTools" v-if = loggedIn>
            {{ username }}
            <b-button @click = "fetchData()">Get Data</b-button>
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
        <LoginForm @loginUpdate = "(v) => updateLogin(v)" @close = "loginFormActive = false" />

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