<template>
  <div>
    <Header />
    <div class="container_post">
      <Post v-if="post" :post="post"/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Post from "../components/Post.vue";
import PostService from "../service/post.resource"
export default {
  name: 'OnePost',
  data() {
    return {
      post: {},
    };
  },
  components: { 
    Header, 
    Footer,
    Post
  },
  watch: {
    $route() { 
      this.getOnePost()
    }
  },
  async mounted () {
    this.getOnePost()
  },
  methods: {
    getOnePost() {
      const postId = this.$route.params.id;
      PostService.getOnePost(postId)
        .then((res) => {
          this.post = res.data
        })
    },
  }
}
</script>