<template>
  <div v-if="comment" class="comment">
    <div class="d-flex">
      <div class="UserAvatar" v-if="comment.User">
        <router-link :to="{ name: 'ProfilUser', params: { userId: comment.UserId } }" >
          <img :src="comment.User.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
        </router-link>
      </div>
      <div class="comment-box" v-if="comment.User">
        <router-link :to="{ name: 'ProfilUser', params: { userId: comment.UserId } }">
          <p class="comment-username">
            {{ comment.User.username }}
          </p>
        </router-link>
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
          :isCreator="comment.UserId == currentUser.userId"
          :isAdmin="currentUser.isAdmin"
          @clickedEditButton="startEditing"
          @onDelete="deleteComment"
          modifyText="Modifier"
          deleteText="Supprimer"
        />
      </div>
    </div>
    <div class="footer-comment d-flex">
      <p class="comment-date">
        {{ getDateWithoutTime(comment.updatedAt) }}
      </p>
      <div class="d-flex justify-content-around">
        <button
          @click="likeOrNotComment"
          class="react-btn"
          aria-label="Liker ou disliker"
        >
          <svg
            v-if="likeThisComment"
            style="width:15px;height:15px"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(32, 120, 244)"
              d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
            />
          </svg>
          <svg v-else 
            style="width:15px;height:15px" 
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
            />
          </svg>

          <span :class="`dislike-comment ml-2 ${likeThisComment ? 'blue' : ''}`"> J'aime</span>
        </button>
        <button
          @click="dislikeOrNotComment"
          class="react-btn footer-btn "
          aria-label="Disliker"
        >
          <svg
            v-if="dislikeThisComment"
            style="width:15px;height:15px"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(239, 42, 16)"
              d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
            />
          </svg>
          <svg v-else 
            style="width:15px;height:15px" 
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z"
            />
          </svg>

          <span :class="`like-comment ml-2 ${dislikeThisComment ? 'red' : ''}`">Je n'aime pas</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DislikeCommentService from "../service/dislike_comment.resource";
import LikeCommentService from "../service/like_comment.resource";
import { mapActions } from 'vuex'
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
      isEditing: false,
      likeThisComment: false,
      dislikeThisComment: false,
    }
  },
  mounted() {
    this.getLikeOneComment()
    this.getDislikeOneComment()
  },
  methods: {
     ...mapActions(['displayNotification']),
    getDateWithoutTime(date) {
      return require("moment")(date).format("YYYY-MM-DD HH:mm");
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
        const postId = this.post.id;
        CommentService.deleteComment(postId, comment)
        .then(() => {
          this.$emit('commentDeleted', this.comment)
          this.displayNotification('Commentaire supprimé !')
        },
        error => {
          console.log(error);
        });
    },
    modifyComment() {
      const postId = this.post.id;
      const comment = this.comment.id
      CommentService.modifyComment(postId, comment,
        { content: this.comment.content })
      .then(() => {
        this.comment.updatedAt = comment.updatedAt
        this.isEditing = false
        this.displayNotification('Commentaire modifié !')
      },
      error => {
        console.log(error);
      });
    },
    likeOrNotComment() {
      const commentId = this.comment.id;
      LikeCommentService.likeComment(commentId)
      .then((res) => (
        this.likeThisComment = res.data.like
      ))
    },
    dislikeOrNotComment() {
      const commentId = this.comment.id;
      DislikeCommentService.dislikeComment(commentId)
      .then((res) => (
        this.dislikeThisComment = res.data.dislike
      ))
    },
    getLikeOneComment(){
    const commentId = this.comment.id;
      LikeCommentService.getLikeOneComment(commentId)
      .then((res) => (
        this.likeThisComment = res.data.like
      ))
    },
    getDislikeOneComment(){
    const commentId = this.comment.id;
      DislikeCommentService.getDislikeOneComment(commentId)
      .then((res) => (
        this.dislikeThisComment = res.data.dislike
      ))
    }
  }
}
</script>

<style lang="scss">
.comment {
  margin-top: 0.5rem;
}
.comment-button {
  position: static !important;
}
.input-content:focus {
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
} 
.comment-date {
  margin-left: 45px;
  font-size: 0.7rem;
  color: #747474;
  margin-top: 0.4rem;
}
.comment-box {
  background-color: #F2F2F2;
  padding: 0.75rem;
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
  margin-top: 0.3rem;
}
.commentaire {
  font-size: 0.8rem;
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
.react-btn {
  background: white;
  border: none;
  color: #747474;
  border-radius: 0.25rem;
  font-weight: bold;
  padding-left: 1rem
}
.react-btn:focus {
  border: none !important;
  outline: none !important;
}
.react-btn:hover {
    color: #747474 !important;
}
.blue {
  color: rgb(32, 120, 244);
}
.red {
  color: rgb(239, 42, 16);
}
.footer-comment {
  display: flex;
}
.like-comment, .dislike-comment {
  font-size: 0.8rem;
}
</style>