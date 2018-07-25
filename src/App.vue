<template>
  <div id="app">
    <!-- Навигация -->
      <nav-bar/>

      <router-view/>

    <!-- Футер -->
      <footer-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: 'App',

  components: {
    NavBar,
    FooterBar
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
