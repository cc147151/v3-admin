import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const constRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes
})

export default router
