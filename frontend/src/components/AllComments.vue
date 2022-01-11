<template>
  <div>
    <button
      v-if="!allCommentsDisplayed"
      @click="AllPostsComments"
      class="display-comments"
      aria-label="Afficher les commentaires"
    >
      <span>Afficher les commentaires</span>
    </button>
    <div class="comment mb-2 text-left" v-for="comment in comments" :key="comment.id">
      <Comment
        @commentDeleted="removeComment"
        :comment="comment"
        :post="post"
      />
    </div>

    <CommentFormulaire 
      @commentCreated="appendComment"
      :post="post" 
    />
  </div>
</template>

<script>
import CommentFormulaire from '../components/CommentFormulaire.vue'
import Comment from '../components/Comment.vue'
import CommentService from '../service/comment.resource'
export default {
  name: 'AllComments',
  components: {
    CommentFormulaire,
    Comment
  },
  props: ['post'],
  data () {
    return {
      comments: [],
      count: null,
      allCommentsDisplayed : false
    }
  },
  methods: {
    AllPostsComments() {
      const postId = this.$route.params.id;
      CommentService.getPostsComments(postId)
      .then((res) => (
        this.comments = res.data,
        this.allCommentsDisplayed = true ))
    },
    getDateWithoutTime(date) {
      return require("moment")(date).format("YYYY-MM-DD HH:mm");
    },
    appendComment(comment) {
      this.comments.push(comment)
    },
    removeComment(commentToDelete) {
      this.comments = this.comments.filter(comment => comment.id !== commentToDelete.id)
    }
  },
}
</script>
<style lang="scss">
.display-comments {
  color: #747474;
  background-color: transparent;
  border: none;
  font-weight: 600;
  padding: 1rem 1rem;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    color: #fd2d01
  }
  &:focus {
    background: none;
    outline: none;
  }
}
</style>