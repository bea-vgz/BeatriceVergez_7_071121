<template>
  <div class="container">
    <Header />
      <div class="posts" v-if="posts">
        <Post
          v-for="post in posts"
          :key="post" 
          :post="post"
          :currentUser="currentUser"
        ></Post>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import PostService from "../service/post.resource"
export default {
  data() {
    return {
      posts: [],
      user: {}
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: { Header, Footer },
  mounted() {
    this.getAllPostsUser();
    this.getOneUser();
  },
  methods: {
    getDateWithoutTime(date) {
      return require("moment")(date).format("YYYY-MM-DD HH:mm");
    },
    getAllPostsUser() {
      const userId = this.$route.params.id;
      PostService.getAllPostsUser(userId)
        .then(() => {
          this.posts = this.getAllPostsUser(this.$route.params.id);
      })
    },
    getOneUser() {
      const userId = this.$route.params.id;
      PostService.getOneUser(userId)
        .then((res) => {
          this.user = res.data
      })
    }
  }
};
</script>
<style scoped>
.card-body {
    padding: 3.5rem;
    max-width: 100%;
    border-radius: 1.25rem;
    box-shadow: 0 0 6px #0000002e;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    margin-top: 3rem;
    padding: 2rem;
}
img{
    max-width: 100%;
    width: 100%;
    height: 350px;
    object-fit: cover;
    object-position: center;
}
button {
    justify-content: center;
    flex-wrap: nowrap;
    background: none;
    border: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
button:hover {
    background: #F2F2F2;
    cursor: pointer;
}
.line {
    display: block;
    width: 100%;
    height: 1px;
    margin-top: 0.8rem;
    margin-bottom: O.8rem;
    background-color: rgba(192, 192, 192, 0.5);
}
.blue {
  color: rgb(32, 120, 244);
}
</style>