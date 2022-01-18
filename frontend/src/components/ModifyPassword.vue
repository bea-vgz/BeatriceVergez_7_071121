<template>
  <div class="profil">
    <Header/>

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
              <router-link to="/profil" class="nav_centrale underline"><b-icon icon="person-circle" class="mr-2 mr-lg-3"></b-icon> Mon compte</router-link>
            </div>
            <div class="option is-active">
              <router-link to="/password" class="nav_centrale underline"><b-icon icon="pencil-square" class="mr-2 mr-lg-3"></b-icon> Modifier mot de passe</router-link>
            </div>
            <div class="option is-active">
              <a @click="logout" to="/" class="text-decoration-none underline"><b-icon icon="box-arrow-in-left" class="mr-2 mr-lg-3"></b-icon> Me déconnecter </a>
              <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
            </div>
            <div class="option is-active">
              <a to="/" class="nav_centrale delete_user underline" @click="deleteUser"><b-icon icon="trash-fill" class="mr-2 mr-lg-3 delete_icon"></b-icon>Supprimer mon compte</a>
              <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
            </div>
        </div>
    </aside>
      <div class="ui segment infoUser bg-white">
        <h2 class="ui dividing header">Mot de passe</h2>
    
        <div class="card">
          <div class="form-row">
            <label for="password"> 🔒  Mot de passe actuel : </label>
            <div class="inputPassword">
              <input v-if="currentUser" v-model="currentUser.password" class="form-row_input" id="actuelPassword" type='password' />
            </div>
          </div>
          <div class="form-row">
            <label for="newpassword"> 🔒  Nouveau mot de passe : </label>
            <div class="inputPassword">
              <input v-model="newPassword" class="form-row_input" id="newPassword" :type="show ? 'text' : 'password'" />
              <button type="button" class="buttonEyes" @click="show = !show" >
                <font-awesome-icon icon="eye" alt="mot de passe visible" class="eyes text-color" v-show="show" />
                <font-awesome-icon icon="eye-slash" alt="mot de passe invisible" class="eyes text-color" v-show="!show" />
              </button>
            </div>
          </div>
          <div class="form-row">
            <label for="newpassword">🔒  Confirmer le mot de passe : </label>
            <div class="inputPassword">
              <input v-model="confirmPassword" class="form-row_input" id="confirmPassword" :type="show ? 'text' : 'password'" />
              <button type="button" class="buttonEyes" @click="show = !show" >
                <font-awesome-icon icon="eye" alt="mot de passe visible" class="eyes text-color" v-show="show" />
                <font-awesome-icon icon="eye-slash" alt="mot de passe invisible" class="eyes text-color" v-show="!show" />
              </button>
            </div>
          </div>
        <button class="buttonSave" type="submit" @click="modifyPassword()">
            <router-link to="/profil" class="save">Sauvegarder</router-link>
        </button>
        <div v-if="message">
          {{ message }}
        </div>
        </div>
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
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import ConfirmDialogue from '@/components/ConfirmDialogue.vue'

  export default {
    name: 'ModifyPassword',
    components: {
      Header,
      Footer,
      ConfirmDialogue
    },
    data () {
      return {
        newPassword: '',
        confirmPassword:'',
        show: false,
        message:''
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      modifyPassword() {
        if (this.newPassword === this.confirmPassword) {
          const password = {
            password: this.newPassword,
          }
          let payload = {
            userId: this.currentUser.userId,
            data: password
          }
          this.$store.dispatch("auth/modifyPassword", payload)
          .then(() => {
            console.log(this.message = 'Mot de passe modifié avec succès')
            alert('Mot de passe modifié')
          })
        }
        else {
          console.log(this.message = "Le mot de passe n'a pas pu être mis à jour")
          alert("Oups, une erreur est survenue")
        }
      },

      async deleteUser() {
        let payload = this.$store.state.auth.user.userId
        this.$store.dispatch("auth/deleteUser",payload)
        .then(data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
        const ok = await this.$refs.confirmDialogue.show({
          title: 'Supprimer mon compte',
          message: 'Êtes-vous sur de vouloir supprimer votre compte ?',
          okButton: 'Supprimer mon compte',
        })
        if (ok) {
          alert('Votre compte a été supprimé !')
          router.push('/');
        } else {
          alert("Oups, une erreur est survenue")
        }
      },
      
    async logout() {
      this.$store.dispatch('auth/logout');
      const ok = await this.$refs.confirmDialogue.show({
        title: 'Déconnexion',
        message: 'Êtes-vous sur de vouloir vous déconnecter ?',
        okButton: 'Se déconnecter',
      })
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
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
.card {
  border: none
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
    width: auto;
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
    width: 100%;;
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
.delete_user, .modif_user {
  margin-top: 2rem;
  color: #fd2d01
}
.delete_icon, .modif_icon {
  color: #fd2d01;
}
.buttonSave {
  background-color: #fd2d01;;
  border: solid 0.15rem #fd2d01;
  padding: 1rem;
  padding-right: 1rem;
  border-radius: 2rem;
  padding: 0.5rem;
  max-width: 100%;
  width: 30%;
  margin-top: 1rem;
}
.save {
  color: #fff;
}
.border-b {
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
}
.py-8 {
   padding-bottom: 2rem;
}
.buttonEyes {
  background: none;
  border: none;
  cursor: pointer;
}
.inputPassword {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
}
</style>