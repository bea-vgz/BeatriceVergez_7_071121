<template>
  <div class="mx-auto border-0 shadow p-0 p-lg-3 mb-2 mt-2 mb-lg-5 mt-lg-3 bg-white rounded">
    <article>
      <div class="d-flex align-items-center">
        <div class="d-flex mr-3">
          <router-link to="" class="container_user bg-white">
            <img v-if="user.photoProfil" :src="post.user.photoPorfil"  class="avatar" alt="Avatar" ref="file" />
            <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"  class="avatar" alt="Avatar" ref="file" />
          </router-link>
        </div>
        <div class="text-left">
          <router-link to="/profil">
          <p class="font-weight-bold mb-0">
              {{ post.username }}
            </p></router-link
          >
          <p class="text-secondary">
            {{ getDateWithoutTime(post.createdAt) }}
          </p>
        </div>
      </div>

      <b-card-text class="text-left mt-3 mb-0 mb-lg-3" v-if="post.title">
        {{ post.title }}
      </b-card-text>
      <b-card-text class="text-left mt-3 mb-0 mb-lg-3" v-if="posts.content">
        {{ posts.content }}
      </b-card-text>

      <div
        class="post d-flex align-items-center justify-content-center my-1 mb-lg-4"
        v-if="post.image"
      >
        <img
          v-b-modal="`modal-photo-${post.id}`"
          class="post__image"
          :src="post.image"
          alt=""
        />
      </div>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
      user: {}
    }
  },
  computed: {
    post() {
      return this.$store.state.post.post;
    },
  },
  methods: {
    getDateWithoutTime(date) {
      return require("moment")(date).format("HH:mm YYYY-MM-DD ");
    },
  }
}
</script>

<style lang="scss">
.div-post-picture {
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
}
.post-profile-picture {
  height: 50px;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  .div-post-picture {
    width: 42px;
    height: 42px;
  }
  .post-profile-picture {
    height: 42px;
  }
}
.btn-block + .btn-block {
  margin-top: 0px;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgba(192, 192, 192, 0.5);
}
.blue {
  color: rgb(32, 120, 244);
}
.react-btn {
  background: white;
  border: none;
  margin: 3px;
  color: #747474;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.375rem 0.75rem;
  &:focus {
    border: none !important;
    outline: none !important;
  }
  &:hover {
    color: #747474 !important;
    background-color: rgba(108, 117, 125, 0.1) !important;
  }
}
.like-btn {
  color: #747474;
  font-weight: normal;
  &:hover,
  &:focus,
  &:active {
    color: #747474 !important;
    font-weight: normal;
    background: none !important;
  }
}
.modal-photo {
  &__img {
    max-width: 100%;
    max-height: calc(100vh - 110px);
  }
}
.header-style {
  padding-bottom: 0;
  border-bottom: none;
}
</style>