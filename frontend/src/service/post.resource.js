import resource from './resource'
import authHeader from './auth.header'

class PostService {

    createPost(post) {
        return resource.post('/posts', post, { headers: authHeader() })
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(response)
          });
    }

}
export default new PostService();