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
    modifyUser(id, data) {
        return api.put(`/users/${id}`, data, { headers: authHeader() });
    }
    modifyPassword(id, data) {
        return api.put(`/users/${id}/password`, data, { headers: authHeader() });
    }
    deleteUser(id) {
        return api.delete(`/users/${id}`, { headers: authHeader() });
    }
}

export default new UserServices();