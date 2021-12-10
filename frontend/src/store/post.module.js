import PostService from '../service/post.resource'

export const post = {
    namespaced: true,
    state: {
      createdPost: { status: '' },
      modifyPost: { status: '' },
      deletedPost: { status: '' },
      post: '',
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
    },
    createPostFailure(state) {
      state.createdPost.status = 'Not created'
    },
}



}