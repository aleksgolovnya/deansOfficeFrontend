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
                        v-model="uname"
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
                        v-model="pass"
                        placeholder="Введите пароль"
                        required>
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="log-button">Войти</b-button>
        <br>
        <small class="guest-auth" @click="guestAuth">Гостевой режим</small>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',

  data () {
    return {
      uname: '',
      pass: ''
    }
  },

  methods: {
    login () {
      var basicAuth = 'Basic ' + btoa(this.uname + ':' + this.pass)
      axios.defaults.headers.common['Authorization'] = basicAuth

      axios
        .get('/faculties', {
          auth: {
            username: this.uname,
            password: this.pass
          }
        })
        .then(response => {
          console.log('Authenticated')
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
          console.log('Error on authentication')
        })
    },
    guestAuth () {
      var basicAuth = 'Basic ' + btoa('guest' + ':' + 'guest')
      axios.defaults.headers.common['Authorization'] = basicAuth

      axios
        .get('/faculties', {
          auth: {
            username: 'guest',
            password: 'guest'
          }
        })
        .then(response => {
          console.log('Authenticated')
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
          console.log('Error on authentication')
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
  .guest-auth {
    font-size: 15px;
    cursor: pointer;
    color: #000;
  }
  .guest-auth:hover {
    text-decoration: underline;
    color: #737373;
  }
</style>
