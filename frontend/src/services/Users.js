import axios from 'axios'

class UserServices {
    signup(data) {
        return axios.post('http://localhost:3020/api/users/signup', data);
    }
    login(data) {
        return axios.post('http://localhost:3020/api/users/login', data);
    }
    getAllUsers() {
        return axios.get('http://localhost:3020/api/users/');
    }
    getOneUser(id) {
        return axios.get('http://localhost:3020/api/users/' + id);
    }
    modifyUser(id, data) {
        return axios.put('http://localhost:3020/api/users/' + id, data);
    }
    modifyPassword(id, data) {
        return axios.put(`http://localhost:3020/api/users/${id}/password`, data);
    }
    deleteUser(id) {
        return axios.delete('http://localhost:3020/api/users/' + id);
    }
}

export default new UserServices();