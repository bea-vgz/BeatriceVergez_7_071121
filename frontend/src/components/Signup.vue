<template>

<div id="signupUser">

    <section class="container_intro">

      <div class="identity">
        <img src="../assets/groupomania_logo.png" alt="Groupomania"/>
        <h1>Bienvenue sur votre réseau social !</h1>
        <p>- Inscrivez-vous et échangez avec vos collègues 🤓 🖥️ -</p>
      </div>

    </section>
    <div class="card-container">

    <form class="formulaire" @submit.prevent="signup">
        <h2>S'inscrire</h2>
    <!-- Username input -->
        <label for="userName"> 👤 Pseudo * : </label>
        <input type="text" id="userName" v-model="user.username" placeholder="Pseudo" required="required">

    <!-- Email input -->
        <label for="email"> 📧  Email * : </label>
        <div class="input_email">
          <input type="text" id="email" v-model="user.email" autocomplete="email" placeholder="Votre nom" required="required" >
        </div>

    <!-- Password input -->
        <label for="password"> 🔒 Mot de passe * : </label>
        <input type="password" id="password" v-model="user.password" autocomplete="current-password" placeholder="Doit contenir au moins 8 caractères, 1 maj, 1 chiffre" required="required">
        
    <!-- Bio input -->
        <label for="bio"> 💬  Biographie : </label>
        <input type="bio" id="bio" v-model="user.bio" placeholder="Quelques mots sur vous : âge, message, poste...">

        <p class="champs">Les champs indiqués par une * sont obligatoires</p>
        
        <button class="buttonInsc" type="submit" value="Submit">
            S'inscrire
        </button>
        
        <button type="submit" value="Submit" class="buttonCompte" >
            <router-link style="text-decoration: none; color: inherit;" to="/"> Déjà un compte ? </router-link>
        </button>

    </form>
  </div>
</div>
</template>

<script>
import router from "../router";

export default {
  
    name: 'Signup',
    components: {
    },
    data () {
        return {
          user: {
            photoProfil: '',
            username: '',
            email: '',
            password: '',
            bio: '',
            isAdmin: 0
          },
        }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    methods: {
      
    signup() {
      this.$store.dispatch('signup', this.user)
      .then(data => {
        this.message = data.message;
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>
#signupUser {
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    font-family: 'Barlow', sans-serif;
    background-color: #F2F2F2;
    max-width: 100%;
    width: 100%;
    padding-bottom: 80px;
    padding-top: 80px;
}
.imgProfil {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
#photoProfil {
  text-align: center;
}
label {
  text-align: left;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
  font-size: 0.9rem;
}
h1{
    font-size: 2rem;
    font-weight: 600;
    margin-top : -0.5rem;
}
.champs {
    font-size: 0.7rem;
    color: #fd2d01;
    text-align: left;
    margin-left: 0.5rem;
}
.formulaire {
    font-family: 'Barlow', sans-serif;
    margin-right: 10rem;
    padding: 1.5rem;
    border-radius: 1rem;
    display: flex;
    width: 400px;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    box-shadow: 0 0 16px #0000002e;
}
.identity img {
    max-width: 100%;
    width: 55%;
    margin: 0;
}
input {
    font-family: 'Barlow', sans-serif;
    padding: 0.8rem;
    border: solid 2px #F2F2F2;
    border-radius: 1rem;
    margin: 0.3rem;
}
.input_email {
  text-align: left;
  width: 100%;
}
.input_email_text {
  color: rgb(141, 141, 141);
  font-size: 0.9rem;
}
.buttonInsc {
    font-family: 'Barlow', sans-serif;
    padding: 0.5rem;
    border-radius: 1rem;
    border: solid 0.15rem #fd2d01;
    background-color: #fd2d01;
    color: #fff;
    margin-top: 1rem;
    display: block;
    margin-left: 5rem;
    margin-right: 5rem;
}
.buttonInsc:hover {
    background-color: #fff;
    border: solid 0.15rem #fd2d01;
    color: #fd2d01;
    cursor: pointer;
    font-weight: bold;
}
.buttonCompte {
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
    padding: 0.5rem;
    color: #242424;
    margin: 0.5rem;
    border: none;
    background: none;
    text-decoration: none;
}
.buttonCompte:hover {
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer
}
</style>