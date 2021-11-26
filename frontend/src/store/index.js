import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import UserServices from '../services/Users'


//Axios permet d'effectuer des requêtes

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [(createPersistedState)],

  state: {
    user: {
      photoProfil: '',
      username: '',
      email: '',
      password: '',
      bio: '',
      isAdmin: 0,
    },
    answer: {
      registration: [],
      login: []
    }
  },

  mutations: {
    REGISTER_USER (state, user) {
      user.photoProfil = state.user.photoProfil,
      user.email = state.user.email,
      user.username = state.user.username,
      user.bio = state.user.bio,
      user.password = state.user.password,
      user.isAdmin = 0;
    },
    SET_USER (state, data) {
      state.user = data
    },
    LOGOUT_USER(state) {
      state.user = null;
      state.user.isAdmin = null;
      sessionStorage.clear();
    },
    SIGNUP_ANSWER (state, apiAnswer) {
      state.answer.registration = apiAnswer
    },
  },

  getters: {
    authentification (state) {
      return state.user.token
    },
    user (state) {
      return state.user
    },
    isAdmin(state) {
      if(state.user.isAdmin == 1) {
        return true;
      }
    },
    getUser(state) {
      return state.user
    },
  },

  actions: {
    signup({commit}, user) {
      return UserServices.signup(user)
      .then((response) => {
        commit('SIGNUP_ANSWER', response)
        return Promise.resolve(response)
      },
      (error) => {
        commit('SIGNUP_ANSWER', error)
        return Promise.reject(error)
      })
    },
  },
  modules: {
  }
})
