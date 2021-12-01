// Configuration d'axios pour faciliter les requêtes du back
import axios from "axios";

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}
export default axios.create({
    baseURL: "http://localhost:3020/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": "BEARER " + token
    }   
});
