<template>
  <div>
    <div class="container_comments align-items-center mt-3">
      <div class="d-flex mr-2 mb-2">
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
        comment: new Comment(''),
        content:'',
        post:'',
        postId: this.$route.params.id,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    createComment() {
      const comment = this.content;
      CommentService.createComment(comment)
      .then(data => {
        this.comment = data.comment;
        console.log(this.comment)
        alert("Création du commentaire réussi !")
      })
    },
    newline () {
      this.content = `${this.content}\n`
    },
  }
};
</script>
<style scoped>
.container_comments {
    display: flex;
    justify-content: center;
    align-items: center;
}
.form_comment {
  width: 100%;
}
.comment-area {
  background-color: rgba(108, 117, 125, 0.1);
  width: 95%;
  height: 35px;
  border: none;
  padding: 0.5rem;
  margin: 0.2rem
}
.container_user {
  width: 60px;
  height: 45px;
  margin-bottom: 0.5rem;
}
.avatar {
  height: 45px;
}
</style>