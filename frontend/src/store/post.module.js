import PostService from '../service/post.resource'

export const post = {
    namespaced: true,
    state: {
      createdPost: { status: '' },
      modifyPost: { status: '' },
      deletedPost: { status: '' },
      posts: [],
      post: {},
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
    .then((posts) => {
      commit('getPosts');
      return Promise.resolve(posts);
    },
    (error) => {
      commit('getPostsFailure')
      return Promise.reject(error)
    })
  },

  getOnePost({ commit }, id) {
    return PostService.getOnePost(id)
    .then((response) => {
      commit('getOnePost');
      return Promise.resolve(response.data);
    },
    (error) => {
      commit('getOnePostFailure')
      return Promise.reject(error)
    })
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