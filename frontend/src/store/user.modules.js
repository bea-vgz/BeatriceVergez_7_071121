import UserServices from '../services/user.ressource';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
    modifyPassword({ commit }, user) {
      return UserServices.put(user).then(
        user => {
          commit('updateSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('updateFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    updateSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    updateFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    }
}