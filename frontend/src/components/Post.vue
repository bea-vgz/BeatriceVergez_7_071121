<template>
  <div class="container">
    <Header />
      <div
        class="row border-secondary text-justify"
      >
        <div class="col">
          <div class="card-body">
            <div class="userInfosPost">           
              <img :src="post.photoProfil" alt="Photo de profil de l'user" class="postUserPhoto">
              <h3 class="font postUsername" alt="Pseudo de l'user">{{ post.username }}</h3>
            </div>
            <div class="card-text">
              <p>{{ getDateWithoutTime(post.createdAt) }}</p>
              <h2> {{ post.title }} </h2>
              <p> {{ post.content }}</p>
            </div>
            <div class="img_container">
                <img :src="`${post.image}`" alt="image" class="img">
            </div>
        
            
            <div class="line"></div>
            <div class="footer d-flex justify-content-around">
                <button class="react-btn footer-btn btn-block" aria-label="Liker ou disliker" >
                    <svg v-if="likesPost" style="width:24px;height:24px" viewBox="0 0 24 24" >
                        <path fill="rgb(32, 120, 244)"
                        d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
                        />
                    </svg>
                    <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"
                        />
                    </svg>
                    <span class="aime">J'aime</span>
                </button>
                <button class="react-btn footer-btn btn-block" aria-label="Commenter" >
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z"
                        />
                    </svg>
                    <span class="comment">Commenter</span>
                </button>
            </div>
            <div class="line mb-3"></div>
          </div>
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import PostService from "../service/post.resource"
export default {
  data() {
    return {
      post: [],
      user: [],
      userId: "",
    };
  },
  components: { Header, Footer },
  mounted() {
    this.getOnePost();
  },
  methods: {
    getDateWithoutTime(date) {
      return require("moment")(date).format("HH:mm YYYY-MM-DD ");
    },
    getOnePost() {
      const postId = this.$route.params.id;
      PostService.getOnePost(postId)
        .then((res) => {
          this.post = res.data;
      })
    }
  }
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
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    margin-top: 3rem;
    padding: 2rem;
}
img{
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
svg {
    padding-right: 0.5rem;
}
.blue {
  color: rgb(32, 120, 244);
}
</style>