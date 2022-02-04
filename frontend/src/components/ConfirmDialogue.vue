<template>
    <div v-if="reveal" class="modal-box confirm-box" @click="closeConfirm">
        <div class="modal-content">
            <header class="title">
                <h2>{{ title ? title : "Êtes-vous sûr ?" }}</h2>
                <i class="fas fa-times" @click="closeConfirm"></i>
            </header>
            <main>
                <p>{{ message ? message : "Cette action est irréversible." }}</p>
            </main>
            <footer>
                <a aria-role="button" class="cancel" @click="closeConfirm">Annuler</a>
                <a aria-role="button" class="confirm" @click="confirm">Confirmer</a>
            </footer>
        </div>
    </div>
</template>

<script>
import router from "../router";
import { mapActions } from 'vuex'
export default {
    name: "Confirm",
    props: [
        'reveal',
        'title',
        'message',
        'action',
        'post',
        'userId'
    ],
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
        ...mapActions(['displayNotification']),

        closeConfirm(event) {
            this.$emit('closeConfirm', event);
        },
        confirm() {
            let payload = this.$store.state.auth.user.userId
            this.$store.dispatch("auth/deleteUser",payload)
            .then(data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });
        this.displayNotification('Compte supprimé avec succès!')
        router.push('/signup');
      }
    }
}
</script>
<style scoped>
.modal-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    padding: 30px;
    z-index: 99;
}

.modal-box .modal-content {
    background: #fff;
    border-radius: 10px;
    width: 700px;
    max-width: calc(100% - 30px);
    margin: auto;
    max-height: 80vh;
    position: relative;
    overflow: auto;
}

.modal-box .modal-content .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #fff;
}

.modal-box .modal-content .title h2 {
    font-size: 20px;
    font-weight: 400;
}

.modal-box .modal-content .title i {
    font-size: 25px;
    color: rgba(0, 0, 0, .5);
    cursor: pointer;
}

.modal-box .modal-content .user {
    display: flex;
    align-items: center;
    padding: 20px;
}

.modal-box .modal-content .user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
}

.modal-box.confirm-box main p {
    margin: 20px;
}

.modal-box.confirm-box footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(0, 0, 0, .08);
    display: flex;
    justify-content: flex-end;
}

.modal-box.confirm-box footer a {
    padding: 4px 15px;
    border: 2px solid;
    border-radius: 35px;
    color: #fff;
    box-sizing: border-box;
    cursor: pointer;
    transition: .3s ease;
}

.modal-box.confirm-box footer a:not(:last-child) {
    margin-right: 10px;
}

.modal-box.confirm-box footer a.cancel {
    border-color: crimson;
    background-color: crimson;
}

.modal-box.confirm-box footer a.confirm {
    border-color: #00BF00;
    background-color: #00BF00;
}

.modal-box.confirm-box footer a.cancel:hover {
    background: none;
    color: crimson;
}

.modal-box.confirm-box footer a.confirm:hover {
    background: none;
    color: #00BF00;
}
</style>