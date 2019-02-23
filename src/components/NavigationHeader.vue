<template>
  <div class="header">
    <div class="header-text">
      <h2>Электронный университет</h2>
    </div>
    <div class="header-button">
      <button
        class="auth-button"
        @click="logout"
        v-if="isLoggedIn"
      >Выйти</button>
      <button
        class="auth-button"
        @click="redirectToLogin"
        v-if="!isLoggedIn"
      >Войти</button>
      <button
        class="auth-button"
        @click="redirectToLogin"
        v-if="!isLoggedIn"
      >Регистрация</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationHeader',

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
    },
    redirectToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.header-text {
  padding: 0px 0px;
  margin: 0px 0px;
  float: left;
}

.header-text h2 {
  margin-top: 5px;
  /* padding: 0px; */
  font-size: 25px;
  font-weight: 500;
  color: #2c3e50;
}

.header-button {
  padding: 3px 0px;
  margin: 5px 0px;
  float: right;
}

.header {
  max-width: 1200px;
  margin: auto;
  padding: 0px 20px;
  height: 40px;
}

.auth-button {
  text-align: center;
  border: 1px solid #222222;
  height: 32px;
  padding: 0 14px;
  margin-left: 16px;
  outline: none;
  color: #2b2b2b;
  font-size: 15px;
  border-radius: 4px;
  transition: .1s;
  background-color: #ffffff;
  cursor: pointer;
}

.auth-button:hover {
  background: #f0f0f0;
}
</style>
