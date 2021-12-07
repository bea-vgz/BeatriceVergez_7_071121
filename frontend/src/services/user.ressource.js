import api from './authentification'
//data service
import authHeader from './authHeader';

class UserServices {
    getAllUsers() {
        return api.get('/users', { headers: authHeader() });
    }
    getOneUser(id) {
        return api.get(`/users/${id}`, { headers: authHeader() })
    }
}

export default new UserServices();