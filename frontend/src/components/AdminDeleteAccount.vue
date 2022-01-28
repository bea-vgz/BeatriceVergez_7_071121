<template>
  <div class="option justify-content-center">
    <a @click="deleteUser" class="delete_user underline"><b-icon icon="trash-fill" class="mr-2 mr-lg-3 delete_icon"></b-icon>Supprimer ce compte utilisateur</a>
    <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
  </div>
</template>

<script>
import router from "../router";
import ConfirmDialogue from '@/components/ConfirmDialogue.vue';
export default {
  name: 'UserDeleteAccount',
  components: {
    ConfirmDialogue
  },
  props: ['user'],
  methods: {
    async deleteUser() {
      const ok = await this.$refs.confirmDialogue.show({
        title: 'Supprimer ce compte',
        message: 'Êtes-vous sur de vouloir supprimer ce compte ?',
        okButton: 'Supprimer ce compte',
      })
      if (ok) {
        this.$store.dispatch("auth/deleteUser", this.user.id)
        .then(data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
        alert('Ce compte a été supprimé !')
        router.push('/signup');
      } else {
        alert("Ce compte n'a pas été supprimé")
      }
    },
  }
}
</script>

<style scoped>
.underline{
  position: relative;
}
.underline::before{
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: #fd2d01;
  transition: 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.delete_user {
  color: #fd2d01
}
.option {
  display: flex;
  text-align: center;
  font-family: 'Barlow', sans-serif;
  font-size: 15px;
  padding: 0.5rem;
  width: 100%;
}
a{
    text-decoration: none;
    color:#242424;
    font-size : 1rem;
    font-weight: bold;
    cursor: pointer;
}
a:hover{
    color: #fd2d01;
    cursor: pointer;
    text-decoration: none;
}
.icon {
  padding-right: 0.7rem;
  color: #9e9e9e
}
@media (hover: hover) and (pointer: fine) {
  .underline:hover::before{
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>