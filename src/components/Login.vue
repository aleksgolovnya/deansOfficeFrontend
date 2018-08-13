<template>
  <div class="container-fluid">
    <div class="form">
      <h1 class="h1">Авторизация</h1>
      <b-form @submit="login" class="form-class">
        <b-form-group id="authLoginLabel"
                      label="Имя пользователя:"
                      label-for="authLogin"
                      class="form-group">
          <b-form-input id="authLogin"
                        type="text"
                        v-model="credentials.email"
                        required
                        placeholder="Введите логин">
          </b-form-input>
        </b-form-group>
        <b-form-group id="authPasswordLabel"
                      label="Пароль:"
                      label-for="authPassword"
                      class="form-group">
          <b-form-input id="authPassword"
                        type="password"
                        v-model="credentials.password"
                        placeholder="Введите пароль"
                        required>
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="log-button">Войти</b-button>
      </b-form>

      <div class="alert alert-danger" v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',

  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      token: '',
      error: false
    }
  },

  methods: {
    login () {
      console.log(this.credentials)

      axios
        .post('/login', this.credentials)
        .then(response => {
          this.token = response.data.value
          console.log('Token: ', this.token)
          document.cookie = "Auth-Token=" + this.token
          this.$router.push('/')
        })
        .catch(error => {
          console.log("Error while authorizing", error)
        })
    }
  }
}
</script>

<style scoped>
  .container-fluid {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .form {
    max-width: 600px;
    min-width: 500px;
    margin: auto;
    padding: 30px;
  }
  .form-group {
    text-align: left;
  }
  .h1 {
    margin-bottom: 40px;
  }
  .log-button {
    margin-bottom: 10px;
  }
</style>
