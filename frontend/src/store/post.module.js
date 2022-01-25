import PostService from '../service/post.resource'
import resource from '../service/resource'
import authHeader from '../service/auth.header'

export const post = {
    namespaced: true,
    state: {
      errorMessage: '',
      createdPost: { status: '' },
      modifyPost: { status: '' },
      deletedPost: { status: '' },
      post: {},
      like: {},
      likes: [],
      comments: [],
      comment: {},
      page: 1,
      isOnLastPage: false,
      posts: [],
    },

actions: {
  initializePostStore ({ dispatch, commit }, params = {}) {
    commit('reset_store')
    dispatch('getAllPosts', params)
  },

  getAllPosts({ state, commit }, params = {}) {
    let userIdParams = ''
    if (params.userId) {
      userIdParams = `&userId=${params.userId}`
    }
    return resource.get(`/posts?page=${state.page}${userIdParams}`, { headers: authHeader() })
      .then(response => {
          commit('all_posts', state.posts.concat(response.data))
      })
      .catch(() => {
        commit('messageFailure', 'Problème de connexion')
      })
  },

  async loadMore({ state, commit, dispatch }, params) {
    if (state.isOnLastPage) return

    commit('increment_page')
    const initialLength = state.posts.length

    await dispatch('getAllPosts', params)

    if (state.posts.length === initialLength) {
      commit('reached_last_page')
    }
  },

  createPost({ commit }, post) {
    return new Promise((resolve, reject) => {
    PostService.createPost(post)
    .then(response => {
      commit('createPostSuccess', post)
      resolve(response);
    })
    .catch(function(error) {
      reject(error);
    });
    })
  },
  
  getOnePost({ commit }) {
    return PostService.getOnePost()
    .then((post) => {
      commit('getOnePost');
      return Promise.resolve(post);
    },
    (error) => {
      commit('getOnePostFailure')
      return Promise.reject(error)
    })
  },

  deletePost({commit}, postId) {
    return PostService.deletePost(postId)
    .then(() => commit('deleteSuccess', postId))
    .catch(error => {
      console.log({ error: error })
      commit('messageFailure', 'Problème de connexion')
    })
  },
},
mutations: {
  all_posts (state, post) {
    state.posts = post
  },
  increment_page (state) {
    state.page++
  },
  reached_last_page (state) {
    state.isOnLastPage = true
  },
  reset_store (state) {
    state.posts = []
    state.page = 1
    state.isOnLastPage = false
  },
    createPostSuccess(state) {
      state.createdPost.status = 'Created'
      state.post = post
    },
    createPostFailure(state) {
      state.createdPost.status = 'Not created'
      state.post = null
    },
    getOnePost(state, post) {
      state.post = post;
      state.message = "Post récupéré !";
    },
    getOnePostFailure(state) {
      state.post = null;
      state.message = "Post non récupéré !";
    },
    deleteSuccess(state) {
      state.post = null
    },
    messageFailure(state, message) {
      state.message = message
    },
    getPostsLikes(state, likes) {
      state.post.likes = likes;
      state.message = "Likes récupérés !";
    },
    getPostsLikesFailure(state) {
      state.likes = null;
      state.message = "Likes non récupérés !";
    },
}

}