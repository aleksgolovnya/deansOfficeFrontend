import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    userEmail: localStorage.getItem('userEmail') || '',
    userFirstName: localStorage.getItem('userFirstName') || '',
    userMiddleName: localStorage.getItem('userMiddleName') || '',
    userLastName: localStorage.getItem('userLastName') || '',
    userRole: localStorage.getItem('userRole') || ''
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post('/login', {
          email,
          password
        })
          .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userFirstName', response.data.firstName);
            localStorage.setItem('userMiddleName', response.data.middleName);
            localStorage.setItem('userLastName', response.data.lastName);
            localStorage.setItem('userRole', response.data.userRole);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            commit('auth_success', token);
            resolve(response);
          })
          .catch(error => {
            commit('auth_error');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userFirstName');
            localStorage.removeItem('userMiddleName');
            localStorage.removeItem('userLastName');
            localStorage.removeItem('userRole');
            reject(error);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userFirstName');
        localStorage.removeItem('userMiddleName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userRole');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userId: state => state.userId,
    userEmail: state => state.userEmail,
    userFirstName: state => state.userFirstName,
    userMiddleName: state => state.userMiddleName,
    userLastName: state => state.userLastName,
    userRole: state => state.userRole,
    userFullName: state => state.userFirstName + ' ' + state.userMiddleName + ' ' + state.userLastName,
    userFirstLastName: state => state.userFirstName + ' ' + state.userLastName
  }
});
