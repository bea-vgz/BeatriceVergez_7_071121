<template>
  <div>
    <Header />
    <div class="container_home">
    <h1 v-if="currentUser" class="text-align">
			Bienvenue sur votre fil d'actualité <br />
      {{ currentUser.username }} ! 😁 
    </h1>
    
    <CreatePost />
    
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6" class="align-items-center">
        <AllPosts />
      </b-col>
    </b-row>
    </div>
 <!-- Footer -->
  <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import CreatePost from '../components/CreatePost.vue';
import AllPosts from '../components/AllPosts.vue';
export default {
  name: 'HomePage',
  data() {
		return {
      posts: [],
		};
	},
  components: {
    Header,
    Footer,
    CreatePost,
    AllPosts
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
}
</script>

<style scoped>
.container_home {
  font-family: 'Barlow', sans-serif;
  background-color: #F2F2F2;
  max-width: 100%;
  width: 100%;
  padding-bottom: 132px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
}
h1 {
  max-width: 100%;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
}
.text-align {
  text-align:center;
}
</style>