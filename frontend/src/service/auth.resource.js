import resource from './resource'
import authHeader from './auth.header'

class AuthService {
    signup(user) {
        return resource.post('/users/signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            bio: user.bio,
        })
    }

    login(user) {
      return resource.post('/users/login', {
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
      return resource.delete(`/users/${id}`, { headers: authHeader() })
      .then(() => localStorage.removeItem('user'))
    }

    modifyUser(id, user) {
      return resource.put(`/users/${id}`, user, { headers: authHeader() }, {
        username: user.username,
        bio: user.bio,
        photoProfil: user.photoProfil
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}

export default new AuthService();
