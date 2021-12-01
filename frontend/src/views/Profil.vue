<template>
<div class="profil">
     <!-- Header -->
    <div class="header">
        <Header />
    </div>
    <aside class="account bg-white">
        <div class="contanier_presentation">
            <img class="avatar" src="../assets/default-avatar-user.jpeg">
            <h2 class="username"> username </h2>
            <h3 class="email"> email </h3>
        </div>
        <div class="optionsProfil">
            <router-link to="/profil" class="nav_centrale">Mon compte</router-link>
            <button
            type="button"
            title="Modifier votre profil"
            @click="displayModal"
          >
            <PencilIcon
              class="h-8 w-8 mr-8 text-gray-300 hover:text-gray-600"
            />
          </button>
            <router-link to="/password" class="nav_centrale">Mot de passe</router-link>
            <router-link to="/UserPosts" class="nav_centrale">Mes posts</router-link>
            <router-link to="/logout" class="nav_centrale">Me déconnecter</router-link>
        </div>
    </aside>
    <div class= "formulaire bg-white">
        <form class="formulaire" @submit.prevent="update">
        <h2>Mon profil</h2>
    <!-- Username input -->
        <label for="userName"> Pseudo 👤 * : </label>
        <input type="text" id="userName" v-model="username" placeholder="Pseudo" required="required">

    <!-- Email input -->
        <label for="email"> Email 📧  * : </label>
        <div class="input_email">
          <input type="text" id="email" v-model="email" autocomplete="email" placeholder="Votre nom" required="required" >
          <span class="input_email_text">@groupomania.com</span>
        </div>

    <!-- Password input -->
        <label for="password"> Mot de passe 🔒 * : </label>
        <input type="password" id="password" v-model="password" autocomplete="current-password" placeholder="Doit contenir au moins 8 caractères, 1 maj, 1 chiffre" required="required">
        
    <!-- Bio input -->
        <label for="bio"> Biographie 💬 : </label>
        <input type="bio" id="bio" v-model="bio" placeholder="Quelques mots sur vous : âge, message, poste...">

        <p class="champs">Les champs indiqués par une * sont obligatoires</p>

        <button class="buttonSave" type="submit" value="Submit">
            Sauvegarder
        </button>
        </form>
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
    user () {
        return this.$store.getters.user
    },
    }
}
</script>