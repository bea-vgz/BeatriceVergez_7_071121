import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import UserServices from '../services/Users'

//Axios permet d'effectuer des requêtes
Vue.use(Vuex)

export default new Vuex.Store({
  
  plugins: [(createPersistedState)], // Permet de garder le state quand la page est rafraîchie

  state: {
    status: '',
    token: localStorage.getItem('token'),
    user : {},
    post: {},
    comment: {},
    message: '',
  },

  // Mutations : modifient le store en fonction des opérations effectuées
  // USERS 

  mutations: {

    AUTH_SUCCESS(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    AUTH_ERROR(state){
      state.status = 'error'
    },
    AUTH_REQUEST(state) {
      state.status = "loading";
    },
    GET_USER (state, data) {
      state.user = data
    },
    GET_ALL_USER(state, users) {
      state.user = users;
    },
    MODIFY_USER(state, user) {
      state.user = user;
      state.message = "Profil modifié !";
    },
  },

  getters: {
    // Nécessaire pour vérifier si l'user est authentifié
    isLoggedIn: (state) => !!state.token, // !! convertit la valeur en boolean = true
    authStatus: (state) => state.status,
  },

  // Les différentes requêtes CRUD sont renseignées ici, elles modifient le store via les commit
  // USERS 
  actions: {

    // Création de l'user
    signup({commit}, user){
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        UserServices.signup(user)
        .then(response => {
          const user = response.data.user
          commit('AUTH_SUCCESS', user)
          resolve(response)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          reject(err)
        })
      })
    },
     
    // Connexion de l'user
    login({ commit }, userLogin) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        UserServices.login(userLogin)
        .then(response => {
            const token = response.data.token; // Le token est récupéré + userId
            const user = response.data.user;
            localStorage.setItem("token", token); // Envoi au localStorage
            localStorage.setItem("userId", user);
            commit('AUTH_SUCCESS', token, user)
            resolve(response);
          })
          .catch(err => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(err)
          })
      });
    },
  },
  modules: {
  }
})

