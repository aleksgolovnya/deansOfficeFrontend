<template>
  <div id="app">
    <NavigationHeader/>
    <NavigationBar/>
    <transition name="moveInUp">
         <router-view/>
    </transition>
    <!-- <FooterBar/> -->
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import NavigationHeader from '@/components/NavigationHeader.vue';
import FooterBar from '@/components/FooterBar.vue';

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
    NavigationBar, NavigationHeader, FooterBar
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
//   min-height: calc(100vh - 120px);
//  overflow: hidden;
//  padding-bottom: 100px; /* height of your footer */
}

// animation for vue-router
.moveInUp-enter-active{
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0.5;
  }
  100%{
    opacity: 1;
  }
}
</style>
