import resource from './resource'
import authHeader from './auth.header';

class UserService extends resource {
    getAllUsers() {
        return resource.get('/users', { headers: authHeader() });
    }
    getUser(id) {
        return resource.get(`/users/${id}`, { headers: authHeader() })
    }
    
}

export default new UserService();