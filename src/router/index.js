import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PermissionsView from '../views/PermissionsView.vue'
import BlogList from '../views/Blog/List.vue'
import BlogItem from '../views/Blog/Item.vue'
import ProfileView from '@/views/ProfileView.vue'
import AddView from '@/views/AddView.vue'
import CodeView from '@/views/Login/CodeView.vue'
import HunterOrderView from '@/views/Hunter/OrderView.vue'
import FishingOrderView from '@/views/Fishing/OrderView.vue'
import HunterSendView from '@/views/Hunter/SendView.vue'
import SuccessView from '@/views/SuccessView.vue'
import LoginView from '@/views/Login/LoginView.vue'
import VerifyView from '@/views/Login/VerifyView.vue'

function isAuthenticated() {
  const token = localStorage.getItem('auth_token');
  return !!token;
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/login/code',
    name: 'code',
    component: CodeView
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyView
  },
  {
    path: '/permissions',
    name: 'permissions',
    component: PermissionsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/blog',
    name: 'blog-list',
    component: BlogList,
    meta: { requiresAuth: true }
  },
  {
    path: '/blog/:id',
    name: 'blog-item',
    component: BlogItem,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'add',
    component: AddView,
    meta: { requiresAuth: true }
  },
  {
    path: '/hunter/order',
    name: 'hunterOrder',
    component: HunterOrderView,
    meta: { requiresAuth: true }
  },
  {
    path: '/hunter/send/:id',
    name: 'hunterSend',
    component: HunterSendView,
    meta: { requiresAuth: true }
  },
  {
    path: '/fishing/order',
    name: 'fishingOrder',
    component: FishingOrderView,
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
