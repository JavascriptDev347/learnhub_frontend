import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/router/auth'
import publicRoutes from '@/router/public'
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  ...publicRoutes,
  ...authRoutes,

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
