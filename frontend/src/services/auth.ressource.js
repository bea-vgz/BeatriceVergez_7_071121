import api from './authentification'
import authHeader from './authHeader'

class AuthServices {
    signup(user) {
        return api.post('/users/signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            bio: user.bio
        })
    }

    login(user) {
        return api.post('/users/login', {
            email: user.email,
            password: user.password,
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    async deleteUser(payload) {
      const id = payload
      await api.delete(`/users/${id}`, { headers: authHeader() });
      return localStorage.removeItem('user');
    }
  }

export default new AuthServices();
