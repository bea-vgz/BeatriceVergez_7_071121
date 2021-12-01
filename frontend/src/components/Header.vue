<template>
  <header id="nav" class="border_nav bg-white" >
    <img class="logo" src="../assets/groupomania_logo.png" alt="Groupomania"/>
    <div class="navigation">
      <router-link to="/posts" class="nav_centrale">Fil d'actualité</router-link> |
      <router-link to="/posts" class="nav_centrale">Publier</router-link>
    </div>
      <div class="profil bg-sea-light rounded-full relative text-center text-white flex justify-center items-center font-medium h-12 w-12 cursor-pointer">
        <img src="//www.gravatar.com/avatar/0082479fc08ae9f617453243bcf9704c?s=80&d=blank&r=g" alt="Avatar">
        <router-link to="/profil" class="nav_centrale">Profil</router-link>
      </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  
  name: 'Header',
  computed : {
      ...mapGetters(["isLoggedIn"]),
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      }
    },
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