import Vue from 'vue'
import Vuex from 'vuex'
import departmentModule from '@/store/department.js'
import axios from 'axios'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
  modules: {
    departments: departmentModule
  },
  state: {
    departments: []
  },

  actions: {
    GET_DEPARTMENTS_LIST ({commit}) {
      axios
        .get('/departments')
        .then((response) => {
          commit('SET_DEPARTMENTS_LIST', {
            list: response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  mutations: {
    SET_DEPARTMENTS_LIST: (state, { list }) => {
      state.departments = list
    }
  }

  // state: {
  //   departments: []
  // },
  //
  // actions: {
  //   GET_DEPARTMENTS_LIST ({commit}) {
  //     axios
  //       .get('/departments')
  //       .then((response) => {
  //         commit('SET_DEPARTMENTS_LIST', {
  //           list: response.data
  //         })
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   }
  // },
  //
  // mutations: {
  //   SET_DEPARTMENTS_LIST: (state, { list }) => {
  //     state.departments = list
  //   }
  // }
})
