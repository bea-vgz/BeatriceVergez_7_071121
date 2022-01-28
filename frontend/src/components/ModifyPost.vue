<template>
  <div class="fixed inset-0 transition-opacity">
    <EditButton
      customClass="post-button"
      classCollapse="post-btn-collapsed"
      :editingPost="true"
      :isCreator="post.UserId == currentUser.userId"
      :isAdmin="currentUser.isAdmin"
      @onDelete="deletePost"
      :elementId="post.id"
      modifyText="Modifier le post"
      deleteText="Supprimer le post"
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
            :imageUrl="post.image"
            @onFileSelected="onFileSelected"
            v-model="post.content"
          />
        </b-form>
      </b-modal>
    </EditButton>
  </div>
</template>

<script>
import PostService from "../service/post.resource";
import { mapActions } from 'vuex'
import PostFormulaire from '../components/PostFormulaire.vue'
import EditButton from '../components/EditButton.vue'
export default {
  name: 'ModifyPost',
  components: {
    PostFormulaire,
    EditButton,
  },
  props: ['post'],
  data () {
    return {
      image: '',
      file: '',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.content = this.post.description,
    this.image = this.post.image
  },
  methods: {
    ...mapActions(['displayNotification']),
    toggleActions () {
      this.areActionsVisible = !this.areActionsVisible
    },
    onFileSelected(file) {
      this.post.image = "";
      this.image = file
    },
    onUpload(){
      let post;
      console.log();
      if(this.post.image != "") {
        post = {
          content: this.post.content,
          image: this.post.image
        }
      }
      else if(this.image != "") {
        post = new FormData();
        post.append('image', this.image);
        post.append('content', this.post.content);
      }
      else {
        console.log("Erreur : la publication ne peut être vide !");
      }
      const postId = this.post.id
      PostService.modifyPost(postId, post)
      .then(() => {
        this.displayNotification('Post modifié !')
      })
    },
    
    deletePost() {
      const postId = this.post.id
      this.$store.dispatch("post/deletePost", postId)
      .then(() => {
        this.displayNotification('Post supprimé !')
        location.reload()
      })
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
  font-family: "Barlow", sans-serif;
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(108, 117, 125, 0.2);
}
</style>