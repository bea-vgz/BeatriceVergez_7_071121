<template>
  <div class="search" v-if = "this.loading == false">
    <div class="corps">
      <div class="noResults" v-if = "users.length == 0">
        <p>Désolé, votre recherche n'a pas aboutie.</p>
      </div>
      <div class="case" v-for="user in users" :key="user">
        <img class="imgProfil" :src="user.photoProfil" alt="">
        <router-link :to="'/user/' + user.id"><p class="identiteUserSearch">{{ user.username }}</p></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserServices from '../services/user.resource'
export default {
  name:'UserSearch',
  data() {
    return {
      loading: true,
      users: null,
    }
  },
  watch: { 
    $route(to, from) {
      // react to route changes...
      if(to !== from){
        location.reload();
      }
    }
  },
  mounted(){ // Envoie une requete GET pour obtenir l'utilisateur renseigné dans l'URL
    UserServices.getAllUsers( this.$route.params.id + '/search')
      .then(response => {
        this.users = response.data;
        this.loading = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style scoped>
.noResults{
  width: 50%;
  margin: auto;
  color: white;
  text-align: center;
}
.noResults p{
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
}
.case{
  padding: 10px;
  width: 50%;
  margin-bottom: 10px;
}
.imgProfil{
  width: 60px;
  height: 60px;
  border: solid 3px white;
  border-radius: 100px;
  vertical-align:middle;
}
.identiteUserSearch{
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  color: white;
  margin-left: 10%;
}
</style>