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
    token: '',
    user : {},
    users: [],
    message: '',

    posts: [],
    post: {},
  },

  // Mutations : modifient le store en fonction des opérations effectuées
  // USERS 

  mutations: {
    //mutations de base, montrant le chargement, le succès, l'erreur pour refléter l'état de l'appel de l'API 
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
    REGISTER_USER(state) {
      state.status = "registerAccount";
    },
    
    GET_USER (state, user) {
      state.user = user
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
        commit("AUTH_REQUEST");
        UserServices.signup(user)
        .then(response => {
          commit('REGISTER_USER', user)
          resolve(response.data)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          reject(err)
        })
      })
    },
     
    // Connexion de l'user
    login({ commit }, loginUser) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        UserServices.login(loginUser)
          .then(function(response) {
            const token = response.data.token; // Le token est récupéré
            localStorage.setItem("token", token); // Envoyé au localStorage
            commit("AUTH_SUCCESS", { token }); 
            resolve(response);
          })
          .catch(function(error) {
            commit("AUTH_ERROR");
            localStorage.clear();
            reject(error);
          });
      });
    },
  },
  modules: {
  }
})

