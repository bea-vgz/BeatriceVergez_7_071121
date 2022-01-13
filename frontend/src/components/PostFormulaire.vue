<template>
  <div id="PostFormulaire">
    <form class="container_post bg-white" @submit.prevent="createPost">
      <router-link to="/profil" v-if="currentUser" class="container_user bg-white">
          <img v-if="currentUser" :src="currentUser.photoProfil"  class="avatar" alt="Avatar" ref="file" />
          <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"  class="avatar" alt="Avatar" ref="file" />
      </router-link>
      <div class="textarea_form">
        <input
          v-model="post.title"
          id="title"
          placeholder="Ajoutez un titre"
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
      <div id="preview" class="d-flex justify-content-center align-items-center" >
        <img class="mt-3" v-show="showPreview" v-if="file" v-bind:src="imagePreview" alt="" />
      </div>
      <div class="file">
        <label class="sr-only" for="image" title="image" role="button">image</label>
        <input class='buttonFile' type="file" accept="image/png, image/jpeg, image/gif" @change="onSelect" ref="file" aria-required="true" id="image" />
      </div>
      <div>
        <button
          class="button"
          type="submit"
          aria-label="Publier"
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
import { mapActions } from 'vuex'
export default {
  name: 'PostFormulaire',
  data () {
    return {  
      post: new Post("", ""),
      file: "",
      image:"",
      showPreview: false,
      imagePreview: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    ...mapActions(['displayNotification']),

    onSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
      const reader  = new FileReader()
      reader.addEventListener("load", function () {
        this.showPreview = true;
        this.imagePreview = reader.result
      }.bind(this), false)
      reader.readAsDataURL( this.file );
    },

    createPost: function(event) {
      const post = new FormData();
      if (typeof this.file === 'object') {
        post.append('image', this.file, this.file.name);
      }
      post.append('title', this.post.title);
      post.append('content', this.post.content);
      this.$store.dispatch("post/createPost", post)
        .then(() => {
          this.displayNotification('Post créé !')
        });
      event.target.reset();
    },
  },


}
</script>

<style scoped>

#PostFormulaire {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #fff;
  border-radius: 2rem;
  max-width: 100%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  padding: 2rem
}
.avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
  margin-bottom: 1.5rem;
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
