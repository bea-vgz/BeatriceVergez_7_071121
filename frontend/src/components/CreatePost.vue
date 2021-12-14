<template v-if="currentUser">
    <div class="container_create">
       <!-- Header -->
    <div class="header">
        <Header />
    </div>

    <div class="container">
        <PostFormulaire/>
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
export default {
  name: 'CreatePost',
  components: {
    Footer,
    Header,
    PostFormulaire
  }

}
</script>