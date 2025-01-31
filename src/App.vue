<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    Interbac 3
    <div class="wrapper">
      
    </div>
  </header>
  <nav>

<RouterLink to="/school">School</RouterLink>
</nav>
  <RouterView />
</template>

<style scoped>
  header{
    height: 125px;
    text-align: center;
    vertical-align: middle;
    line-height: 125px;
     background-color: navy;
     color: white;
     font-family: papyrus, cursive;
     font-size: 2em;
     vertical-align: middle;
  }
  header img{
    position: absolute;
    left: 20px;
  }
</style>
