import resource from './resource'
import authHeader from './auth.header'

class CommentService {

    createComment(comment, postId) {
        return resource.post(`/posts/${postId}/comments`, comment, { headers: authHeader() })
        .then(response => {
            localStorage.setItem('comment', JSON.stringify(response.data));
            console.log(response)
        });
    }

    getPostsComments(postId){
        return resource.get(`/posts/${postId}/comments`, { headers: authHeader() })
    }

    deleteComment(postId, id) {
        return resource.delete(`/posts/${postId}/comments/${id}`, { headers: authHeader() })
        .then(() => localStorage.removeItem('comment'))
    }
}
export default new CommentService();