<template>
  <div id="PostFormulaire">
    <form class="container_post bg-white">
      <router-link to="/profil" class="container_user bg-white">
          <img v-if="currentUser.photoProfil == null" class="avatar" alt="Avatar" src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"/>
          <img v-else class="avatar" alt="Avatar" :src="currentUser.photoProfil" />
      </router-link>
      <div class="textarea_form">
        <input
          v-model="post.title"
          id="title"
          placeholder="Titre du post"
          aria-label="Écrire un titre"
          class="input"
        />
        <input
          v-model="post.content"
          id="content"
          :placeholder="`Quoi de beau, ${currentUser.username} ?`"
          aria-label="Écrire une publication"
          class="input"
        />
      </div>
      <div class="file">
        <label class="sr-only" for="image" title="image" name="filename" role="button">image</label>
        <input class='buttonFile' type="file" accept=".png, .jpg, .jpeg, .gif, .webp" @change="onSelect" ref="file" aria-required="true" id="image" name="filename" />
      </div>
      <div>
        <button
          class="button"
          type="submit"
          aria-label="Publier"
          @click="createPost()"
        > <font-awesome-icon icon="file-import" class="icon"/>
            Publier
        </button>
      </div>
    </form>

  <router-view />
  </div>
</template>

<script>
import Post from '../models/post'
export default {
  name: 'PostFormulaire',
  data () {
    return {  
      post: new Post("", ""),
      file: "",
      image:"",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },

    createPost() {
      let post;
        post = new FormData();
        post.append('image', this.file, this.filename);
        post.append('title', this.post.title);
        post.append('content', this.post.content);
        this.$store.dispatch("post/createPost", post)
          .then(() => {
            console.log('post')
            window.alert("Création du post réussi !")
          })
    },
},
}
</script>

<style scoped>

.container_post {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #fff;
  border-radius: 2rem;
  max-width: 100%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem
}
.avatar {
  width: 12%;
  border-radius: 100%;
  margin-bottom: 1rem;
}
#preview img {
  max-width: 100%;
  max-height: 500px;
}
.disabled {
  cursor: not-allowed;
}
.form-control {
  border: 1px solid #ccc;
}
.form-control:focus {
    border: none;
}
.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
.button {
  background: white;
  color: #fd2d01;
  border: none;
  border-radius: 0.25rem;
  margin-top: 2rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}
.input {
  border: solid 1px #F2F2F2;
  background: #F2F2F2;
  width: 60%;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
}
.textearea_form {
  display:flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}
.icon {
  padding-right: 0.5rem;
}
.button:hover {
  background: #fd2d01;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 2rem;
}

</style>
