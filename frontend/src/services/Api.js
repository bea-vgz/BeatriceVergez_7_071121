// Configuration d'axios pour faciliter les requêtes du back
import axios from "axios";

export default () => {
  return axios.create({
    baseURL: `http://localhost:3020/api`,

    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
