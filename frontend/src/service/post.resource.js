import resource from './resource'
import authHeader from './auth.header'
import store from '../store'

class PostService {

    createPost(post) {
        return resource.post('/posts', { headers: authHeader() }, {
            title: post.title,
            content: post.content,
            image: post.image,
            userId: store.state.auth.user.userId
        })
    }

}
export default new PostService();