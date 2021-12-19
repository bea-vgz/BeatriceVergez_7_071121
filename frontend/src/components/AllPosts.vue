<template>
  <div class="container">
      <div
        class="row border-secondary text-justify"
        v-for="post in posts"
        :key="post.id"
      >
        <div class="col" v-if="`${post}`" >
          <div class="card-body">
            <b>{{ user(post) }}</b>
            <div>
              <img 
                :src="`${post.image}`"
                alt="image"
                class="img-fluid"
              >
            </div>
            <div class="card-text">
              <h2> {{ post.title }} </h2>
              <h4> {{ post.content }}</h4>
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
        this.feedPostsIndex += 10;
      }
    },
    user(post) {
      if(post.user) {
        return post.User.username
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
.card-body {
    padding: 3.5rem;
    max-width: 100%;
    width: 30rem;
    height: auto;
    border-radius: 1.25rem;
    box-shadow: 0 0 16px #0000002e;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6rem;
    margin-bottom: 6rem;
}
img{
  max-width: 100%;
  width: 10rem;
  height: auto;
}
</style>