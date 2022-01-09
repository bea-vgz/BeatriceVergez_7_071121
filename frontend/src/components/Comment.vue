<template>
  <div v-if="comment">
    <div class="d-flex align-items-center position-relative">
      <div class="UserAvatar" v-if="comment.User">
        <img :src="comment.User.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
      </div>
      <div class="comments">
        <h3 class="commentUsername" alt="Pseudo de l'user">{{ comment.User.username }}</h3>
        <p class="commentaire">{{ comment.content }}</p>
      </div> 
    </div>
    <div class="comment-info">
      <p class="text-secondary comment-date">
        {{ getDateWithoutTime(comment.createdAt) }}
      </p>
      <div class="menu-comment" v-if="currentUser.userId == comment.UserId">
        <div class="menu-comment-item">
          <a @click="deleteComment(comment)">Supprimer</a>
          <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
        </div>
        <div class="menu-comment-item">
          <a @click="modifyComment(comment)">Modifier</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmDialogue from '@/components/ConfirmDialogue.vue';
import CommentService from "../service/comment.resource";
export default {
  name: 'Comment',
  data () {
    return {
      isEditing: false,
    }
  },
  props: ['post', 'comment'],
  components: {
    ConfirmDialogue,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getDateWithoutTime(date) {
      return require("moment")(date).format("YYYY-MM-DD HH:mm");
    },

    newline () {
      this.comment = `${this.comment}\n`
    },

    async deleteComment() {
      const ok = await this.$refs.confirmDialogue.show({
        title: 'Supprimer mon commentaire',
        message: 'Êtes-vous sur de vouloir supprimer ce commentaire ?',
        okButton: 'Oui, supprimer ce commentaire',
      })
      if (ok) {
        const comment = this.comment.id
        const postId = this.$route.params.id;
        CommentService.deleteComment(postId, comment)
        .then(() => {
          console.log("Commentaire supprimé !");
          location.reload(true);
        },
        error => {
          console.log(error);
        });
        alert('Votre commentaire a été supprimé !')
      } else {
        alert("Ce commentaire n'a pas été supprimé")
      }
    },
  }
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
.comments {
  background-color: #F2F2F2;
  border-radius: 1.5rem;
  padding-left: 0.6rem;
  padding-right: 1rem;
  align-self: flex-start;
  width: 100%;
  margin-top: 0.3rem;
}
.commentaire {
  font-size: 0.8rem;
}
.comment-date {
  margin-left: 40px;
  font-size: 0.6rem;
  color: #747474;
}
.UserAvatar {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
.commentUsername {
  font-size: 0.9rem;
  margin-bottom: -0.8rem;
}
.commentUserPhoto {
  width: 35px;
  height: 35px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
.d-flex {
  display: flex;
  align-self: flex-start;
}
.comment-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: -0.3rem;
}
.menu-comment {
  display: flex;
  justify-content: space-between;
}
.menu-comment-item {
  font-size: 0.7rem;
  font-weight: 600;
  color:#747474;
  margin-left: 1rem;
}
a:hover {
  color:#fd2d01;
  cursor: pointer;
}
</style>