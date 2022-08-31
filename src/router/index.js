import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home.vue')
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../views/member.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/goods.vue')
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import('../views/supplier.vue')
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import('../views/staff.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
