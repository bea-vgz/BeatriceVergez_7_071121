import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import UserServices from '../services/user.ressource'

//Axios permet d'effectuer des requêtes
Vue.use(Vuex)

export default new Vuex.Store({
  
  plugins: [(createPersistedState)], // Permet de garder le state quand la page est rafraîchie

  state: {
    status: '',
    token: null,
    user: {}, //!localStorage.getItem("user")
    message: '',
    error:'',

    users: [],
    posts: [],
    post: {},
  },
  

  // Mutations : modifient le store en fonction des opérations effectuées
  // USERS 

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    //mutations de base, montrant le chargement, le succès, l'erreur pour refléter l'état de l'appel de l'API 
    AUTH_SUCCESS(state, token, user){
      state.token = token
      state.status = "isLoggedIn",
      state.user = user
    },
    AUTH_ERROR(state){
      state.status = 'error'
    },
    AUTH_REQUEST(state) {
      state.status = "loading";
    },
    REGISTER_USER(state) {
      state.status = "isNotLoggedIn";
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
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        state.status = 'isLoggedIn';
      } else {
        state.status = 'isNotLoggedIn';
      }
    },
    DELETE_TOKEN(state) {
      state.token = null;
      state.user = "";
      state.status = "isNotLoggedIn";
    },
    DELETE_ACCOUNT(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)];
      state.message = "compte supprimé";
      state.status = "isNotLoggedIn";
    },
    LOGOUT(state) {
      sessionStorage.clear();
      state.token = '';
      state.user = null;
      state.status = "isNotLoggedIn";
    },

  },

  getters: {
    // Nécessaire pour vérifier si l'user est authentifié
    isLoggedIn (state) {
      return !!state.token
    },
    user(state) {
      return state.user;
    },
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
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST", user)
        UserServices.login(user)
          .then(function(response) {
            const token = response.data.token;
            const userId = response.data.userId;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            commit("AUTH_SUCCESS", { token, userId }); 
            resolve(response.data);
          })
          .catch(function(error) {
            commit("AUTH_ERROR");
            localStorage.clear();
            reject(error);
          });
      });
    },

    // Deconnexion 
    logout({commit}){
      return new Promise((resolve) => {
        commit("LOGOUT");
        localStorage.clear();
        resolve()
      })
    },

    // Suppression d'un user
    deleteUser({ commit }, id){
      return new Promise((resolve, reject) => {
        UserServices.deleteUser(id)
          .then(function(response) {
            commit("DELETE_ACCOUNT", id); // Le commit permet de supprimer l'élément du store
            resolve(response);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    getOneUser({commit}) {
      return new Promise((resolve, reject) => {
        const id = localStorage.getItem("userId"); // Récupération de l'id, necessaire à l'appel API
        UserServices.getOneUser(id)
          .then(function(response) {
            // On a besoin du token de l'userId pour la nouvelle mutation de AUTH_SUCCES
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            commit("GET_USER", {token, userId});
            resolve(response);
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },
  },
  modules: {
  }
})

