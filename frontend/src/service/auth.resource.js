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

    modify(user) {
      const storage = JSON.parse(localStorage.getItem("user"));
      return resource.put(`/users/${storage.userId}`, user, { headers: authHeader() })
      .then(response => {
        console.log(response.data)
      });
  }
}

export default new AuthService();
