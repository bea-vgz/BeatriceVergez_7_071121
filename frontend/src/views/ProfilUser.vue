<template>
  <div class="container-profil">
    <Header />
    <div v-if="user">
    <div class="align-items-center flex-column justify-content-center">
      <div class="infoUser bg-white">
        <div class="text-center userInfo">
          <img :src="user.photoProfil" alt="Photo de profil de l'user" class="avatarProfil">
          <p><strong>Pseudo : </strong>{{user.username}}</p>
          <p><strong>Email : </strong>{{ user.email }}</p>
          <p><strong>Biographie :</strong>{{ user.bio }}</p>
          <p><strong>Identifiant :</strong> {{ user.id }}</p>
        </div>
      </div>
    </div>
    <div class="line mb-3"></div>
    <div class="posts align-items-center">
      <div class="posts" v-if="user.Posts.length > 0 ">
        <h3 class="text-center"><strong>SES POSTS</strong></h3>
        <AllPosts :userId="this.$route.params.userId" />
      </div>
      <p v-else class="text-center"><strong>Ce membre n'a encore publié aucun post 😉</strong></p>
    </div>
    <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import AllPosts from "../components/AllPosts.vue";
import AuthService from '../service/auth.resource'
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: 'ProfilUser',
  components: {
    Header,
    Footer,
    AllPosts
  },
  watch: {
    $route (to, from) {
      console.log(from, to)
      window.location.reload()
    }
  },
  data () {
    return {
      userId:'',
      user: '',
      post: '',
      posts: []
    }
  },
  async mounted () {
    this.getOneUser()
  },
  methods: {
    getOneUser() {
      AuthService.getOneUser(this.$route.params.userId)
        .then((res) => {
          this.user = res.data
        })
    },
  },
}
</script>

<style lang="scss">
.container-profil {
  background: #F2F2F2;
}
h3 {
  margin-bottom: 2rem;
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
  margin-bottom: 3rem;
}
.avatarProfil {
  width: 65px;
  height: 65px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  margin-bottom: 1rem;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  margin-top: 0.8rem;
  margin-bottom: O.8rem;
  background-color: rgba(192, 192, 192, 0.5);
}
.user-name {
  font-size: 20px;
  font-weight: bold;
}
@media screen and (min-width: 280px) and (max-width: 767px) {
  .user-name {
    font-size: 16px;
  }
  .div-user-profile-picture {
    width: 95px;
    height: 95px;
  }
  .profile-main-picture {
    height: 95px;
  }
}
</style>