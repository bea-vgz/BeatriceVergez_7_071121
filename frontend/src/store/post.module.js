import PostService from '../service/post.resource'

export const post = {
    namespaced: true,
    state: {
      createdPost: { status: '' },
      modifyPost: { status: '' },
      deletedPost: { status: '' },
      posts: [],
    },

actions: {

  createPost({ commit }, post) {
    return PostService.createPost(post)
    .then((response) => {
      commit('createPostSuccess')
      return Promise.resolve(response)
    },
    (error) => {
      commit('createPostFailure')
      return Promise.reject(error)
    })
  },

  getAllPosts({ commit }) {
    return PostService.getAllPosts()
    .then((response) => {
      const posts = response.data;
      commit('getPosts', posts);
      return Promise.resolve(response.data);
    })
    .catch(function(error) {
      return Promise.reject(error)
    });
  }
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
},
getters : {
  post(state) {
    return state.post;
  },
}



}