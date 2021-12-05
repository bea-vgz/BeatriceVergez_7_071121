<template>
<div class="profil">
     <!-- Header -->
    <div class="header">
        <Header />
    </div>
    <div class="container_account">
    <aside class="profil_account bg-white">
        <div class="contanier_presentation bg-white">
            <label class="avatar"> <img class="avatar" src="../assets/default-avatar-user.jpeg"/> </label>
              <div>
                <h2>Hello <span class="username">{{ currentUser.username }}</span></h2>
              </div>
        </div>
        <div class="optionsProfil bg-white ">
            <button type="submit" value="Submit" class="buttonOption"> 
                <router-link to="/profil" class="nav_centrale"> Mon compte</router-link>
            </button>
            <button type="submit" value="Submit" class="buttonOption">
                <router-link to="/password" class="nav_centrale">Mot de passe</router-link>
            </button>
            <button type="submit" value="Submit" class="buttonOption">
                <router-link to="/UserPosts" class="nav_centrale">Mes posts</router-link>
            </button>
            <button type="submit" value="Submit" class="buttonOption">
                <a @click="logout" to="/" class="text-decoration-none white--text"><font-awesome-icon icon="sign-out-alt" class="ml-5 mr-2"/> Me déconnecter </a>
            </button>
            <button type="button" class="buttonOption" >
              <router-link to="/" class="nav_centrale" @click="deleteAccount" >Supprimer mon compte</router-link>
            </button>
        </div>
    </aside>
          <div class="text-justify">
            <h3><strong>Vos infos : </strong> </h3>
            
            <div>
              <p v-if="currentUser"><strong>Pseudo : </strong><span  style="text-transform: uppercase"> {{currentUser.username}} </span></p>
              <p v-if="currentUser"><strong>Email : </strong>{{currentUser.email}}</p>
              <p v-if="currentUser"><strong>Biographie :</strong> {{currentUser.bio}} </p>
              <p v-if="currentUser"><strong>Identifiant :</strong> {{currentUser.userId}} </p>      
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
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

export default {
  name: "Profil",
  components: {
    Header,
    Footer
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
  methods: {

      deleteAccount() {
      let payload = this.$store.state.auth.user.userId
      this.$store.dispatch("auth/deleteUser",payload)
      .then(data => {
          console.log(data);
          window.alert(data.message)
          this.$router.push("/"); 
        },
        error => {
          console.log(error);
        }
      );
    },

    logout() {
        this.$store.dispatch('auth/logout');
        window.alert('Vous êtes maintenant déconnecté(e)')
        this.$router.push('/');
      }
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
.profil {
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
}
.avatar {
    width: 30%;
    border-radius: 100%;
}
.bg-white {
  background-color: #fff;
  border-color: rgba(231, 233, 244);
}
.formulaire_account {
   flex: 1 1 0%;
}
.formulaire {
    padding: 3.5rem;
    max-width: 30rem;
    width: auto;
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
    height: 2.5rem;
    width: auto;
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
.button, .buttonOption {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    font-family: 'Barlow', sans-serif;
    border-radius: 2rem;
    border: solid 0.15rem #fd2d01;
    background-color: #fd2d01;
    margin-top: 1rem;
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 0.5rem;
    width: 45%;
    color:#fff;
}
a {
    text-decoration: none;
    color:#fff;
    font-size : 1rem;
}
a:hover {
    color: #fd2d01;
}
.button:hover, .buttonOption:hover {
    background-color: #fff;
    border: solid 0.15rem #fd2d01;
    color: #fd2d01;
    cursor: pointer;
    font-weight: bold;
}

</style>