<template>
  <div class="container">
      <div
        class="row border-secondary text-justify"
        v-for="post in posts"
        :key="post.id"
      >
        <div class="col">
          <div class="card-body">
            <div class="card-text" v-if="`${post.content}` !== 'null'">
              {{ post.title }} {{ post.content }} <i>created by</i> <b>{{ user(post) }}</b>
            </div>
            <div>
              <img
                v-if="`${post.image}` !== 'null'"
                :src="`${post.image}`"
                alt="image"
                class="img-fluid"
              >
            </div>
            <button @click="$router.push(`posts/${post.id}`)" class="btn btn-secondary">
              Voir le post
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  data() {
    return {
      posts: {},
      username: ''
    }
  },
  components: {
  },
  methods: {
    getAllPosts() {
      this.$store.dispatch("post/getAllPosts")
      .then((res) => (this.posts = res.data))
    },
  //method to chekc if user is at the bottom of the page
    checkPosition() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.feedPostsIndex += 20;
      }
    },
    user(post) {
      if(post.user != null) {
        return post.user.username
      } else return this.username
    }
  },
  mounted() {
	this.getAllPosts();
    window.addEventListener("scroll", this.checkPosition)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  border-bottom: 1px solid #000;
}
img{
  max-width: 200px;
  margin-top: 20px;
}
</style>