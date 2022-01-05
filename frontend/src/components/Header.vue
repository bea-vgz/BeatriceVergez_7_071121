<template>
  <header id="nav" class="border_nav bg-white" >
    <div class="navigation">
      <div class="nav_logo">
        <img class="logo" src="../assets/icon_groupomania.png" alt="Groupomania"/>
        <UserSearch />
      </div>
        <div class="accessPosts">
          <router-link to="/home" aria-label="Fil d'actualité" class="nav_centrale text-decoration-none">Home</router-link> |
          <router-link to="/post" class="nav_centrale text-decoration-none">Créer un post</router-link>
        </div>

        <div class="notifUser">
          <a class="nav_centrale bell_notif text-decoration-none" aria-label="Notitfications"><font-awesome-icon icon="bell" class="icon ml-5 mr-2"/></a>
          <div class="menu-item" @click="isOpen = !isOpen" >
            <button class="accessUser">
              <img v-if="currentUser" :src="currentUser.photoProfil"  class="avatar icone" alt="Avatar" ref="file" type="file"/>
              <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"  class="avatar icone" alt="Avatar"/>
              <span v-if="currentUser" class="username bg-white text-decoration-none red-text ">
                <strong style="text-transform: uppercase"> {{ currentUser.username }} </strong>
              </span>
              <svg class="flecheMenu bg-white" viewBox="0 0 1030 638" width="10">
                <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#fff"></path>
              </svg>
            </button>
            <transition name="fade" apear>
              <div class="sub-menu" v-if="isOpen">
                <div class="menu-item">
                  <router-link to="/profil"><font-awesome-icon icon="user" class="profil_icon ml-5 mr-2"/>Mon compte</router-link>
                </div>
                <div class="menu-item">
                  <router-link to="/profil"><font-awesome-icon icon="clone" class="profil_icon ml-5 mr-2"/>Mes posts</router-link>
                </div>
                <div class="menu-item">
                  <a @click="logout" to="/" class="text-decoration-none"><font-awesome-icon icon="sign-out-alt" class="icon ml-5 mr-2"/> Me déconnecter </a>
                  <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
                </div>
              </div>
            </transition>
          </div>
        </div>

    </div>
  </header>
</template>
<script>
import router from "../router";
import ConfirmDialogue from '@/components/ConfirmDialogue.vue';
import UserSearch from '../components/UserSearch';
export default {
  
  name: 'Header',
  data() {
    return {
      userSearch: null,
      isOpen: false,
      image:'',
    }
  },
  components: {
    ConfirmDialogue,
    UserSearch
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch('auth/logout');
      const ok = await this.$refs.confirmDialogue.show({
        title: 'Déconnexion',
        message: 'Êtes-vous sur de vouloir vous déconnecter ?',
        okButton: 'Se déconnecter',
      })
      if (ok) {
        alert('Vous avez été déconnecté. Vous allez être redirigé.')
        window.location.reload()
        router.push('/');
      } else {
        alert("Vous n'avez pas été déconnecté")
      }
    },

    checkResearch(){ // Recherche d'utilisateur
      router.push({ name: 'UserSearch', params: { id: this.userSearch }});
      this.userSearch = null;      
    },
  }
}
</script>

<style scoped>
header {
  margin: 0;
}
nav .menu-item, .sub-menu {
  position: absolute;
  background-color: #fff;
  width: max-content;
  padding: 1.5rem;
  transform: translateX(-30%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  cursor: pointer;
}
.flecheMenu {
  padding-left : 0.7rem;
}
.flecheMenu:hover {
  cursor: pointer;
}
.menu-item {
  padding: 0.7rem;
  margin-right: 2rem;
  color:#242424;
}
.navigation {
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
  text-decoration: none;
}
#nav a:hover {
  cursor: pointer;
  color: #fd2d01;
}
.nav_centrale {
  padding: 2rem;
}
.text-decoration-none {
  text-decoration: none;
}
.logo {
  display: block;
  width: 25%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.profil_icon {
  padding-right: 0.5rem;
}
.notifUser, .nav_logo {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.bell_notif {
  background: #e4e4e4;
  padding: 0.8rem;
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
}
.border_nav {
  box-shadow: 0 8px 8px 0 rgba(95, 99, 122, 0.123);
  border-width: 0;
  z-index: 1;
  position: relative;
  box-sizing: border-box;
}
button {
  padding: 0.2rem;
  border-radius: 2rem;
  border: solid 0.15rem #fd2d01;
  background-color: #fd2d01;
}
.accessUser, .accessPosts {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
}
.accessUser {
  color: #fff;
}
.profil, .deconnexion {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
}
.username {
  text-decoration: none;
}
.avatar {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    padding: 0.5rem;
    object-fit: cover;
    object-position: center;
    margin-right: 0.3rem;
}
input {
  border-radius: 2rem;
  border: solid 1px #F2F2F2;
  background: #F2F2F2;
  padding: 0.7rem;
  width: 100%;
}
</style>