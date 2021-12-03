import api from './authentification'

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
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        });
    }

    logout() {
        localStorage.removeItem('user');
        location.reload(true);
    }

    handleResponse(response) {
        if (response.status === 401) {
          this.logout();
          location.reload(true);
    
          const error = response.data && response.data.message;
          return Promise.reject(error);
        }
    
        return Promise.resolve(response);
      }
}

export default new AuthServices();
