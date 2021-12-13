import PostService from '../service/post.resource'

export const post = {
    namespaced: true,
    state: {
      createdPost: { status: '' },
      modifyPost: { status: '' },
      deletedPost: { status: '' },
      posts: '',
    },

actions: {
    createPost({ commit }, post) {
      return PostService.createPost(post)
      .then((response) => {
        commit('createPostSuccess')
        return Promise.resolve(response.data)
      },
      (error) => {
        commit('createPostFailure')
        return Promise.reject(error)
      })
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
}



}