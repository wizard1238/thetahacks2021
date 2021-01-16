import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hospitals',
    name: 'Hospitals',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Hospitals.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
