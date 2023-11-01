/* eslint-disable no-undef */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeToDo.vue')
  },
  {
    path: '/done',
    name: 'Completati',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DoneView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/albo',
    name: 'XKCD',
    component: () => import('@/views/XKCD.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`;
  next();
})

export default router
