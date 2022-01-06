<template>
  <div>
    <div class="container_comments align-items-center mt-3">
      <div class="mr-2 mb-2">
        <router-link to="/profil" v-if="currentUser" class="container_user bg-white">
          <img v-if="currentUser" :src="currentUser.photoProfil"  class="avatar" alt="Avatar" ref="file" />
        </router-link>
      </div>
      <form class="form_comment" @submit="createComment">
        <div>
          <input
            :id="`comment-area-${this.postId}`"
            v-model="comment.content"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="createComment"
            @keydown.enter.shift.exact="newline"
            class="comment-area"
            placeholder="Écrire un commentaire..."
            aria-label="Écrire un commentaire"
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import CommentService from '../service/comment.resource'
import Comment from '../models/comment'
export default {
  name: 'CommentFormulaire',
  data () {
    return {
      comment: new Comment("", ""),
    };
  },
  props: ['post'],
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    createComment: function(event) {
      const comment = this.comment
      const postId = this.$route.params.id;
      CommentService.createComment(comment, postId)
      .then(() => {
        console.log(this.comment)
        alert("Création du commentaire réussi !")
      })
      event.target.reset();
      location.reload()
    },
    
    newline () {
      this.comment = `${this.comment}\n`
    },
  }
};
</script>
<style scoped>
.container_comments {
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
}
.form_comment {
  width: 100%;
}
.comment-area {
  background-color: #F2F2F2;
  width: 95%;
  height: 35px;
  border: none;
  padding-left: 0.8rem;
  border-radius: 2rem;
}
.container_user {
  margin-right: 0.5rem;
  height: 45px;
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 100%;
}
</style>