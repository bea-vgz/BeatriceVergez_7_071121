<template>
  <div>
    <EditButton
      :editingPost="true"
      :isCreator="currentUser.userId == post.UserId"
      :elementId="post.id"
      modifyText="Modifier la publication"
    >
      <div
        :id="`modal-${post.id}`"
        title="Modifier la publication"
        @ok="onUpload"
        ok-only
      >
        <form>
          <PostFormulaire
            :image="post.image"
            @onFileSelected="onFileSelected"
            v-model="content"
          />
        </form>
      </div>
    </EditButton>
  </div>
</template>

<script>
import PostFormulaire from './PostFormulaire'
import EditButton from './EditButton'
export default {
  name: 'ModifyPost',
  components: {
    PostFormulaire,
    EditButton
  },
  props: ['post'],
  data () {
    return {
      content: this.post.content,
      selectedFile: null
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    onFileSelected (file) {
      this.selectedFile = file
    },
    async onUpload () {
      this.$store.dispatch("post/modifyPost", {
        postId: this.post.id,
        selectedFile: this.selectedFile,
        content: this.content
      })
      alert('Votre post a été modifié !')
    },
  }
}
</script>

<style lang="scss">
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