<template>
  <div class="search">
    <div :class="`search-bar ${visible ? '' : 'position-fixed d-none'} d-lg-block`">
      <div class="search-bar__content input-group d-flex align-items-center">
        <input
          class="search-text"
          type="text"
          v-model="search"
          placeholder="Chercher un utilisateur..."
          ref="searchInput"
          aria-label="Chercher un utilisateur"
        />
      </div>
    </div>
    <div v-if="users.length" class="users-list card border-0 position-fixed">
      <div v-for="user in users" :key="user.id">
        <a @click="$router.push(`users/${user.id}`)">
          <div class="profil-user d-flex align-items-center">
            <img :src="user.photoProfil" alt="Photo de profil de l'user" class="profil-img">
            <p>{{ user.username }}</p>
          </div></a>
      </div>
    </div>
    <button
      class="button-search search-btn-mobile"
      type="button"
      @click="triggerInput"
      aria-label="Chercher"
    >
      <font-awesome-icon icon="search"/>
    </button>
  </div>
</template>


<script>
export default {
  name:'UserSearch',
  data() {
    return {
      search: '',
      users: [],
      user:'',
      visible: false
    }
  },
  methods: {
    getAllUsers() {
      this.$store.dispatch("auth/getAllUsers")
      .then((res) => {
        this.users = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    triggerInput () {
      this.visible = true
      this.$refs.searchInput.click()
    }
  },
  watch: {
    async search(value) {
      if (value.length < 1) {
        this.users = []
        return
      }
      const res = await this.getAllUsers()
      this.users = res.users
    }
  },
}
</script>

<style lang="scss">
.search {
  display: flex;
}
.search-bar {
  top: 20px;
  left: 45px;
  z-index: 2;
  .input-group {
    flex-wrap: nowrap;
  }
  &__content {
    padding: 10px 18px;
    background-color: rgba(108, 117, 125, 0.1) !important;
    border-radius: 40px;
    border: none;
    .search-text {
      border: none;
      background: #F2F2F2;
      width: 180px;
      &:focus {
        outline: none;
      }
    }
  }
}
.button-search {
  border: none;
  background: none;
}
.button-search:hover {
  cursor: pointer;
  color: #fd2d01;
}
.users-list {
  background: white;
  width: 200px;
  padding: 1rem;
  padding-bottom: 0.2rem;
  z-index: 1;
  box-shadow: 0px 1px 5px 4px rgba(204, 204, 204, 0.2);
  transform: translateX(-60%);
  transform: translateY(30%);
}
.profil-user {
  display: flex;
  justify-content: left;
  align-items: center;
  padding-bottom: 1rem;
}
.profil-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  margin-right: 0.6rem;
}
</style>