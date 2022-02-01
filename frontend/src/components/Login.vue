<template>

<div id="loginUser">

    <section class="container_intro">

      <div class="identity">
        <img src="../assets/groupomania_logo.png" alt="Groupomania"/>
        <h1>Bienvenue sur votre réseau social !</h1>
        <p>- Connectez-vous et échangez avec vos collègues 🤓 🖥️ -</p>
      </div>

    </section>

    <form class="formulaire" @submit.prevent="login">
        
        <h2>Se connecter</h2>
    
    <!-- Email input -->
        <label for="email">  📧  Email * : </label>
        <input type="text" id="email" v-model="user.email" autocomplete="email" placeholder="xxxx@groupomania.com" required="required" >

    <!-- Password input -->
        <label for="password"> 🔒  Mot de passe * : 
          <button type="button" class="buttonEyes" @click="show = !show" >
            <font-awesome-icon icon="eye" alt="mot de passe visible" class="eyes" v-show="show" />
            <font-awesome-icon icon="eye-slash" alt="mot de passe invisible" class="eyes" v-show="!show" />
          </button>
        </label>
        <input id="password" name="password" v-model="user.password" placeholder="Mot de passe" required="required" :type="show ? 'text' : 'password'"/>
        
        <p class="champs">Les champs indiqués par une * sont obligatoires</p>

        <button type="submit" class="buttonConnect" aria-label="se connecter" @click="login()" >
          <router-link to="/home" style="text-decoration: none; color: inherit;"> Connexion </router-link>
        </button>

        <button type="submit" value="Submit" class="buttonCompte" >
            <router-link style="text-decoration: none; color: inherit;" to="/signup"> Pas encore de compte ? Je m'inscris </router-link>
        </button>

    </form>

</div>

</template>

<script>
import router from "../router";
import User from '../models/user'

export default {
  name: 'Login',
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  data() {
    return {
      user: new User('', ''),
      show: false
    }
  },
  methods: {
    login () {
      if (this.user.email && this.user.password) {
        this.$store.dispatch('auth/login', this.user)
        .then(() => {
          router.push('/home');
        },
        error => {
          console.log(error);
        }
        );
      }
    }
  }
};
</script>

<style scoped>

#loginUser {
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    font-family: 'Barlow', sans-serif;
    background-color: #F2F2F2;
    max-width: 100%;
    padding-bottom: 132px;
    padding-top: 100px;
}
h1{
    font-size: 2rem;
    font-weight: 600;
    margin-top : -0.5rem;
}
h2 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-top : 1rem;
    margin-bottom: 1rem
}
.champs {
    font-size: 0.7rem;
    color: #fd2d01;
    text-align: left;
    margin-left: 0.5rem;
}
label {
  text-align: left;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
}
.formulaire {
    font-family: 'Barlow', sans-serif;
    margin-right: 7rem;
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    max-width: 100%;
    width: 40%;
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
    padding: 1rem;
    border: solid 2px #F2F2F2;
    border-radius: 1rem;
    margin: 0.3rem;
    width: auto;
}
.input_email_text {
  color: rgb(141, 141, 141);
  font-size: 0.9rem;
}
.buttonConnect {
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
.buttonConnect:hover {
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
.buttonEyes {
  border: none;
  cursor: pointer;
  color: #fd2d01;
  padding: 0.3rem;
  border-radius: 100%;
  margin-left: 0.7rem;
  background: none
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  #loginUser {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding-top: 33px;
  }
  .container_intro {
    margin-bottom: 3rem;
  }
  .identity {
    padding: 2rem;
  }
  .formulaire {
    margin: 0rem;
    width: 90%;
  }
  .identity img {
    width: 80%;
    margin: 0;
  }
}
</style>