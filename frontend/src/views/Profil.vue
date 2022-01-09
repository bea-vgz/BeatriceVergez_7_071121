<template>
<div class="profil">
     <!-- Header -->
    <div class="header">
        <Header />
    </div>
    <div class="container_account">
    <aside class="profil_account bg-white">
        <div class="contanier_presentation bg-white border-b py-8">
          <img v-if="currentUser" :src="currentUser.photoProfil"  class="avatar" alt="Avatar" ref="file" type="file" />
          <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"  class="avatar" alt="Avatar" />
          <h1 v-if="currentUser" class="username">{{ currentUser.username }}</h1>
          <p><span v-if="currentUser" class="email">{{ currentUser.email }}</span></p>
        </div>
        <div class="optionsProfil bg-white">
            <div class="option is-active"> 
              <router-link to="/profil" class="nav_centrale"><font-awesome-icon icon="user" class="icon ml-5 mr-2"/> Mon compte</router-link>
            </div>
            <div class="option is-active">
              <router-link to="/password" class="nav_centrale"><font-awesome-icon icon="user-lock" class="icon ml-5 mr-2"/>Modifier mot de passe</router-link>
            </div>
            <div class="option is-active">
              <router-link to="/mesPosts" class="nav_centrale"><font-awesome-icon icon="clone" class="icon ml-5 mr-2"/>Mes posts</router-link>
            </div>
            <div class="option is-active">
              <a @click="logout" to="/" class="text-decoration-none"><font-awesome-icon icon="sign-out-alt" class="icon ml-5 mr-2"/> Me déconnecter </a>
              <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
            </div>
            <div class="option is-active" >
              <a to="/" class="nav_centrale delete_user" @click="deleteUser"><font-awesome-icon icon="trash-alt" class="delete_icon ml-5 mr-2"/>Supprimer mon compte</a>
              <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
            </div>
        </div>
    </aside>
    <div class="text-justify infoUser bg-white">
      <h2><strong>Mon compte : </strong> </h2>
      <div>
        <p v-if="currentUser"><strong>Pseudo : </strong>{{currentUser.username}}</p>
        <p v-if="currentUser"><strong>Email : </strong>{{ currentUser.email }}</p>
        <p v-if="currentUser"><strong>Biographie :</strong>{{ currentUser.bio }}</p>
        <p v-if="currentUser"><strong>Identifiant :</strong> {{ currentUser.userId }}</p>      
      </div>
      <a title="Modifier mon profil" @click="displayModal" class="icone" >
        <span><font-awesome-icon icon="user-edit" class="modif_icon"/> Modifier mon compte</span>
      </a>
      <modify-profil v-show="modifyProfil" @close="closeModal" />
    </div>
  </div>
  <!-- Footer -->
    <div class="footer">
        <Footer />
    </div>
  <router-view />
  </div>
</template>

<script>
import router from "../router";
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import ConfirmDialogue from '@/components/ConfirmDialogue.vue';
import modifyProfil from '@/components/ModifyProfil.vue'

export default {
  name: "Profil",
  components: {
    Header,
    Footer,
    ConfirmDialogue,
    modifyProfil
  },
  data() {
    return {
      modifyProfil: false,
      image:'',
      user:'',
    }
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
    displayModal() {
      this.modifyProfil = true;
    },
    closeModal() {
      this.modifyProfil = false;
    },
    
    async deleteUser() {
      const ok = await this.$refs.confirmDialogue.show({
        title: 'Supprimer mon compte',
        message: 'Êtes-vous sur de vouloir supprimer votre compte ?',
        okButton: 'Supprimer mon compte',
      })
      if (ok) {
        let payload = this.$store.state.auth.user.userId
        this.$store.dispatch("auth/deleteUser",payload)
        .then(data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
        alert('Votre compte a été supprimé !')
        router.push('/signup');
      } else {
        alert("Votre compte n'a pas été supprimé")
      }
    },
      
    async logout() {
      const ok = await this.$refs.confirmDialogue.show({
        title: 'Déconnexion',
        message: 'Êtes-vous sur de vouloir vous déconnecter ?',
        okButton: 'Se déconnecter',
      })
      if (ok) {
        this.$store.dispatch('auth/logout');
        alert('Vous avez été déconnecté. Vous allez être redirigé.')
        router.push('/');
      } else {
        alert("Vous n'avez pas été déconnecté")
      }
    },
  },
}
</script>

<style scoped>
.container_account {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
    width: 100%;
}
h1 {
  font-size: 30px;
  color : #fd2d01
}
.profil {
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
}
.avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
.bg-white {
  background-color: #fff;
  border-color: rgba(231, 233, 244);
}
.formulaire_account {
   flex: 1 1 0%;
}
.infoUser {
    padding: 3.5rem;
    max-width: 100%;
    width: 30rem;
    height: auto;
    border-radius: 1.25rem;
    box-shadow: 0 0 16px #0000002e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 6rem;
    margin-bottom: 6rem;
}
input {
    font-family: 'Barlow', sans-serif;
    border: solid 2px #F2F2F2;
    border-radius: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding-left: 0.8rem;
    line-height: inherit;
    color: inherit;
    height: 2rem;
    max-width: 100%;
    width: 50%;
    text-align: left;
}
.optionProfil {
    border-color: rgba(231, 233, 244);
}
.profil_account {
    width: 20%;
    padding: 4rem;
    border-right-width: 1px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-color: rgba(231, 233, 244);
}
.delete_user, .modif_user {
  margin-top: 2rem;
  color: #fd2d01
}
.delete_icon, .modif_icon {
  color: #fd2d01;
  padding-right: 0.7rem;
}
.option {
    display: flex;
    text-align: center;
    align-items: left;
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    border-radius: 2rem;
    border: solid 0.15rem #fff;
    background-color: #fff;
    margin-top: 0.8rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
}
a {
    text-decoration: none;
    color:#242424;
    font-size : 1rem;
    font-weight: bold;
    cursor: pointer;
}
a:hover{
    color: #fff;
    cursor: pointer;
}
.icon {
  padding-right: 0.7rem;
  color: #9e9e9e
}
.save {
  color: #fff;
}
.icone {
    color: #fd2d01;
    padding-top: 2rem;
    border-top: 1px solid #ccc;
    margin-top: 1rem;
}
.border-b {
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
}
.py-8 {
  padding-bottom: 2rem;
}
</style>