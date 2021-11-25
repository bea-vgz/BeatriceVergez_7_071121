import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


//Axios permet d'effectuer des requêtes

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [(createPersistedState)],

  state: {
    token: null,
    user: null,
    isAdmin: false
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, data) {
      state.user = data
    },
    LOGOUT_USER(state) {
      state.user = null;
      state.isAdmin = null;
      state.token = null;
      sessionStorage.clear();
    },
  },

  getters: {
    authentification (state) {
      return state.token && state.user
    },
    user (state) {
      return state.user
    },
    isAdmin(state) {
      if(state.isAdmin == 1) {
        return true;
      }
    }
  },

  actions: {
  },
  modules: {
  }
})
