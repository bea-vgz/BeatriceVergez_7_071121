<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Chargement...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div class="col" v-if="`${post}`">
      <h4 class="card-text"
        v-if="`${post.content}`">
        {{ checkUserExist(post) }} a publié le {{ getDateWithoutTime(date) }}:
      </h4>
      <h3 class="card-text" v-if="`${post.title}`">
        {{ post.title }}
      </h3>
      <h4 class="card-text" v-if="`${post.content}`">
        {{ post.content }}
      </h4>
      <div v-if="`${post.image}`">
        <img
          :src="`${post.image}`"
          alt="image"
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      error: null,
      post: {},
      user:'',
      username: '',
      file: '',
      image:'',
    }
  },
  mounted() {
		this.getPost();
	},
  computed: {
    ...mapGetters(['post'])
  },
  methods: {
    getDateWithoutTime(date) {
      return require("moment")(date).format("HH:mm YYYY-MM-DD ");
    },
    getPost() {
      this.$store.dispatch("post/getOnePost")
      .then((res) => {
        this.post = res.data
        this.username = this.checkUserExist(res.data)
      })
    },
     checkUserExist(user) {
      if (user != null) {
        return user.username && user.photoProfil
      } else return this.accountDeleted
    }
  }
}
</script>