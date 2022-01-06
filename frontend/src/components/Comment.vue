<template>
  <div v-if="comment">
    <div class="d-flex align-items-center position-relative">
      <div class="UserAvatar" v-if="comment.User">
        <img :src="comment.User.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
        <h3 class="font postUsername" alt="Pseudo de l'user">{{ comment.User.username }}</h3>
      </div>
        <input
          v-if="isEditing"
          ref="inputContent"
          v-model="comment.content"
          @keydown.enter.exact.prevent
          @keydown.enter.shift.exact="newline"
          type="text"
          class="input-content border-0 my-2"
          aria-label="Modifier le commentaire"
        />
        <p v-else class="mb-0">{{ comment.content }}</p>
      </div>
    <p class="text-secondary comment-date">
      {{ getDateWithoutTime(comment.createdAt) }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data () {
    return {
      comments: [],
      comment:''
    }
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    getDateWithoutTime(date) {
      return require("moment")(date).format("YYYY-MM-DD HH:mm");
    },
    startEditing () {
      this.isEditing = true
      setTimeout(() => {
        this.$refs.inputContent.focus()
      }, 30)
    },
    newline () {
      this.comment.content = `${this.comment.content}\n`
    },
  }
}
</script>

<style lang="scss">
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
@media screen and (min-width: 280px) and (max-width: 767px) {
  .comment-date {
    font-size: 0.6rem;
  }
  .comment-button {
    margin-bottom: 0;
    margin-left: 3px;
  }
  .comment-btn-collapsed {
    left: 6px;
    top: 23px;
    width: 135px;
  }
}
</style>