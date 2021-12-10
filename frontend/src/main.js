import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faClone,
  faSearch,
  faUserLock,
  faTrashAlt,
  faBell,
  faUserEdit,
  faTimesCircle,
  faPencilAlt,
  faCheckCircle,
  faFileImport,
  faImage
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faClone, faSearch, faUserLock, faTrashAlt, faBell, faUserEdit, faTimesCircle, faPencilAlt, faCheckCircle, faFileImport, faImage);
library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
