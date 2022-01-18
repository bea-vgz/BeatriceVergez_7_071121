<template>
  <div class="container-profil">
    <Header />
     <b-row class="text-center justify-content-center">
      <div class="d-flex align-items-center flex-column">
        <div class="infoUser bg-white">
          <div class="userInfo">
            <img :src="user.photoProfil" alt="Photo de profil de l'user" class="avatarProfil">
            <p><strong>Pseudo : </strong>{{user.username}}</p>
            <p><strong>Email : </strong>{{ user.email }}</p>
            <p><strong>Biographie :</strong>{{ user.bio }}</p>
            <p><strong>Identifiant :</strong> {{ user.id }}</p>
          </div>
        <div class="line mb-3"></div>
        <p><strong>SES POSTS</strong></p>
        {{user.Posts}}      
        </div>
      </div>
    </b-row>
    <Footer />
  </div>
</template>

<script>
import AuthService from '../service/auth.resource'
import PostService from '../service/post.resource'
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: 'ProfilUser',
  components: {
    Header,
    Footer
  },
  watch: {
    $route () {
      window.location.reload()
    }
  },
  data () {
    return {
      user: {},
      posts: []
    }
  },
  async mounted () {
    this.getOneUser()
    this.getAllPostsUser();
  },
  methods: {
    getOneUser() {
      const userId = this.$route.params.userId;
      AuthService.getOneUser(userId)
        .then((res) => {
          this.user = res.data
        })
    },

    getAllPostsUser() {
      const userId = this.$route.params.userId;
      PostService.getAllPostsUser(userId)
      .then(res => {
        this.posts = res.data.posts;
      })
    }
  }
}
</script>

<style lang="scss">
.container-profil {
  background: #F2F2F2;
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
    margin-bottom: 6rem;
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