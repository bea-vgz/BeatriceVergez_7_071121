<template>
  <div class="container">
    <div class="container_post" v-if="post">
      <div class="row border-secondary text-justify">
        <div class="col">
          <div class="card-body">
            <div class="UserAvatar" v-if="post.User">
              <router-link :to="{ name: 'ProfilUser', params: { userId: post.UserId } }">
                <img :src="post.User.photoProfil" alt="Photo de profil de l'user" class="postUserPhoto">
              </router-link>
              <div class="infoPostUser">
                <h3 class="font postUsername" alt="Pseudo de l'user">{{ post.User.username }}</h3>
                <p class="date">Post créé le : {{ getDateWithoutTime(post.createdAt) }}</p>
              </div>
              <div class="modifPost">
                <ModifyPost :post="post" />
              </div>
            </div>
      
            <div class="card-text">
              <h2> {{ post.title }} </h2>
              <p class="contentPost"> {{ post.content }}</p>
            </div>
            <a class="img_container" @click="$router.push(`posts/${post.id}`)">
                <img :src="`${post.image}`" alt="image" class="img">
                <span class="a-txt"><font-awesome-icon icon="eye"/> Voir le post </span>
            </a>

            <AllLikes :post="post" />

            <div class="line"></div>

            <div class="menu-post">
        <button
          @click="likeOrUnlikePost"
          class="react-btn footer-btn btn-block"
          aria-label="Liker ou disliker"
        >
          <svg
            v-if="likeThisPost"
            style="width:24px;height:24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(32, 120, 244)"
              d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
            />
          </svg>
          <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
            />
          </svg>

          <span :class="`ml-2 ${likeThisPost ? 'blue' : ''}`">J'aime</span>
        </button>
        
         <button
          class="react-btn footer-btn btn-block"
          @click="focusInput(post)"
          aria-label="Commenter"
        >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"
            />
          </svg>
          <span class="ml-2">Commenter</span>
        </button>
      </div>
      <div class="line mb-3"></div>
      <AllComments :post="post" />
      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../service/post.resource";
import AllComments from "../components/AllComments.vue";
import AllLikes from "../components/AllLikes.vue";
import ModifyPost from '../components/ModifyPost'
export default {
  data() {
    return {
      comments: [],
      comment: {},
      likeThisPost: false,
    };
  },
  props: ['post'],
  components: {
    AllComments,
    AllLikes,
    ModifyPost
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.getLikeOnOnePost();
  },
  methods: {
    getDateWithoutTime(date) {
      return require("moment")(date).format("YYYY-MM-DD HH:mm");
    },

    getLikeOnOnePost() {
      const postId = this.post.id;
      PostService.getLikeOnOnePost(postId)
      .then((res) => {
        this.likeThisPost = res.like
      })
    },

    async likeOrUnlikePost() {
      const postId = this.post.id;
      PostService.likePost(postId)
      .then((res) => {
        this.likeThisPost = res.like
      })
    },

    focusInput() {
      document.getElementById(`comment-area-${this.post.id}`).focus()
    },
  },
};
</script>
<style scoped>
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
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    margin-top: 3rem;
    padding: 2rem;
}
.img {
    max-width: 100%;
    width: 100%;
    height: 350px;
    object-fit: cover;
    object-position: center;
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
.line {
    display: block;
    width: 100%;
    height: 1px;
    margin-top: 0.8rem;
    margin-bottom: O.8rem;
    background-color: rgba(192, 192, 192, 0.5);
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
  cursor: pointer;
}
.contentPost {
  margin-top: -1rem;
  margin-bottom: 1rem
}
.date {
  font-size: 0.8rem;
  font-style: italic;
  color: #797979;
  margin-top: -1rem
}
.menu {
  display: flex;
  float: right;
  padding: 1rem;
}
.react-btn {
  background: white;
  border: none;
  margin: 3px;
  color: #747474;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.375rem 0.75rem;
}
.react-btn:focus {
  border: none !important;
  outline: none !important;
}
.react-btn:hover {
    color: #747474 !important;
    background-color: rgba(108, 117, 125, 0.1) !important;
  }
.btn-block, .btn-block {
  margin-top: 0px;
}
.menu-post {
  margin-top: 0.5rem;
}
.opacity1 div img {
	opacity: 1;
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.opacity1 div:hover img {
	opacity: .5;
}
.img_container{
  display:grid;
}
.img_container>*{
  grid-area:1/1/-1/-1; 
  /* raccourci pour grid-row et grid-column */
}
.a-txt{
  display:flex;
  justify-content:center;
  align-items:center;
  color:#000;
  background:#ffffff8f;
  opacity: 0;
  transition:opacity .8s;
  font-weight: 700;
}
.a-txt:hover{
  opacity: 1;
  cursor: pointer;
}
a{
  text-decoration: none;
}
</style>