<template>
  <div class="Accueil">
  <!-- Home -->
    <div class="signUp">
    <SignupUser />
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
import SignupUser from '@/components/Signup.vue'


export default {
  name: 'Accueil',
  components: {
    Footer,
    SignupUser
  }
}
</script>

<style scoped>
.Accueil {
  font-family: 'Barlow', sans-serif;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>