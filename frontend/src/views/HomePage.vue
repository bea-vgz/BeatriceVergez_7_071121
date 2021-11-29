<template>
  <div class="HomePage">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link><span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
    </div>
    <div>
      <p class="text-center">
        Il n'y a encore aucune publications.<br />
        Publiez un post : cliquez ici ;)
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomePage',
  components: {
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
  methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
}
</script>