import resource from './resource'
import authHeader from './auth.header'

class LikePostService {

    getAllLikesOnePost(postId) {
        return resource.get(`posts/${postId}/likes`, { headers: authHeader() })
    }

    likePost(postId, like) {
        return resource.post(`posts/${postId}/likes`, like,
            { headers: authHeader() }
        )
    }

    dislikePost(postId) {
        return resource.post(`posts/${postId}/dislikes`, { headers: authHeader() })
    }

    getLikeOnOnePost(postId) {
        return resource.get(`posts/${postId}/like`, { headers: authHeader() })
    }
}
export default new LikePostService();