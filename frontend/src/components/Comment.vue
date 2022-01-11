<template>
  <div v-if="comment" class="comment">
    <div class="d-flex">
      <router-link :to="{ name: 'ProfilUser', params: { userId: comment.User.id } }" >
        <div class="UserAvatar" v-if="comment.User">
          <img :src="comment.User.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
        </div>
      </router-link>
      <div class="comment-box">
        <router-link
          :to="{ name: 'ProfilUser', params: { userId: comment.User.id } }"
          >
          <p class="comment-username">
            {{ comment.User.username }}
          </p></router-link>
        <input
          v-if="isEditing"
          ref="inputContent"
          v-model="comment.content"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="modifyComment"
          @keydown.enter.shift.exact="newline"
          type="text"
          class="input-content border-0 my-2"
          aria-label="Modifier le commentaire"
        />
        <p v-else class="mb-0">{{ comment.content }}</p>
      </div>
      <div class="position-relative">
        <EditButton
          customClass="comment-button"
          classCollapse="comment-btn-collapsed"
          :isCreator="currentUser.userId == comment.UserId"
          @clickedEditButton="startEditing"
          @onDelete="deleteComment"
          modifyText="Modifier"
          deleteText="Supprimer"
        />
      </div>
    </div>
    <p class="comment-date">
      {{ getDateWithoutTime(comment.updatedAt) }}
    </p>
  </div>
</template>

<script>
import CommentService from "../service/comment.resource";
import EditButton from '../components/EditButton.vue'
export default {
  name: 'Comment',
  props: ['post', 'comment'],
  components: {
    EditButton
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
   data () {
    return {
      isEditing: false
    }
  },
  methods: {
    getDateWithoutTime(date) {
      return require("moment")(date).format("YYYY-MM-DD HH:mm");
    },

    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },

    startEditing(comment) {
      this.isEditing = true
      setTimeout(() => {
        this.$refs.inputContent.focus(comment)
      }, 30)
    },

    newline () {
      this.comment.content = `${this.comment.content}\n`
    },

    deleteComment() {
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
    },

    modifyComment() {
        const postId = this.$route.params.id;
        const comment = this.comment.id
        CommentService.modifyComment(postId, comment,
        { content: this.comment.content })
        .then(() => {
          this.comment.updatedAt = comment.updatedAt
          alert("Commentaire modifié !");
          location.reload(true);
        },
        error => {
          console.log(error);
        });
      },
  }
}
</script>

<style lang="scss">
.comment {
  margin-top: 0.5rem;
}
.comment-button {
  position: static !important;
  margin-left: 10px;
}
.comment-btn-collapsed {
  left: 14px;
  top: 40px;
  width: 50px;
}
.input-content:focus {
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
} 
.comment-date {
  margin-left: 45px;
  font-size: 0.8rem;
}
.comment-box {
  background-color: #F2F2F2;
  padding-left: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 0;
  width: 100%;
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
.comment-username {
  font-weight: 600;
  color:#000000
}
a {
  text-decoration: none;
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
</style>