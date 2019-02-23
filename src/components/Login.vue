<template>
  <div>
    <form class="login-form" @submit.prevent="login">
      <h1>Вход в систему</h1>
      <span v-if="loginError == true" class="login-element-error">Неверный email или пароль</span>
      <input
        :class="loginError ? 'login-element-input-error' : 'login-element-input'"
        type="text"
        v-model="email"
        placeholder="Введите ваш email"
        required
      >
      <input
        :class="loginError ? 'login-element-input-error' : 'login-element-input'"
        type="password"
        v-model="password"
        placeholder="Введите ваш пароль"
        required
      >
      <button type="submit" class="login-element-button">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: false
    };
  },
  methods: {
    login() {
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch(error => {
          console.log(error);
          if (
            error.response.data.message === 'Incorrect password' &&
            error.response.status === 500
          ) {
            this.loginError = true;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 550px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f7f7f7;
  text-align: center;
  border: none;
  border-radius: 34px;
  box-shadow: 5px 7px 10px #e2e2e2;
}

.login-form h1 {
  color: rgb(43, 43, 43);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 35px;
}

.login-element-input {
  border: 0;
  display: block;
  margin: 20px auto;
  text-align: center;
  font-size: 15px;
  border: 2px solid #3498db;
  padding: 12px 10px;
  width: 400px;
  outline: none;
  color: #3a3a3a;
  border-radius: 24px;
  transition: 0.25s;
}

.login-element-input:focus {
  width: 450px;
  border-color: #2ecc71;
}

.login-element-input-error {
  border: 0;
  display: block;
  margin: 20px auto;
  text-align: center;
  font-size: 15px;
  border: 2px solid #db866b;
  background-color: #fcf5f5fa;
  padding: 12px 10px;
  width: 350px;
  outline: none;
  color: #3a3a3a;
  border-radius: 24px;
  transition: 0.25s;
}

.login-element-button {
  display: block;
  margin: 20px auto;
  text-align: center;
  border: none;
  padding: 10px 40px;
  outline: none;
  color: #fdfdfd;
  font-size: 20px;
  border-radius: 24px;
  transition: 0.25s;
  background-color: #2b77aa;
  cursor: pointer;
}

.login-element-button:hover {
  background: #3498db;
}

.login-element-error {
  background-color: #e94747;
  color: rgb(255, 255, 255);
  font-size: 15px;
  padding: 5px 15px;
  border-radius: 24px;
  opacity: 0.75;
}
</style>
