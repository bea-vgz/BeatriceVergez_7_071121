<template>

<div id="loginUser">

    <section class="container_intro">

      <div class="identity">
        <img src="../assets/groupomania_logo.png" alt="Groupomania"/>
        <h1>Bienvenue sur votre réseau social !</h1>
        <p>- Inscrivez-vous et échangez avec vos collègues 🤓 🖥️ -</p>
      </div>

    </section>

    <form class="formulaire" @submit.prevent="userLogin">
        
        <h2>Se connecter</h2>

        <label for="email"> Email 📧 * : </label>
        <input type="text" id="email" v-model="email" autocomplete="email" placeholder="xxx@groupomania.com" required="required">

        <label for="password"> Mot de passe 🔒 * : </label>
        <input type="password" id="password" v-model="password" autocomplete="current-password" placeholder="Mot de passe" required="required">

        <p class="champs">Les champs indiqués par une * sont obligatoires</p>

        <button class="buttonConnect" type="submit">
            Connexion
        </button>

        <button type="submit" value="Submit" class="buttonCompte" >
            <router-link to="/" > S'inscrire </router-link>
        </button>

    </form>

</div>

</template>

<script>
export default {
    name: 'LoginUser',
    components: {
    },
    data () {
        return {
            email: '',
            password: ''
        }
    },
    props : {
    },
    methods: {
    }
}
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
    width: 100%;
    padding-bottom: 132px;
    padding-top: 100px;
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
label {
  text-align: left;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
}
.formulaire {
    font-family: 'Barlow', sans-serif;
    margin-right: 10rem;
    padding: 2rem;
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
    padding: 1rem;
    border: solid 2px #F2F2F2;
    border-radius: 1rem;
    margin: 0.3rem;
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
</style >