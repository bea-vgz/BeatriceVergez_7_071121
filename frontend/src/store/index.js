import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import UserServices from '../services/user.ressource'

//Axios permet d'effectuer des requêtes
Vue.use(Vuex)

const user = localStorage.getItem('user')
const initialState = user
  ? { status: { isLoggedIn: true }, user }
  : { status: { isLoggedIn: false }, user: null }

export default new Vuex.Store({
  
  plugins: [(createPersistedState)], // Permet de garder le state quand la page est rafraîchie

  state: {
    status: initialState,
    token: '',
    user: {}, //!localStorage.getItem("user")
    message: '',
    isLoggedIn: false,


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
      state.status = 'success'
      state.token = token
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
      state.user = user
    },
    AUTH_ERROR(state){
      state.status = 'error'
    },
    AUTH_REQUEST(state) {
      state.status = "loading";
    },
    REGISTER_USER(state) {
      state.status = "registerAccount"
      state.isLoggedIn = false
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
    DELETE_TOKEN(state) {
      state.token = null;
      state.user = "";
      state.isLoggedIn = false;
    },
    DELETE_ACCOUNT(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)];
      state.message = "compte supprimé";
    },
    LOGOUT(state) {
      sessionStorage.clear();
      state.token = '';
      state.user = '';
      state.isLoggedIn = false;
      state.message = '';
    },

  },

  getters: {
    // Nécessaire pour vérifier si l'user est authentifié
    isLoggedIn: (state) => !!state.token, // !! convertit la valeur en boolean = true
    
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
        UserServices.signup(user, {
          photoProfil: user.photoProfil,
          username: user.username,
          email: user.email,
          password: user.password,
          bio: user.bio,
          isAdmin: user.isAdmin
        })
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
            localStorage.setItem("token", response.data.token);
            commit("AUTH_SUCCESS", user); 
            resolve(response);
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
        commit("LOGOUT")
        localStorage.removeItem('token')
        resolve()
      })
    }
  },
  modules: {
  }
})

