import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId'),
    userEmail: '',
    userFirstName: '',
    userMiddleName: '',
    userLastName: '',
    userRole: localStorage.getItem('userRole')
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, userId, userRole }) {
      state.status = 'success';
      state.token = token;
      state.userId = userId;
      state.userRole = userRole;
    },
    register_success(state) {
      state.status = 'success';
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.userId = '';
      state.userRole = '';
    },

    GET_CURRENT_USER(state, { userEmail, userFirstName, userMiddleName, userLastName }) {
      debugger;
      state.userEmail = userEmail;
      state.userFirstName = userFirstName;
      state.userMiddleName = userMiddleName;
      state.userLastName = userLastName;
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
            const userId = response.data.id;
            const userRole = response.data.role;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userRole', userRole);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            commit('auth_success', { token, userId, userRole });
            resolve(response);
          })
          .catch(error => {
            commit('auth_error');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
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
        localStorage.removeItem('userRole');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },

    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post('/signup', {
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName
        })
          .then(resp => {
            commit('register_success');
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error', err);
            reject(err);
          });
      });
    },

    getCurrentUser({ commit }, state) {
      axios.get('users/' + state.userId)
        .then(response => {
          const userEmail = response.data.userEmail;
          const userFirstName = response.data.userFirstName;
          const userMiddleName = response.data.userMiddleName;
          const userLastName = response.data.userLastName;
          commit('GET_CURRENT_USER', { userEmail, userFirstName, userMiddleName, userLastName });
        })
        .catch(error => {
          commit('auth_error', error);
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
    userFirstLastName: state => state.userFirstName + ' ' + state.userLastName,
    isAdmin: state => {
      if (state.userRole === 'ROLE_ADMIN') return true;
      else return false;
    }
  }
});
