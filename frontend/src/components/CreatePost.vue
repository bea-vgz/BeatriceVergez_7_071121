<template>
  <div>
    <form @submit="onSubmit">
      <PostFormulaire
        @onFileSelected="onFileSelected"
        v-model="content_post"
        :onFormSubmit="didSubmitForm"
        :isCreating="true"
      />
    </form>
  </div>
</template>

<script>
import PostFormulaire from './PostFormulaire'
import Post from '../models/post'

export default {
  name: 'CreatePost',
  components: {
    PostFormulaire,
  },
  data () {
    return {
      content_post: new Post("", "", ""),
      image: null,
      didSubmitForm: false,
      user: this.$store.getters["auth/userState"],
    }
  },
  methods: {
    onFileSelected (file) {
      this.image = file
    },
    async onSubmit (event) {
    this.resetForm(event)
      await this.$store.dispatch("post/createPost", this.post)
        .then(data => {
        this.message = data.message;
        window.alert("Création du post réussi ! ")
      })
      .catch((error) => {
        console.log(error);
      });
    },

    resetForm (event) {
      event.target.reset()
      this.title = ''
      this.content = ''
      this.image = null
      this.didSubmitForm = !this.didSubmitForm
    }
  }
}
</script>

<style lang="scss">
.custom-file-label {
  text-align: left;
}
</style>