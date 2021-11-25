<template>
  <div class="Home">
  <!-- Home -->
    <div class="signUp">
    <Signup />
    </div>

  <!-- Footer -->
    <div class="footer">
    <Footer />
    </div>

  <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue';
import Signup from '@/components/Signup.vue'
export default {
  name: 'Home',
  components: {
    Footer,
    Signup
  }
}
</script>

<style scoped>
.Home {
  font-family: 'Barlow', sans-serif;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>