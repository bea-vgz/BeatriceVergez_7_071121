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
            <h2 class="username"> Username </h2>
            <h4 class="email"> email </h4>
        </div>
        <div class="optionsProfil bg-white ">
            <button type="submit" value="Submit" class="buttonOption"> 
                <router-link to="/profil" class="nav_centrale"><font-awesome-icon icon="user"/> Mon compte</router-link>
            </button>
            <button type="submit" value="Submit" class="buttonOption">
                <router-link to="/password" class="nav_centrale">Mot de passe</router-link>
            </button>
            <button type="submit" value="Submit" class="buttonOption">
                <router-link to="/UserPosts" class="nav_centrale">Mes posts</router-link>
            </button>
            <button type="submit" value="Submit" class="buttonOption">
                <router-link to="/logout" class="nav_centrale">Me déconnecter</router-link>
            </button>
        </div>
    </aside>
    <div class= "formulaire_account">
        <form class="formulaire bg-white" @submit.prevent="update">
        <h2>Mon profil</h2>
    <!-- Username input -->
        <label for="userName"> Pseudo 👤 : </label>
        <input type="text" id="userName" v-model="username" placeholder="Pseudo" required="required">

    <!-- Password input -->
        <label for="password"> Mot de passe 🔒 : </label>
        <input type="password" id="password" v-model="password" autocomplete="current-password" placeholder="Doit contenir au moins 8 caractères, 1 maj, 1 chiffre" required="required">
        
    <!-- Bio input -->
        <label for="bio"> Biographie 💬 : </label>
        <input type="bio" id="bio" v-model="bio" placeholder="Quelques mots sur vous : âge, message, poste...">

        <button class="button" type="submit" value="Submit">
            Sauvegarder
        </button>
        </form>
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
  beforeMount() {
    this.$store.dispatch("getUserInfos"); // On veut récupérer les infos de l'user dès le chargement
  },
  computed: {
    user () {
        return this.$store.getters.user
    },
    }
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
    font-family: 'Barlow', sans-serif;
    border-radius: 2rem;
    border: solid 0.15rem #fd2d01;
    background-color: #fd2d01;
    margin-top: 1rem;
    display: block;
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
.button:hover {
    background-color: #fff;
    border: solid 0.15rem #fd2d01;
    color: #fd2d01;
    cursor: pointer;
    font-weight: bold;
}

</style>