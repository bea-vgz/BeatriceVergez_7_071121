// Configuration d'axios pour faciliter les requêtes du back
import axios from 'axios';
import Vue from 'vue'

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

export default axios.create({
    baseURL: "http://localhost:3020/api",
    headers: {
        "Content-type": "application/json",
    }   
});