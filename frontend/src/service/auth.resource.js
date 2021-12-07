import resource from './resource'
import authHeader from './auth.header'

class AuthService extends resource {
    signup(user) {
        return resource.post('/users/signup', {
            username: user.username,
            email: user.email,
            password: user.password,
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
      return resource.put(`/users/${id}`, { headers: authHeader(), user })
    }
}

export default new AuthService();
