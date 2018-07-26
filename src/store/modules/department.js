import axios from 'axios'

export default {
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
}
