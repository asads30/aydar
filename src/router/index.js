import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PermissionsView from '../views/PermissionsView.vue'
import BlogList from '../views/Blog/List.vue'
import BlogItem from '../views/Blog/Item.vue'
import ProfileView from '@/views/ProfileView.vue'
import AddView from '@/views/AddView.vue'
import VerifyView from '@/views/VerifyView.vue'
import CodeView from '@/views/CodeView.vue'
import HunterOrderView from '@/views/Hunter/OrderView.vue'
import FishingOrderView from '@/views/Fishing/OrderView.vue'
import HunterSendView from '@/views/Hunter/SendView.vue'
import SuccessView from '@/views/SuccessView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyView
  },
  {
    path: '/verify/code',
    name: 'code',
    component: CodeView
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: PermissionsView
  },
  {
    path: '/blog',
    name: 'blog-list',
    component: BlogList
  },
  {
    path: '/blog/:id',
    name: 'blog-item',
    component: BlogItem
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
    path: '/hunter/order',
    name: 'hunterOrder',
    component: HunterOrderView
  },
  {
    path: '/hunter/send/:id',
    name: 'hunterSend',
    component: HunterSendView
  },
  {
    path: '/fishing/order',
    name: 'fishingOrder',
    component: FishingOrderView
  },
  {
    path: '/success',
    name: 'success',
    component: SuccessView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
