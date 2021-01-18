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
    path: '/donormatch/:donorName',
    name: 'DonorMatch',
    props: true,
    component: () => import(/* webpackChunkName: "donors" */ '../pages/DonorMatch.vue')
  },
  {
    path: '/hospitals',
    name: 'Hospitals',
    component: () => import(/* webpackChunkName: "hospitals" */ '../pages/Hospitals.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../pages/Signin.vue')
  },
  {
    path: '/signinasdonor',
    name: 'SigninAsDonor',
    component: () => import('../pages/SigninAsDonor')
  },
  {
    path: '/signinashospital',
    name: 'SigninAsHospital',
    component: () => import('../pages/SigninAsHospital')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
