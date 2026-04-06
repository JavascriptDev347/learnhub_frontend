import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/router/auth'
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  ...authRoutes,
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
