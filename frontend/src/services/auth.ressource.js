import api from './authentification'
import authHeader from './authHeader'

class AuthServices {
    signup(user) {
        return api.post('/users/signup', {
            photoProfil:user.photoProfil,
            username: user.username,
            email: user.email,
            password: user.password,
            bio: user.bio,
            isAdmin: user.isAdmin
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

    delete(payload) {
      const id = payload
      return api.delete(`/users/${id}`, { headers: authHeader() })
      .then(() => localStorage.removeItem('user'))
    }
}

export default new AuthServices();
