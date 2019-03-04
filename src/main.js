import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';

// import VeeValidate, { Validator } from 'vee-validate';
// import ru from 'vee-validate/dist/locale/ru';
// import ruAttributesDictionary from '@/scripts/locale/ru/attributes-dictionary';

import NProgress from 'nprogress';
import '../node_modules/nprogress/nprogress.css';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(NProgress);
Vue.use(BootstrapVue);

// Vue.use(VeeValidate);
// Validator.localize('ru', {
//   messages: ru.messages,
//   attributes: ruAttributesDictionary
// });

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
