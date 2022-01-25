import resource from './resource'
import authHeader from './auth.header'

class PostService {

    createPost(post) {
        return resource.post('/posts', post, { headers: authHeader() })
        .then(response => {
            localStorage.setItem('post', JSON.stringify(response.data));
            console.log(response)
        });
    }

    getOnePost(id){
        return resource.get(`/posts/${id}`, { headers: authHeader() })
    }

    /* getAllPosts({ state }, params = {}){
        let userIdParams = ''
        if (params.userId) {
            userIdParams = `&userId=${params.userId}`
        }
        return resource.get(`/posts?page=${state.page}${userIdParams}`, { headers: authHeader() })
    } */

    deletePost(id) {
        return resource.delete(`/posts/${id}`, { headers: authHeader() })
        .then(() => localStorage.removeItem('post'))
    }

    modifyPost(postId, data) {
        return resource.put(`/posts/${postId}`, data, { headers: authHeader() })
        .then(response => {
            localStorage.setItem('post', JSON.stringify(response.data));
            console.log(response)
        });
    }
}

export default new PostService(); 