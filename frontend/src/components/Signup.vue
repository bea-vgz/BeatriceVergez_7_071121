<template>

<div id="signupUser">

    <section class="container_intro">

      <div class="identity">
        <img src="../assets/groupomania_logo.png" alt="Groupomania"/>
        <h1>Bienvenue sur votre réseau social !</h1>
        <p>- Inscrivez-vous et échangez avec vos collègues 🤓 🖥️ -</p>
      </div>

    </section>

    <form class="formulaire">
        <h2>S'inscrire</h2>

        <input type="text" id="userName" v-model="username" placeholder="Pseudo">
        <label for="userName"> </label>

        <input type="text" id="email" v-model="email" autocomplete="email" placeholder="xxx@groupomania.com">
        <label for="email"> </label>

        <input type="password" id="password" v-model="password" autocomplete="current-password" placeholder="Mot de passe">
        <label for="password"> </label>

        <input type="bio" id="bio" v-model="biographie" placeholder="Quelques mots sur vous : âge, message, poste...">
        <label for="bio"> </label>

        <button class="buttonInsc" @click.prevent="">
            S'inscrire
        </button>

        <button class="buttonCompte" @click.prevent="">
            Déjà un compte ?
        </button>
    </form>
    
</div>
</template>

<script>
export default {
    name: 'SignupUser',
    components: {
    },
    data () {
        return {
            username: '',
            email: '',
            password: '',
            bio: '',
        }
    }
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
    padding-bottom: 132px;
    padding-top: 100px;
}
h1{
    font-size: 2rem;
    font-weight: 600;
    margin-top : -0.5rem;
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
.buttonInsc {
    font-family: 'Barlow', sans-serif;
    padding: 0.8rem;
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
}
.buttonCompte:hover {
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer
}
</style>