import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visits: []
  },
  mutations: {
    COMPARE_VISITS: (state, visits) => {
      state.visits = visits
    }
  },
  actions: {

  },
  plugins: [createPersistedState({
    paths: ['visits']
  })]
})
