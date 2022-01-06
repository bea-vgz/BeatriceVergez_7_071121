<template>
  <div>
    <div class="comment mb-2 text-left" v-for="comment in comments" :key="comment.id">
      <Comment
        :comment="comment"
        :post="post"
      />
    </div>

    <CommentFormulaire 
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
      count: 0
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