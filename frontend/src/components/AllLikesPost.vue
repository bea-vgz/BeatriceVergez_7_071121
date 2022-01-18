<template>
  <div>
    <button
      v-b-modal="`modal-likes-${post.id}`"
      @click="fetchAllLikes"
      class="like-btn d-flex align-items-center my-2 mt-lg-0 mb-lg-3 ml-2 text-left"
      aria-label="Afficher les likes"
    >
      <div
        class="svg-container d-flex justify-content-center align-items-center"
      >
        <svg style="width:17px;height:17px" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
          />
        </svg>
      </div>
    </button>
  
    <b-modal :id="`modal-likes-${post.id}`" :title="`Personnes aimant ce post`">
      <div v-for="like_post in likes" :key="like_post.id">
        <router-link
          :to="{ name: 'ProfilUser', params: { userId: like_post.UserId } }"
          ><div class="d-flex align-items-center">
            <div class="d-flex UserAvatar">
              <router-link :to="{ name: 'ProfilUser', params: { userId: like_post.UserId } }">
                <img :src="like_post.User.photoProfil" alt="Photo de profil de l'user" class="postUserPhoto">
              </router-link>
            </div>
            <p>{{ like_post.User.username }} </p>
          </div></router-link
        >
      </div>
      <div slot="modal-footer"></div>
    </b-modal>
  </div>
</template>

<script>
import LikePostService from '../service/like_post.resource'
export default {
  name: 'AllLikes',
  props: ['post'],
  data () {
    return {
      likes: [],
    }
  },
  mounted() {
    this.fetchAllLikes ()
  },
  methods: {
    fetchAllLikes () {
      const postId = this.post.id;
      LikePostService.getAllLikesOnePost(postId)
      .then((res) => (
        this.likes = res.data.allLikes
      ))
    }
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #212529;
  &:hover,
  &:visited {
    color: #212529;
    text-decoration: underline;
    font-weight:600;
  }
}
.like-btn {
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
}
.modal-body {
  padding: 1rem 1rem 0 1rem;
}
.modal-title {
  color: #747474;
  font-size: 16px;
}
.modal-content {
  border: none;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
}
.modal-backdrop {
  background-color: rgba(69, 76, 82, 0.2);
}
.modal-footer {
  padding: 0;
  border-top: none;
}
.likes-number {
  font-size: 14px;
}
.UserAvatar {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
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
.svg-container {
  border-radius: 100%;
  background-color: rgb(32, 120, 244);
  width: 25px;
  height: 25px;
}
@media screen and (min-width: 280px) and (max-width: 767px) {
  .modal-title {
    font-size: 14px;
  }
  .likes-number {
    font-size: 12px;
  }
}
.svg-container {
  border-radius: 100%;
  background-color: rgb(32, 120, 244);
  width: 25px;
  height: 25px;
}
.div-like-picture {
  width: 30px;
  height: 30px;
  margin-bottom: 1rem;
  margin-right: 0.7rem;
}
.like-profile-picture {
  height: 30px;
}
</style>