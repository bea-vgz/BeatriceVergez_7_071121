<template>
  <div>
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6" v-for="post in posts" :key="post.id">
        <Post :post="post" />
      </b-col>
    </b-row>

    <p class="mx-2">{{ posts.errorMessage }}</p>
  </div>
</template>


<script>
import Post from "../components/Post.vue";
export default {
  name: 'AllPosts',
  data() {
    return {
      posts: [],
    }
  },
  components: { 
    Post,
  },
  methods: {
    getAllPosts() {
      this.$store.dispatch("post/getAllPosts")
      .then((res) => (this.posts = res.data))
    },
    getDateWithoutTime(createdAt) {
      return require("moment")(createdAt).format("YYYY-MM-DD HH:mm");
    },
  },
  mounted() {
	this.getAllPosts();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>