<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Добро пожаловать в университет"/>
     -->
     <div class="home2">
      <h1 class="h1">Добро пожаловать в университет</h1>
      <p>
        In order to get info about REST API,<br>
        check out the
        <a href="https://github.com/aleksgolovnya/university-spa-backend" target="_blank" rel="noopener">github</a>.
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
  .home {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

