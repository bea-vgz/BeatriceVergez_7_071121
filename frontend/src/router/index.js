import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  // Route login
  {
    path: '/',
    name: 'Connexion',
    component: () => import("../views/Connexion.vue"),
    meta: { title: 'Groupomania - Connexion' }
  },
  // Route signup
  {
    path: '/signup',
    name: 'Inscription',
    component: () => import("../views/Inscription.vue"),
    meta: { title: 'Groupomania - Inscription' }
  },
  // Route Wall / Home
  {
    path: '/home',
    name: 'Home',
    component: () => import("../views/Home.vue"),
    meta: { title: 'Groupomania' },
    requiresAuth: true,
  },
// Route Profil user 
  {
    path: "/profil",
    name: "Profil",
    component: () => import("../views/Profil.vue"),
    meta: { title:'Groupomania - Mon compte' },
    requiresAuth: true,
},
  // Route password user 
  {
    path: "/password",
    name: "Password",
    component: () => import("../components/ModifyPassword.vue"),
    meta: { title:'Groupomania - modification Password' },
    requiresAuth: true,
  },

  // Route création post 
  {
    path: "/post",
    name: "Create_Post",
    component: () => import("../components/CreatePost.vue"),
    meta: { title:'Groupomania - création de post' },
    requiresAuth: true,
  },
 /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue') */
  //} 
] 

const router = new VueRouter({
  routes
})

// Permet de mettre à jour le titre (les meta) en fonction du routeur
router.afterEach((to, from) => {
  console.log(from, to);
  document.title = to.meta.title;
});

export default router
