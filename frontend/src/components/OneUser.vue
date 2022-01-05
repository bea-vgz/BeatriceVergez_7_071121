<template>
  <div class="container">
    <Header />
    <div class="container_post" v-if="user">
      <div class="row border-secondary text-justify">
        <div class="col">
          <div class="card-body">
            <div class="card-text">
                <div class="UserAvatar">
                    <img :src="user.photoProfil" alt="Photo de profil de l'user" class="img">
                    <div class="infoPostUser">
                        <h2 class="userUsername" alt="Pseudo de l'user">{{ user.username }}</h2>
                        <p class="date">Membre depuis le : {{ getDateWithoutTime(user.createdAt) }}</p>
                    </div>
                </div>
                <p class="contentUser"><strong>Email : </strong>{{ user.email }}</p>
                <p class="contentUser"><strong>Biographie : </strong> {{ user.bio }}</p>
                <p class="contentUser"><strong>Identifiant : </strong> {{ user.id }}</p>
            </div>
            <div class="line mb-3"></div>
            <div class="card-post" v-if="user.Posts">
                <h3> Ses posts : </h3>
                <AllPosts :userId="this.$route.params.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AllPosts from "../components/AllPosts.vue"
import AuthService from "../service/auth.resource";
export default {
  name:'OneUser',
  data() {
    return {
      user: {},
      users: [],
    };
  },
  components: { 
    Header, 
    Footer,
    AllPosts
  },
  mounted() {
    this.getOneUser();
  },
  methods: {
    getOneUser() {
      const userId = this.$route.params.id;
      AuthService.getOneUser(userId)
        .then((res) => {
          this.user = res.data
          console.log(this.user)
        })
    },
    getDateWithoutTime(createdAt) {
      return require("moment")(createdAt).format("YYYY-MM-DD HH:mm");
    },
  }
};
</script>
<style scoped>
.sub-menu {
  cursor: pointer;
}
.menu-item {
  color:#242424;
}
.card-body {
    padding: 3.5rem;
    max-width: 100%;
    border-radius: 1.25rem;
    box-shadow: 0 0 6px #0000002e;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    margin-top: 3rem;
    padding: 2rem;
}
.img {
    max-width: 100%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
}
button {
    justify-content: center;
    flex-wrap: nowrap;
    background: none;
    border: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
button:hover {
    background: #F2F2F2;
    cursor: pointer;
}
.UserAvatar {
  display: flex;
  align-items: center;
}
.infoPostUser {
  padding-left: 1.5rem;
}
.line {
    display: block;
    width: 100%;
    height: 1px;
    margin-top: 0.8rem;
    margin-bottom: O.8rem;
    background-color: rgba(192, 192, 192, 0.5);
}
svg {
    padding-right: 0.5rem;
}
.blue {
  color: rgb(32, 120, 244);
}
.container_button {
  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
}
.ellipsis:after {
 font-size: 4em;
 color: #2e2e2e;
}
.accessUser {
  float: right;
}
.accessUser:hover {
  background: none;
  color: #fd2d01
}
.UserAvatar {
  display: flex;
  align-items: center;
}
.infoPostUser {
  padding-left: 1.5rem;
}
.postUserPhoto {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}
a:hover {
  color:#fd2d01;
}
.contentPost {
  margin-top: -1rem;
  margin-bottom: 1rem
}
.date {
  font-size: 0.8rem;
  font-style: italic;
  color: #797979;
}
.contentUser {
    padding-bottom: 0.5rem;
}
</style>