<template>
  <div class="HomePage">
     <!-- Header -->
    <div class="header">
    <Header />
    </div>
    <h1 v-if="isLoggedIn">
			Bienvenue sur votre fil d'actualité {{ user.username }}! 😁 
		</h1>
    <div>
      <p class="text-center">
        Il n'y a encore aucune publications.<br />
        Publiez un post : cliquez ici ;)
      </p>
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
import Header from '@/components/Header.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
    Footer
  },
  computed : {
    isLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
}
</script>