import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
Vue.prototype.$http.defaults.baseURL = 'http://localhost:8085/api';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
