<template>

<div id="signupUser">

    <section class="container_intro">

      <div class="identity">
        <img src="../assets/groupomania_logo.png" alt="Groupomania"/>
        <h1>Bienvenue sur votre réseau social !</h1>
        <p>- Inscrivez-vous et échangez avec vos collègues 🤓 🖥️ -</p>
      </div>

    </section>

    <form class="formulaire" @submit.prevent="createUser">
        <h2>S'inscrire</h2>

    <!-- photoProfil -->
      <div id="preview"> <img v-if="photoProfil" :src="photoProfil" /> </div>
      <label> Avatar 🤳 :</label>
      <input type="file" ref="file" @change="selectFile" />

    <!-- Username input -->
        <label for="userName"> Pseudo 👤 : </label>
        <input type="text" id="userName" v-model="username" placeholder="Pseudo">

    <!-- Email input -->
        <label for="email"> Email 📧 : </label>
        <input type="text" id="email" v-model="email" autocomplete="email" placeholder="xxx@groupomania.com">

    <!-- Password input -->
        <label for="password"> Mot de passe 🔒 : </label>
        <input type="password" id="password" v-model="password" autocomplete="current-password" placeholder="Doit contenir au moins 8 caractères, 1 maj, 1 chiffre">

    <!-- Bio input -->
        <label for="bio"> Biographie 💬 : </label>
        <input type="bio" id="bio" v-model="bio" placeholder="Quelques mots sur vous : âge, message, poste...">
        

        <button class="buttonInsc" type="submit" value="Submit">
            S'inscrire
        </button>
        
        <button type="submit" value="Submit" class="buttonCompte" >
            <router-link to="/login" > Déjà un compte ?</router-link>
        </button>
    </form>
</div>
</template>

<script>
import UserServices from "../services/Users"
export default {
  
    name: 'Signup',
    components: {
    },
    data () {
        return {
            photoProfil: '',
            username: '',
            email: '',
            password: '',
            bio: '',
            isAdmin: false
          }
    },
    methods: {
      selectFile() {
        this.photoProfil = URL.createObjectURL(this.photoProfil);
      },

    async createUser() {
      try {
        const response = await UserServices.signup({
          photoProfil: null,
          username: this.username,
          email: this.email,
          password: this.password,
          bio: this.bio,
          isAdmin: null
        });
        this.message = response.data.message;
        this.$router.push('')
      } catch (error) {
        this.messageError = error.response.data.error;
      }
    },
  },
}
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
label {
  text-align: left;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
}
h1{
    font-size: 2rem;
    font-weight: 600;
    margin-top : -0.5rem;
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
.buttonInsc {
    font-family: 'Barlow', sans-serif;
    padding: 0.5rem;
    border-radius: 1rem;
    border: solid 0.15rem #fd2d01;
    background-color: #fd2d01;
    color: #fff;
    margin-top: 1rem;
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
    padding: 0.5rem;
    color: #fd2d01;
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