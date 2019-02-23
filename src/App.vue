<template>
  <div id="app">
    <NavigationHeader/>
    <NavigationBar/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/faculty">Faculty</router-link>|
      <router-link to="/userboard">User board</router-link>
      <span v-if="isLoggedIn">
        |
        <button @click="logout">Logout</button>
      </span>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import NavigationHeader from '@/components/NavigationHeader.vue';

export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
    }
  },

  components: {
    NavigationBar, NavigationHeader
  },

  created() {
    this.$http.interceptors.response.use(undefined, error => {
      return new Promise((resolve, reject) => {
        if (
          error.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest
        ) {
          this.$store.dispatch('logout');
        }
        throw error;
      });
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
