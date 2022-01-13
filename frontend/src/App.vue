<template>
  <div id="app">
    <NotificationAlert />
    <router-view />
  </div>
</template>

<script>
import NotificationAlert from '../src/components/NotificationAlert'
export default {
  name: 'App',
  components: {
    NotificationAlert
  }
}
</script>

<style lang="scss">
#app {
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&display=swap');
  font-family: "Barlow", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
