<template>
  <div>
    <div @submit="onSubmit" >
      <PostFormulaire
        @onFileSelected="onFileSelected"
        v-model="post.content"
        :onFormSubmit="didSubmitForm"
        :isCreating="true"
      />
    </div>
  </div>
</template>

<script>
import Post from '../models/post'
import { mapActions } from 'vuex'
import PostFormulaire from '../components/PostFormulaire'
export default {
  name: 'CreatePost',
  components: {
    PostFormulaire
  },
  data () {
    return {
      post: new Post("", ""),
      file: null,
      image: null,
      didSubmitForm: false
    }
  },
  methods: {
    ...mapActions(['displayNotification']),

    onFileSelected(file) {
      this.image = file
    },

    onSubmit(event) {
      const post = new FormData();
      post.append('image', this.image);
      post.append('content', this.post.content);
      this.$store.dispatch("post/createPost", post)
      .then(() => {
        this.displayNotification('Post créé !')
        this.resetForm(event)
      })
    },

    resetForm(event) {
      event.target.reset()
      this.post.content = ''
      this.image = null
      this.didSubmitForm = !this.didSubmitForm
    },
  }
}
</script>

<style lang="scss">
.custom-file-label {
  text-align: left;
}
</style>