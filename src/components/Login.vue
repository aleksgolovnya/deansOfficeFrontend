<template>
  <div>
    <h1>Login</h1>
    <form class="login" @submit.prevent="login">
      <label class="login-element">Email</label>
      <input
        class="login-element"
        v-model="email"
        placeholder="Enter your email"
        required
        autofocus
      >
      <br>
      <label class="login-element">Password</label>
      <input
        class="login-element"
        type="password"
        v-model="password"
        placeholder="Enter your password"
        required
      >
      <br>
      <button type="submit" class="login-element">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.login-element {
  padding: 5px;
  margin: 5px;
}
</style>
