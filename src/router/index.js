import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Goods from '../views/Goods.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import Login from '../views/Login.vue'

const USER_STORAGE_KEY = 'campus_food_user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/goods/:shopId',
    name: 'goods',
    component: Goods,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: Order,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const userInfo = localStorage.getItem(USER_STORAGE_KEY)

  if (to.name === 'login' && userInfo) {
    return { name: 'home' }
  }

  if (to.meta.requiresAuth && !userInfo) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }

  return true
})

export default router
