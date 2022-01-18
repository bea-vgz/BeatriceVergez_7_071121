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

    getAllPosts(){
        return resource.get('/posts', { headers: authHeader() })
    }

    deletePost(postId) {
        return resource.delete(`/posts/${postId}`, { headers: authHeader() })
    }

    modifyPost(postId, data) {
        return resource.put(`/posts/${postId}`, data, { headers: authHeader() })
        .then(response => {
            localStorage.setItem('post', JSON.stringify(response.data));
            console.log(response)
        });
    }

    getAllPostsUser(userId){
        return resource.get(`/posts/user/${userId}`, { headers: authHeader() })
    }
}
export default new PostService();