<template>
  <div id="PostFormulaire">
    <form class="container_post bg-white">
      <router-link to="/profil" class="container_user bg-white">
          <img v-if="currentUser.photoProfil == null" class="avatar" alt="Avatar" src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"/>
          <img v-else class="avatar" alt="Avatar" :src="currentUser.photoProfil" />
      </router-link>
        <div class="textarea_form">
          <textarea
            :value="value"
            @input="updateValue"
            id="title"
            placeholder="Titre du post"
            aria-label="Écrire un titre"
            class="text-dark"
          ></textarea>
          <textarea
            :value="value"
            @input="updateValue"
            id="content"
            :placeholder="`Quoi de beau, ${currentUser.username} ?`"
            aria-label="Écrire une publication"
            class="text-dark"
          ></textarea>
        </div>
      <div id="preview" class="d-flex justify-content-center align-items-center" >
        <img class="mt-3" v-if="url" :src="url" alt="" />
      </div>
      <div class="line"></div>
      <div>
        <button
          class="d-flex align-items-center justify-content-center button btn-block"
          @click="triggerInput"
          type="button"
          aria-label="Choisir un fichier"
        >
          <span class="mr-2 d-none d-md-block">
            <font-awesome-icon icon="image" class="icon ml-5 mr-2"/>
            Choisir un fichier
          </span>
        </button>
        <input
          ref="fileInput"
          class="d-none"
          type="file"
          @change="onFileSelected"
        />
        <button
          class="d-flex align-items-center justify-content-center button"
          :disabled="emptyField"
          type="submit"
          aria-label="Publier"
        >
          <span class="mr-2 d-none d-md-block">
            <font-awesome-icon icon="file-import" class="icon ml-5 mr-2"/>
            Publier
          </span>
        </button>
      </div>
    </form>

  <router-view />
  </div>
</template>

<script>

export default {
  name: 'PostFormulaire',
  props: ['value', 'image', 'onFormSubmit', 'isCreating'],
  data () {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      url: this.image
    }
  },
  watch: {
    onFormSubmit () {
      this.url = null
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    },
    
    onFileSelected (event) {
      this.url = URL.createObjectURL(event.target.files[0])
      this.$emit('onFileSelected', event.target.files[0])
    },
    updateValue (value) {
      this.$emit('input', value)
    },
    triggerInput () {
      this.$refs.fileInput.click()
    }
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
  color: #747474;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
}
textarea {
  border: solid 1px #F2F2F2;
  background: #F2F2F2;
  width: 50%;
  margin-bottom: 1rem;
}
.textearea_form {
  display:flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
}
.icon {
  padding-right: 0.5rem;
  color: #9e9e9e
}

</style>
