<template>
  <div>
    <form class="login-form" @submit.prevent="createUser">
      <h1>Создать новый аккаунт</h1>

      <span v-if="isError == true" class="login-element-error">Непредвиденная ошибка, попробуйте еще раз</span>

      <input
        :class="isError ? 'login-element-input-error' : 'login-element-input'"
        type="text"
        v-model="user.email"
        placeholder="Введите ваш email"
        required
      >
      <input
        :class="isError ? 'login-element-input-error' : 'login-element-input'"
        type="password"
        v-model="user.password"
        placeholder="Введите ваш пароль"
        required
      >

      <input
        :class="isError ? 'login-element-input-error' : 'login-element-input'"
        type="text"
        v-model="user.lastName"
        placeholder="Введите вашу фамилию"
        required
      >

      <input
        :class="isError ? 'login-element-input-error' : 'login-element-input'"
        type="text"
        v-model="user.firstName"
        placeholder="Введите вашу имя"
        required
      >

      <input
        :class="isError ? 'login-element-input-error' : 'login-element-input'"
        type="text"
        v-model="user.middleName"
        placeholder="Введите вашу отчество"
        required
      >
      
      <button type="submit" class="login-element-button">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'The commoners',
      isError: false,
      user: {
        email: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: ''
      }
    };
  },

  methods: {
    createUser() {
      const user = this.user;
      this.$store
        .dispatch('signup', user)
        .then(() => {
          this.$router.push('/login')
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 550px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fcfcfc;
  text-align: center;
  /* border: 1px solid #b4b4b4; */
  border-radius: 34px;
  box-shadow: 1px 3px 10px 1px #e2e2e2;
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
  border: 1px solid #c0c0c0;
  padding: 12px 10px;
  width: 400px;
  outline: none;
  color: #3a3a3a;
  border-radius: 24px;
  transition: 0.25s;
}

.login-element-input:focus {
  width: 450px;
  border-color: #3CA98C;
}

.login-element-input-error {
  border: 0;
  display: block;
  margin: 20px auto;
  text-align: center;
  font-size: 15px;
  border: 2px solid #db866b;
  background-color: #fcf7f7fa;
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
  outline: none;
  color: #fdfdfd;
  font-size: 15px;
  border-radius: 20px;
  background-color: #4d4d4d;
  cursor: pointer;
  border: 1px solid #4d4d4d;
  padding: 8px 20px;
}

.login-element-button:hover {
  background: #707070;
  border: 1px solid #707070;
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
