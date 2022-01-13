<template>
  <div>
    <Header />
    <div class="text-center justify-content-center">
      <div class="d-flex align-items-center flex-column">
        <div class="UserAvatar">
          <img :src="user.photoProfil" alt="Photo de profil de l'user" class="commentUserPhoto">
        </div>
        <p class="user-name">
          {{ user.username }}
        </p>
        <p class="email">
          {{ user.email }}
        </p>
        <p class="bio">
          {{ user.bio }}
        </p>
      </div>
    </div>
    <div class="posts-user">
      {{ user.Posts }}
    </div>
    <Footer />
  </div>
</template>

<script>
import AuthService from '../service/auth.resource'
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
    }
  },
  async mounted () {
    this.getOneUser()
  },
  methods: {
    getOneUser() {
      const userId = this.$route.params.userId;
      AuthService.getOneUser(userId)
        .then((res) => {
          this.user = res.data
        })
    },
  }
}
</script>

<style lang="scss">
.div-user-profile-picture {
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
  box-shadow: 0px 1px 2px 2px rgba(204, 204, 204, 0.5);
}
.profile-main-picture {
  height: 120px;
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