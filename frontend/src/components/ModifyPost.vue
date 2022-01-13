<template>
  <div class="fixed inset-0 transition-opacity">
    <EditButton
      :editingPost="true"
      :isCreator="post.UserId == currentUser.userId"
      @onDelete="deletePost"
      :elementId="post.id"
      modifyText="Modifier la publication"
      deleteText="Supprimer la publication"
    >
      <b-modal
        :id="`modal-${post.id}`"
        title="Modifier la publication"
        ok-title="Enregistrer"
        ok-variant="light"
        @ok="onUpload"
        ok-only
      >
        <b-form>
          <PostFormulaire
          :image="post.image"
            @onFileSelected="onFileSelected"
            v-model="content"
          />
        </b-form>
      </b-modal>
    </EditButton>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PostFormulaire from './PostFormulaire'
import EditButton from './EditButton'
export default {
  name: 'ModifyPost',
  components: {
    PostFormulaire,
    EditButton,
  },
  props: ['post'],
  data () {
    return {
      content: this.post.content,
      selectedFile: null,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    ...mapActions(['displayNotification']),

    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    onFileSelected (file) {
      this.selectedFile = file
    },

    async onUpload() {
      const postId = this.post.id
      await this.$store.dispatch("post/modifyPost", postId)
      this.displayNotification('Post modifié !')
    },

    deletePost() {
      const postId = this.post.id
      this.$store.dispatch("post/deletePost", postId)
      this.displayNotification('Post supprimé !')
    },
  }
}
</script>

<style lang="scss">
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.modal-body {
  padding: 1rem 1rem 0 1rem;
}
.modal-title {
  color: #747474;
}
.btn-light {
  border: none;
  color: #747474;
  font-weight: 500;
  display: block;
  width: 100%;
  margin: 0 1rem 1rem 1rem;
}
.modal-content {
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(108, 117, 125, 0.2);
}
</style>