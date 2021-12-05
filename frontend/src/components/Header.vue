<template>
  <header id="nav" class="border_nav bg-white" >
    <img class="logo" src="../assets/groupomania_logo.png" alt="Groupomania"/>
    <div class="navigation">
      <template v-if="currentUser">
        <router-link to="/home" class="nav_centrale">Fil d'actualité</router-link> |
        <router-link to="/posts" class="nav_centrale">Publier</router-link>
        <router-link to="/profil" class="nav_centrale">Profil</router-link>
        <router-link v-if="currentUser" to="/profil" class="text-decoration-none mr-5 white--text"><strong style="text-transform: uppercase"> {{ currentUser.username }} </strong> </router-link> 
        <a @click="logout" to="/" class="text-decoration-none white--text"><font-awesome-icon icon="sign-out-alt" class="ml-5 mr-2"/> Déconnexion </a>
      </template>
      <template v-else>
        <router-link to="/" class="text-white font-semibold hover:text-gray-700 mx-3">
          Connexion
        </router-link>
        <router-link to="/signup" class="text-white font-semibold hover:text-gray-700 mx-3">
          Inscription
        </router-link>
      </template>
      </div>
  </header>
</template>
<script>
export default {
  
  name: 'Header',
  computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
        window.alert('Vous êtes maintenant déconnecté(e)')
        this.$router.push('/');
      }
    }
}
</script>

<style scoped>
header {
  margin: 0;
}
#nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff,
}
#nav a {
  font-weight: bold;
  color: #242424;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #fd2d01;
}
.nav_centrale {
  padding: 2rem;
}
.logo {
  display: block;
  width: 9%;
  padding-left: 1rem;
}
.border_nav {
  box-shadow: 0 8px 8px 0 rgba(95, 99, 122, 0.123);
  border-width: 0;
  z-index: 1;
  position: relative;
  box-sizing: border-box;
}
.profil {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
}
</style>