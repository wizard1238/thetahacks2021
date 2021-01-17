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
    path: '/donors',
    name: 'Donors',
    component: () => import(/* webpackChunkName: "donors" */ '../pages/Donors.vue')
  },
  {
    path: '/hospitals',
    name: 'Hospitals',
    component: () => import(/* webpackChunkName: "hospitals" */ '../pages/Hospitals.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
