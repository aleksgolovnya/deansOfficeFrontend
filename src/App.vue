<template>
  <div id="app">
    <!-- Навигация -->
    <nav-bar v-show="currentRoute != '/login'"></nav-bar>

    <!-- Контент страницы -->
    <router-view/>

    <!-- Футер -->
    <footer-bar  v-show="currentRoute != '/login/'"></footer-bar>
  </div>
</template>

<script>
import NavBar from '@/components/navigation/Navbar.vue'
import FooterBar from '@/components/navigation/FooterBar.vue'
import axios from 'axios'

export default {
  name: 'App',

  data () {
    return {
      currentRoute: this.$router.currentRoute.path
    }
  },

  components: {
    NavBar,
    FooterBar
  },

  watch: {
    '$route' (to, from) {
      this.currentRoute = to.path
    }
  },

  methods: {
    responseError () {
      axios.interceptors.response.use((response) => {
        return response
      }, function (error) {
        // Do something with response error
        if (error.response.status === 401) {
          console.log('unauthorized, logging out ...')
          this.$router.replace('/login')
        }
        return Promise.reject(error.response)
      })
    }
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
