<template>
  <div>
    <h1>Login</h1>
    <form class="login" @submit.prevent="login">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Enter your email"
        required
        autofocus
      >
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Enter your password"
        required
      >
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login () {
      if (this.password.length > 0) {
        this.$http
          .post('/login', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            localStorage.setItem('token', response.data.value);

            if (localStorage.getItem('token') != null) {
              this.$emit('loggedIn');
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push('userboard');
              }
            }
          })
          .catch(function (error) {
            console.error(error.response);
          });
      }
    }
  }
};
</script>
