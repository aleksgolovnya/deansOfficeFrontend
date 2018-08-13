import Vue from 'vue'
import Vuex from 'vuex'
import departmentModule from '@/store/department.js'

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
  },

  mutations: {
  }
})
