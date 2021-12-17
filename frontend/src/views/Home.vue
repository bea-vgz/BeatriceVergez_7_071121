<template>
  <div id="Home">
  <!-- Header -->
    <div class="header">
      <Header />
    </div>
    <div class="container_home">
    <h1 v-if="currentUser">
			Bienvenue sur votre fil d'actualité {{ currentUser.username }} ! 😁 
    </h1>
     <PostFormulaire/>
     <postView v-for="post of posts" :key="post.id" :post="post" :id="postId">
        <!-- Le contenu itéré sera affiché via le composant post.vue -->
     </postView>

    </div>
 <!-- Footer -->
    <div class="footer">
      <Footer />
    </div>
  <router-view />
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import PostFormulaire from '@/components/PostFormulaire.vue';
import postView from "../components/Post.vue";
export default {
  name: 'HomePage',
  data() {
		return {
			errorMessage: null,
		};
	},
	mounted() {
		this.$store.dispatch("post/getAllPosts");
	},
  components: {
    Header,
    Footer,
    PostFormulaire,
    postView
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    posts() {
      return this.$store.state.post.posts;
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
.container_post {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #fff;
  border-radius: 2rem;
  max-width: 100%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem
}
.avatar {
  width: 12%;
  border-radius: 100%;
  margin-bottom: 1rem;
}
#preview img {
  max-width: 100%;
  max-height: 500px;
}
.disabled {
  cursor: not-allowed;
}
.form-control {
  border: 1px solid #ccc;
}
.form-control:focus {
    border: none;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
.button {
  background: white;
  color: #747474;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
}
textarea {
  border: solid 1px #F2F2F2;
  background: #F2F2F2;
  width: 50%;
  margin-bottom: 1rem;
}
.textearea_form {
  display:flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}
.icon {
  padding-right: 0.5rem;
  color: #9e9e9e
}

</style>