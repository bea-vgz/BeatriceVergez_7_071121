import api from '../services/Api'

class UserServices {
    signup(data) {
        return api.post('/users/signup', data);
    }
    login(data) {
        return api.post('/users/login', data);
    }
    getAllUsers() {
        return api.get('/users/');
    }
    getOneUser(id) {
        return api.get('/users/' + id);
    }
    modifyUser(id, data) {
        return api.put('/users/' + id, data);
    }
    modifyPassword(id, data) {
        return api.put(`/users/${id}/password`, data);
    }
    deleteUser(id) {
        return api.delete('/users/' + id);
    }
}

export default new UserServices();