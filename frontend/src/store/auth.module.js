import AuthService from '../service/auth.resource';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },

    signup({ commit }, user) {
      return AuthService.signup(user)
      .then(response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error.response.data);
        }
      );
    },

    deleteUser({commit}, user) {
      return AuthService.delete(user).then(
        (response) => {
          commit ('deleteSuccess')
          return Promise.resolve(response.data);
        },
        (error) => {
          commit ('deleteFailure')
          return Promise.reject(error)
        }
      )
    },

    modifyUser({commit}, payload) {
      return AuthService.modify(payload).then(
        (response) => {
          commit ('updateSuccess')
          return Promise.resolve(response);
        },
        (error) => {
          commit ('updateFailure')
          return Promise.reject(error)
        }
      )
    },

    modifyPassword({commit}, payload) {
      return AuthService.modifyPassword(payload).then(
        (response) => {
          commit ('updateSuccess')
          return Promise.resolve(response);
        },
        (error) => {
          commit ('updateFailure')
          return Promise.reject(error)
        }
      )
    }
  },

  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    deleteSuccess(state) {
      state.status.loggedIn= false
      state.user = null
    },
    deleteFailure() {
    },
    updateSuccess(state, user) {
      state.status.loggedIn = true; 
      state.user = user
    },
    updateFailure(state) {
      state.status.loggedIn = true;
      state.user = null;
    },
  },

  getters : {
    userState: (state) => {
      return state.user
    }
  },
}
