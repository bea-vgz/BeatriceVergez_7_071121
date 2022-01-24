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
            <div class="option"> 
              <router-link to="/profil" class="nav_centrale underline"><b-icon icon="person-circle" class="mr-2 mr-lg-3"></b-icon> Mon compte</router-link>
            </div>
            <div class="option">
              <router-link to="/password" class="nav_centrale underline"><b-icon icon="pencil-square" class="mr-2 mr-lg-3"></b-icon> Modifier mot de passe</router-link>
            </div>
            <div class="option">
              <a @click="logout" class="text-decoration-none underline"><b-icon icon="box-arrow-in-left" class="mr-2 mr-lg-3"></b-icon> Me déconnecter </a>
              <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
            </div>
            <div class="option">
              <a @click="deleteUser" class="nav_centrale delete_user underline"><b-icon icon="trash-fill" class="mr-2 mr-lg-3 delete_icon"></b-icon>Supprimer mon compte</a>
              <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
            </div>
        </div>
    </aside>
    <div class="infoUser bg-white">
      <h1><strong>Mon profil</strong> </h1>
      <div class="userInfo">
        <p v-if="currentUser"><strong>Pseudo : </strong>{{ currentUser.email }}</p>
        <p v-if="currentUser"><strong>Biographie :</strong>{{ currentUser.bio }}</p>
        <p v-if="currentUser"><strong>Identifiant :</strong> {{ currentUser.userId }}</p>      
      </div>
      <div class="line mb-3"></div>
      <a title="Modifier mon profil" @click="displayModal" class="icone underline">
        <b-icon icon="pencil-fill" class="mr-2 mr-lg-3 modif_icon"></b-icon> 
        Modifier mon profil
      </a>
      <modify-profil v-show="modifyProfil" @close="closeModal" />
    </div>
  </div>
  <AllPosts :userId="currentUser.userId" />
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
import AllPosts from "../components/AllPosts.vue"
export default {
  name: "Profil",
  components: {
    Header,
    Footer,
    ConfirmDialogue,
    modifyProfil,
    AllPosts
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
  color : #fd2d01;
  margin-bottom: 1rem;
}
.profil {
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
}
.avatar {
  width: 65px;
  height: 65px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  margin-bottom: 1rem;
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
    width: 40rem;
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
.userInfo{
  margin-top: 1rem;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
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
a{
    text-decoration: none;
    color:#242424;
    font-size : 1rem;
    font-weight: bold;
    cursor: pointer;
}
a:hover{
    color: #fd2d01;
    cursor: pointer;
    text-decoration: none;
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
}
.border-b {
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
}
.py-8 {
  padding-bottom: 2rem;
}
.underline{
  position: relative;
}
.underline::before{
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: #fd2d01;
  transition: 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
@media (hover: hover) and (pointer: fine) {
  .underline:hover::before{
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>