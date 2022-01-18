<template>
  <div>
    <button
      v-b-modal="`modal-dislikes-${post.id}`"
      @click="fetchAllDislikes"
      class="like-btn d-flex align-items-center my-2 mt-lg-0 mb-lg-3 ml-2 text-left"
      aria-label="Afficher les likes"
    >
      <div
        class="svg-container d-flex justify-content-center align-items-center"
      >
        <svg style="width:17px;height:17px" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
          />
        </svg>
      </div>
    </button>
  
    <b-modal :id="`modal-dislikes-${post.id}`" :title="`Personnes n'aimant pas ce post`">
      <div v-for="dislike_post in dislikes" :key="dislike_post.id">
        <router-link
          :to="{ name: 'ProfilUser', params: { userId: dislike_post.UserId } }"
          ><div class="d-flex align-items-center">
            <div class="d-flex UserAvatar">
              <router-link :to="{ name: 'ProfilUser', params: { userId: dislike_post.UserId } }">
                <img :src="dislike_post.User.photoProfil" alt="Photo de profil de l'user" class="postUserPhoto">
              </router-link>
            </div>
            <p>{{ dislike_post.User.username }} </p>
          </div></router-link
        >
      </div>
      <div slot="modal-footer"></div>
    </b-modal>
  </div>
</template>

<script>
import DislikePostService from '../service/dislike_post.resource'
export default {
  name: 'AllDislikes',
  props: ['post'],
  data () {
    return {
      dislikes: [],
    }
  },
  mounted() {
    this.fetchAllDislikes ()
  },
  methods: {
    fetchAllDislikes () {
      const postId = this.post.id;
      DislikePostService.getAllDislikesOnePost(postId)
      .then((res) => (
        this.dislikes = res.data.allDislikes
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