<template>
  <div id="PostFormulaire">
    <form class="container_post bg-white">
      <router-link to="/profil" class="container_user bg-white">
          <img v-if="currentUser.photoProfil == null" class="avatar" alt="Avatar" src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"/>
          <img v-else class="avatar" alt="Avatar" :src="currentUser.photoProfil" />
      </router-link>