import resource from './resource'
//data service
import authHeader from './authHeader';

class UserService extends resource {
    getAllUsers() {
        return resource.get('/users', { headers: authHeader() });
    }
    getOneUser(id) {
        return resource.get(`/users/${id}`, { headers: authHeader() })
    }
}

export default new UserService();