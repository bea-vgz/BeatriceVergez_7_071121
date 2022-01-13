import PostService from '../service/post.resource'

export const post = {
    namespaced: true,
    state: {
      errorMessage: '',
      createdPost: { status: '' },
      modifyPost: { status: '' },
      deletedPost: { status: '' },
      posts: [],
      post: {
        title:'',
        content:'',
        image:'',
      },
      like: {},
      likes: [],
      comments: [],
    },

actions: {

  createPost({ commit }, post) {
    return PostService.createPost(post)
    .then((response) => {
      commit('createPostSuccess', post)
      return Promise.resolve(response)
    },
    (error) => {
      commit('createPostFailure')
      return Promise.reject(error)
    })
  },

  getAllPosts({ commit }) {
    return PostService.getAllPosts()
    .then((posts) => {
      commit('getPosts');
      return Promise.resolve(posts);
    },
    (error) => {
      commit('getPostsFailure')
      return Promise.reject(error)
    })
  },

  getAllPostsUser({ commit }, userId) {
    return PostService.getAllPosts(userId)
    .then((posts) => {
      commit('getPosts');
      return Promise.resolve(posts);
    },
    (error) => {
      commit('getPostsFailure')
      return Promise.reject(error)
    })
  },

  deletePost({commit}, postId) {
    return PostService.deletePost(postId)
    .then(() => commit('deleteSuccess', postId))
    .catch(error => {
      console.log({ error: error })
      commit('deleteFailure', 'Problème de connexion')
    })
  },

  modifyPost({commit}, postId) {
    return PostService.modifyPost(postId).then(
      (response) => {
        commit ('updateSuccess', post)
        return Promise.resolve(response);
      },
      (error) => {
        commit ('updateFailure')
        return Promise.reject(error)
      }
    )
  },

},
mutations: {
    createPostSuccess(state) {
      state.createdPost.status = 'Created'
      state.post = post
    },
    createPostFailure(state) {
      state.createdPost.status = 'Not created'
      state.post = null
    },
    getPosts(state, posts) {
      state.posts = posts;
      state.message = "Posts récupérés !";
    },
    getPostsFailure(state) {
      state.posts = null;
      state.message = "Posts non récupérés !";
    },
    getOnePost(state, post) {
      state.post = post;
      state.message = "Post récupéré !";
    },
    getOnePostFailure(state) {
      state.post = null;
      state.message = "Post non récupéré !";
    },
    deleteSuccess(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId)
    },
    deleteFailure(state, message) {
      state.message = message
    },
    updateSuccess(state, post) { 
      state.post = post
    },
    updateFailure(state) {
      state.user = null;
    },
    getPostsLikes(state, likes) {
      state.post.likes = likes;
      state.message = "Likes récupérés !";
    },
    getPostsLikesFailure(state) {
      state.likes = null;
      state.message = "Likes non récupérés !";
    },
},
getters : {
  post(state) {
    return state.post;
  },
  posts: (state) => {
    return state.posts;
  },
}

}