import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PermissionsView from '../views/PermissionsView.vue'
import BlogView from '../views/BlogView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AddView from '@/views/AddView.vue'
import HunterVerifyView from '@/views/Hunter/VerifyView.vue'
import HunterCodeView from '@/views/Hunter/CodeView.vue'
import FishingVerifyView from '@/views/Fishing/VerifyView.vue'
import FishingCodeView from '@/views/Fishing/CodeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: PermissionsView
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/add',
    name: 'add',
    component: AddView
  },
  {
    path: '/hunter/verify',
    name: 'hunterVerify',
    component: HunterVerifyView
  },
  {
    path: '/hunter/code',
    name: 'hunterCode',
    component: HunterCodeView
  },
  {
    path: '/fishing/verify',
    name: 'fishingVerify',
    component: FishingVerifyView
  },
  {
    path: '/fishing/code',
    name: 'fishingCode',
    component: FishingCodeView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
