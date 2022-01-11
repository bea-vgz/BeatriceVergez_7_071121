import resource from './resource'
import authHeader from './auth.header'
import { post } from '../store/post.module';

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

    deletePost(id) {
        return resource.delete(`/posts/${id}`, { headers: authHeader() })
        .then(() => localStorage.removeItem('post'))
    }

    modifyPost(id) {
        return resource.put(`/posts/${id}`, { headers: authHeader() })
        .then(() => localStorage.removeItem('post'))
    }

    getAllPostsUser(userId){
        return resource.get(`/posts/user/${userId}`, { headers: authHeader() })
    }

    getPostsLikes(postId) {
        return resource.get(`posts/${postId}/likes`, { headers: authHeader() })
    }

    likePost(postId) {
        return resource.post(`posts/${postId}/likes`, { 
            UserId: post.UserId,
            PostId: post.PostId,
        },
            { headers: authHeader() }
        )
    }

    getLikeOnOnePost(postId) {
        return resource.get(`posts/${postId}/like`, { headers: authHeader() })
    }
}
export default new PostService();