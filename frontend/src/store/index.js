import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import UserServices from '../services/user.ressource'

//Axios permet d'effectuer des requêtes
Vue.use(Vuex)

const user = localStorage.getItem('user')
const initialState = user
  ? { status: { isLoggedIn: true }, user }
  : { status: { isNotLoggedIn: true }, user: null }

export default new Vuex.Store({
  
  plugins: [(createPersistedState)], // Permet de garder le state quand la page est rafraîchie

  state: {
    status: initialState,
    token: '',
    user: {}, //!localStorage.getItem("user")
    message: '',

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
      state.status = "registerAccount"
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
    DELETE_TOKEN(state) {
      state.token = null;
      state.user = "";
      state.status = "isNotLoggedIn";
    },
    DELETE_ACCOUNT(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)];
      state.message = "compte supprimé";
    },
    LOGOUT(state) {
      sessionStorage.clear();
      state.token = '';
      state.user = '';
      state.status = false;
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

  getUserInfos: ({ commit }) => {
    return new Promise((resolve, reject) => {
      const id = localStorage.getItem("UserId"); // Récupération de l'id, necessaire à l'appel API
      UserServices
        .getUser(id)
        .then(function(response) {
          // On récupère les infos dont on a besoin puis on les rajoute au store
          const username = response.data.username;
          const email = response.data.email;
          const password = response.data.password;
          const photoProfil = response.data.photoProfil;
          const bio = response.data.bio;
          const isAdmin = response.data.isAdmin;

          // On a besoin du token de l'userId pour la nouvelle mutation de AUTH_SUCCES
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("UserId");

          commit("AUTH_SUCCESS", {
            token,
            userId,
            username,
            email,
            password,
            photoProfil,
            bio,
            isAdmin
          });
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  modules: {
  }
})

