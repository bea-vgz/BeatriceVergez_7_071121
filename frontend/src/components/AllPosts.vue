<template>
  <div>
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6" v-for="post in post.list" :key="post.id">
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
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const totalHeight = document.documentElement.scrollHeight
      const scrollHeight = window.scrollY + window.innerHeight
      const remainingOffset = totalHeight - scrollHeight
      if (remainingOffset < 300) {
        this.$store.dispatch('post/loadMore', this.queryParams)
      }
    }
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