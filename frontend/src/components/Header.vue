<template>
  <div id="nav" class="border_nav bg-white sticky-top" >
    <div class="navigation">
      <div class="nav_logo">
        <router-link to="/home">
          <img class="logo" src="../assets/icon_groupomania.png" alt="Groupomania"/>
        </router-link>
        <UserSearch />
      </div>
        <div class="accessPosts">
          <router-link to="/home" aria-label="Fil d'actualité" class="nav_centrale text-decoration-none"><b-icon icon="house-door" class="mr-2 mr-lg-2"></b-icon>ACCUEIL</router-link>
        </div>

        <div class="notifUser">
          <div class="menu-item" @click="isOpen = !isOpen" >
            <button class="accessUser">
              <img v-if="currentUser" :src="currentUser.photoProfil"  class="avatar icone" alt="Avatar" ref="file" type="file"/>
              <img v-else src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"  class="avatar icone" alt="Avatar"/>
              <span v-if="currentUser" class="username">
                <strong style="text-transform: uppercase"> {{ currentUser.username }} </strong>
              </span>
            </button>
            <transition name="fade" apear>
              <div class="sub-menu" v-if="isOpen">
                <div class="menu-item">
                  <router-link to="/profil"><b-icon icon="person-circle" class="mr-2 mr-lg-2"></b-icon>Mon compte</router-link>
                </div>
                <div class="menu-item">
                  <a @click="logout" class="text-decoration-none"><b-icon icon="box-arrow-in-left" class="mr-2 mr-lg-2"></b-icon> Me déconnecter </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
    </div>
  <div class="menu_toggle">
  <input type="checkbox" id="menu" />
  <label for="menu" class="menu">
	<span></span>
	<span></span>
	<span></span>
  </label>
  <nav class="nav">
	<ul>
	<li><router-link to="/home" aria-label="Fil d'actualité" class="nav_centrale text-decoration-none"><b-icon icon="house-door" class="mr-2 mr-lg-2"></b-icon>ACCUEIL</router-link></li>
	<li><router-link to="/profil"><b-icon icon="person-circle" class="mr-2 mr-lg-2"></b-icon>Mon compte</router-link></li>
  <li><a @click="logout" class="text-decoration-none"><b-icon icon="box-arrow-in-left" class="mr-2 mr-lg-2"></b-icon> Me déconnecter </a></li>
	</ul>
  </nav>
  </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from "../router";
import UserSearch from '../components/UserSearch';
export default {
  
  name: 'Header',
  data() {
    return {
      userSearch: null,
      isOpen: false,
      image:'',
    }
  },
  components: {
    UserSearch,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    ...mapActions(['displayNotification']),

    async logout() {
      this.$store.dispatch('auth/logout');
      this.displayNotification('Vous avez été déconnecté.')
      router.push('/');
    },
  }
}
</script>

<style lang="scss" scoped >
header {
  margin: 0;
}
#nav {
  width: 100%;
}
nav .menu-item, .sub-menu {
  background-color: #fff;
  width: max-content;
  position: absolute;
  padding: 1.5rem;
  transform: translateX(-30%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  cursor: pointer;
}
.menu-item {
  padding: 0.7rem;
  margin-right: 2rem;
  color:#242424;
}
.navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff,
}
#nav a {
  font-weight: bold;
  color: #242424;
  text-decoration: none;
}
#nav a:hover {
  cursor: pointer;
  color: #fd2d01;
}
.nav_centrale {
  padding: 2rem;
}
.text-decoration-none {
  text-decoration: none;
}
.logo {
  display: block;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  width: 85%
}
.profil_icon {
  padding-right: 0.5rem;
}
.notifUser, .nav_logo {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.bell_notif {
  background: #e4e4e4;
  padding: 0.8rem;
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
}
.border_nav {
  box-shadow: 0 8px 8px 0 rgba(95, 99, 122, 0.123);
  border-width: 0;
  z-index: 1;
  box-sizing: border-box;
}
button {
  padding: 0.2rem;
  border-radius: 2rem;
  border: solid 0.15rem #fd2d01;
  background-color: #fd2d01;
}
.accessUser{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
  color: #fff;
}
.profil, .deconnexion {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
}
.username {
  text-decoration: none;
}
.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  padding: 0.5rem;
  object-fit: cover;
  object-position: center;
  margin-right: 0.3rem;
}
input {
  border-radius: 2rem;
  border: solid 1px #F2F2F2;
  background: #F2F2F2;
  padding: 0.7rem;
  width: 100%;
}
.menu_toggle {
  display: none;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
/* menu toggle */
.menu_toggle {
  display: contents;
}
.notifUser, .accessPosts {
  display: none;
}
.logo {
  padding-left: 0.7rem;
}

$base-duration: 500ms;

// Colors
$color-1: #F2F2F2;

// Breakpoints
$sm: new-breakpoint(min-width 320px);
$med: new-breakpoint(min-width 768px);
$lg: new-breakpoint(min-width 1024px);

*, *:before, *:after {
	box-sizing: border-box;
	outline: none;
}

body {
	position: sticky;
	margin: 0;
	padding: 0;
	font-size: 16px;
	font-smooth: auto;
	font-weight: 300;
	line-height: 1.75;
	color: $color-1;
	overflow-x: hidden;
}

.menu {
	position: fixed;
	top: 90px;
	left: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
  background-color: #F2F2F2;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	//box-shadow: 0 0 20px rgba(black,0.2);
	transition: transform 250ms ease;
	cursor: pointer;
	z-index: 200;
	
	span {
		position: relative;
		display: block;
		width: 50%;
		height: 2px;
		background-color: #fd2d01;
		float: left;
		transform-origin: center center;
		transition: transform 250ms ease;
		z-index: 200;
		
		&:nth-of-type(1) {
			transform: translateY(-5px);
		}
		
		&:nth-of-type(3) {
			transform: translateY(5px);
		}
	}
}

#menu {
	display: none;
	
	&:checked ~ .menu {
		background-color: transparent;
		transform: rotate(360deg);
		transition: transform 250ms ease;
		
		span {
			background-color: #fd2d01;
			transition: transform 250ms ease;
			
			&:nth-of-type(1) {
				transform: translateY(1px) rotate(45deg);
			}
			
			&:nth-of-type(2) {
				display: none;
			}
			
			&:nth-of-type(3) {
				transform: translateY(-1px) rotate(-45deg);
			}
		}
	}
	
	&:checked ~ .nav {
		left: 0px;
		transition: left $base-duration ease;
	}
	
	&:checked ~ main {
		transform: translateX(250px);
		transition: transform $base-duration ease;
	}
}

.nav {
	position: fixed;
	left: -240px;
	width: 220px;
	height: 37vh;
	margin: 0;
	padding: 0;
	background-color: #FFF;
	transition: left $base-duration ease;
	z-index: 0;
	
	ul {
		position: relative;
		list-style-type: none;
		margin: 100px 0;
		padding: 0;
		
		li {
			position: relative;
			display: block;
			border-bottom: 1px solid #747474;
			
			a {
				position: relative;
				display: block;
				margin: 0;
				padding: 15px 20px;
				color: #242424;
				font-size: 14px;
				font-weight: bold;
				text-decoration: none;
				text-transform: uppercase;
        letter-spacing: 1px;
				
				&:before {
					position: absolute;
					content: '';
					top: 0;
					left: 0;
					width: 0;
					height: 100%;
					transition: width 250ms ease;
					z-index: -1;
				}
				
				&:hover {
					color: #444;
				}
			}
		}
	}
}
}
</style>