import CommentService from '../service/comment.resource'

export const comment = {
    namespaced: true,
    state: {
      createdComment: { status: '' },
      modifyComment: { status: '' },
      deletedComment: { status: '' },
      comments: [],
      comment: {
        content:'',
      },
    },

actions: {

  createComment({ commit }, comment) {
    return CommentService.createComment(comment)
    .then((response) => {
      commit('createCommentSuccess')
      return Promise.resolve(response.data)
    })
    .then(() => {
      // Important pour maintenir le state à jour !
      CommentService.getPostsComments()
      .then(function(response) {
        const comments = response.data;
        commit('getComments', comments);
        return Promise.resolve(response.data);
      });
    })
    .catch(function(error) {
      return Promise.reject(error);
    });
  },

  getPostsComments({ commit }) {
    return CommentService.getPostsComments()
    .then((comments) => {
      commit('getComments');
      return Promise.resolve(comments);
    },
    (error) => {
      commit('getCommentsFailure')
      return Promise.reject(error)
    })
  },

},
mutations: {
    createCommentSuccess(state) {
      state.createdComment.status = 'Created'
      state.comment = comment
    },
    createCommentFailure(state) {
      state.createdComment.status = 'Not created'
      state.comment = null
    },
    getComments(state, comments) {
      state.comments = comments;
      state.message = "Commentaires récupérés !";
    },
    getCommentsFailure(state) {
      state.comments = null;
      state.message = "Commentaires non récupérés !";
    },
}
}