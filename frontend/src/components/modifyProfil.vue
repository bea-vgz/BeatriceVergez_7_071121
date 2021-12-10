<template>
  <transition name="modal-fade">
    <div class="fixed bottom-0 inset-x-0 flex" @click.stop>
    <div class="fixed inset-0 transition-opacity">
    <form @submit.prevent="updateUser" class="modifyProfil">
        <div class="bg-primary"></div>
        <label class="img" for="selectImage">
            <img v-if="image || currentUser.photoProfil" :src="image || currentUser.photoProfil" alt="Avatar">
            <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png" alt="Avatar">
            <div class="indication"><font-awesome-icon icon="pencil-alt"/></div>
            <input ref="file" type="file" id="selectImage" @change="onFileChange">
        </label>
        <div class="inputs">
            <div class="row">
                <div class="group">
                    <label for="username">Pseudo</label>
                    <input v-model="currentUser.username" type="text" id="username" @input="validateInput">
                    <font-awesome-icon v-if="username === true" icon="check-circle"/>
                    <font-awesome-icon v-else-if="username === false" icon="check-circle"/>
                </div>
                <div class="group">
                    <label for="bio">Biographie</label>
                    <input v-model="currentUser.bio" type="text" id="bio" @input="validateInput">
                    <font-awesome-icon v-if="bio === true" icon="check-circle"/>
                    <font-awesome-icon v-else-if="bio === false" icon="check-circle"/>
                </div>
            </div>
            <div class="row">
                <div class="group">
                    <button :disabled="disabledButton">Enregistrer les modifications</button>
                </div>
            </div>
        </div>
    </form>
    
    <div>
      <button type="button" aria-label="fermer" @click="close" class="button_close" >
        <font-awesome-icon icon="times-circle"/>
      </button>
    </div>

    </div>
    </div>
  </transition>
</template>

<script>

import AuthService from "../service/auth.resource";
export default {
  name: "modifyProfil",
  data() {
        return {
            user:'',
            image: '',
            username: "",
            bio: "",
            disabledButton: true,
        }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    updateUser() {
      if(this.validateInput()) {
        let user;
        delete this.currentUser.photoProfil;
        if(this.currentUser.photoProfil && this.currentUser.photoProfil != "") {
          const user = new FormData();
          user.append('username', this.currentUser.username);
          user.append('bio', this.currentUser.bio);
          user.append('image', this.currentUser.photoProfil);
        }
        else {
          user = {
            username: this.currentUser.username,
            bio: this.currentUser.bio
          };
        }
        AuthService.modifyUser(user, this.currentUser)
          .then((response)=> {
            localStorage.setItem('user', JSON.stringify(response))
            this.currentUser = response.data
            window.location.reload();
          })
        }
      },

      onFileChange() {
        this.currentUser.photoProfil = this.$refs.file.files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
        this.currentUser.photoProfil = e.target.result;
        };
        reader.readAsDataURL(this.currentUser.photoProfil);
        this.validateInput();
      },

      validateInput() {
        if(this.currentUser.username != '') {
          this.username = true;
        }
        else {
          this.username = "";
        }
        if(this.currentUser.bio != '') {
          this.bio = true;
        }
        else {
          this.bio = "";
        }
        if(this.username && this.bio) {
          this.disabledButton = false;
          return true;
        }
        else {
          this.disabledButton = true;
          return false;
        }
      },
      close() {
        this.$emit("close");
    },
  }
}
</script>

<style>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.modifyProfil {
    box-shadow: 0 0 10px -5px rgb(0 0 0 / 30%);
    border-radius: 10px;
    overflow: hidden;
}

.modifyProfil .bg-primary {
    height: 150px;
    width: 100%;
}

.modifyProfil .img {
    display: block;
    margin: -125px auto 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
}

.modifyProfil .img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modifyProfil .img input {
    display: none;
}

.modifyProfil .img .indication {
    position: absolute;
    bottom: -70px;
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
    font-size: 20px;
    transition: .4s ease;
}

.modifyProfil .img:hover .indication {
    bottom: 0;
}

.modifyProfil .inputs {
    padding: 20px;
}

.modifyProfil .inputs .group {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
}

.modifyProfil .inputs .group:not(:last-child) {
    margin-right: 10px;
}

.modifyProfil .inputs .row:not(:last-child) {
    margin-bottom: 20px;
}

.modifyProfil .inputs .group label {
    font-size: 13px;
}

.modifyProfil .inputs .group input {
    font-size: 13.3333px;
    border: none;
    outline: none;
    background-color: #F8F8F8;
    border-radius: 5px;
    padding: 10px 30px 10px 10px;
}

.modifyProfil .inputs .group i {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.modifyProfil .inputs .group i.fa-check-circle {
    color: green;
}

.modifyProfil .inputs .group i.fa-times-circle {
    color: red;
}

.modifyProfil .inputs button {
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #FD2D01;
    color: #fff;
    padding: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: .3s ease;
}

.modifyProfil .inputs button:disabled {
    opacity: .4;
    cursor: default;
}

.modifyProfil .inputs button:not(:disabled):hover {
    background-color: #e42801;
}
</style>