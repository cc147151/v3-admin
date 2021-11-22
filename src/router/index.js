import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'
import Layout from '@/layout'
const constRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes
})

export default router
