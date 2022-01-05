<template>
  <div>
    <div class="comment mb-2 text-left" v-for="comment in comments" :key="comment.id">
      <div v-if="comment">
    <div class="d-flex align-items-center position-relative">
      <div class="UserAvatar" v-if="comment.User">
        <img :src="comment.User.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
        <h3 class="font postUsername" alt="Pseudo de l'user">{{ comment.User.username }}</h3>
      </div>
        <p class="mb-0">{{ comment.content }}</p>
      </div>
    <p class="text-secondary comment-date">
      {{ getDateWithoutTime(post.createdAt) }}
    </p>
  </div>
  </div>

    <CommentFormulaire :post="post" />
  </div>
</template>

<script>
import CommentFormulaire from '../components/CommentFormulaire.vue'
import CommentService from '../service/comment.resource'
export default {
  name: 'AllComments',
  components: {
    CommentFormulaire,
  },
  props: ['post'],
  data () {
    return {
      comments: [],
    }
  },
  mounted () {
	this.getPostsComments();
  },

  methods: {
    getPostsComments() {
      const postId = this.$route.params.id;
      CommentService.getPostsComments(postId)
      .then((res) => (this.comments = res.data))
      this.allCommentsDisplayed = true
    },
    getDateWithoutTime(date) {
      return require("moment")(date).format("YYYY-MM-DD HH:mm");
    },
  },
}
</script>

<style lang="scss">
.comment-box {
  background-color: rgba(108, 117, 125, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 0;
}
.display-comments {
  color: #747474;
  background-color: transparent;
  border: none;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    background: none;
    outline: none;
  }
}
.comment-button {
  position: static !important;
  margin-left: 10px;
}
.comment-btn-collapsed {
  left: 14px;
  top: 40px;
  width: 200px;
}
.input-content:focus {
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.comment-date {
  margin-left: 58px;
  font-size: 0.8rem;
}
.UserAvatar {
  display: flex;
  align-items: center;
}
.commentUserPhoto {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
</style>