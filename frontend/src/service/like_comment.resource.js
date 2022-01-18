import resource from './resource'
import authHeader from './auth.header'

class LikeCommentService {

    getCommentsLikes(commentId) {
        return resource.get(`comments/${commentId}/likes`, { headers: authHeader() })
    }

    likeComment(commentId, like) {
        return resource.post(`comments/${commentId}/likes`, like,
            { headers: authHeader() }
        )
    }

    getLikeOneComment(commentId) {
        return resource.get(`comments/${commentId}/like`, { headers: authHeader() })
    }
}
export default new LikeCommentService();