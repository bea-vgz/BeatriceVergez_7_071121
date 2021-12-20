<template>
    <router-link :to="!route ? { name: 'user', params: { id: userId }} : route" class="no-decoration">
        <div class="user">
            <img v-if="photoProfil" :src="user.photoProfil" alt="Avatar">
            <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png" alt="Avatar">
            <div>
                <p>{{ username }}</p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "Avatar",
    props: [
        'userId',
        'photoProfil',
        'username',
        'route'
    ],
}
</script>