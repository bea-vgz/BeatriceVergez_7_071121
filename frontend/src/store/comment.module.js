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
    .catch(function(error) {
      return Promise.reject(error);
    });
  },
},
mutations: {
    createCommentSuccess(state, comment) {
      state.posts = [comment, ...state.posts];
      state.message = "Post commenté !";
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