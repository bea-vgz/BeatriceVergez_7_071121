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

    getAllPostsUser(userId){
        return resource.get(`/posts/user/${userId}`, { headers: authHeader() })
    }

}
export default new PostService();