import Vue from 'vue'
import Vuex from 'vuex'
import department from './modules/department'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    department
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
})
