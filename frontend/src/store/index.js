import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import { post } from './post.module';
import notificationAlert from './notification-module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    notificationAlert,
    post
  }
})

