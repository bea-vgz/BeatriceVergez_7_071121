import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.modules';

//Axios permet d'effectuer des requêtes
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
  }
})

