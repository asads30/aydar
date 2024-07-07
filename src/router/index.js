import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageView from '../views/PageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: PageView
  },
  {
    path: '/blog',
    name: 'blog',
    component: PageView
  },
  {
    path: '/profile',
    name: 'profile',
    component: PageView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
