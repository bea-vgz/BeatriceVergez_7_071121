import resource from './resource'
import authHeader from './auth.header'

class AuthService {
    signup(user) {
        return resource.post('/users/signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            bio: user.bio,
            photoProfil: user.photoProfil,
            isAdmin: 0,
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
      localStorage.removeItem('user')
    }

    delete(payload) {
      const id = payload
      return resource.delete(`/users/${id}`, { headers: authHeader() })
      .then(() => localStorage.removeItem('user'))
    }

    modify(payload) {
      return resource.put(`/users/${payload.userId}`, payload.data,
      { headers: authHeader() }
    )
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      });
    }

    modifyPassword(payload) {
      return resource.put(`/users/${payload.userId}/password`, payload.data,
      { headers: authHeader() }
    )
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response)
      });
    }

    getAllUsers() {
      return resource.get('/users', { headers: authHeader() });
    }

    getOneUser(id){
      return resource.get(`/users/${id}`, { headers: authHeader() })
    }
}

export default new AuthService();
