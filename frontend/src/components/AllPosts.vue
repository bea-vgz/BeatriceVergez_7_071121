<template>
  <div>
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6" v-for="post in post.posts" :key="post.id">
        <Post :post="post" />
      </b-col>
    </b-row>
    <p class="mx-2">{{ post.errorMessage }}</p>
  </div>
</template>


<script>
import Post from "../components/Post.vue";
import { mapState } from 'vuex'
export default {
  name: 'AllPosts',
  components: {
    Post
  },
  props: ['userId'],
  async mounted () {
    await this.$store.dispatch('post/initializePostStore', this.queryParams)
  },
  computed: {
    ...mapState(['post']),
    queryParams () {
      if (this.userId) {
        return { userId: this.userId }
      } else {
        return {}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>