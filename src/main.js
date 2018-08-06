// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

Vue.use(BootstrapVue)

// axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.baseURL = 'https://university-spa-backend.herokuapp.com/api'
axios.defaults.headers.common['Authorization'] = 'Basic ' + localStorage.authCredentials

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
