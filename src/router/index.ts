import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/router/auth'
import publicRoutes from '@/router/public'
import instructorRoutes from '@/router/instructor'
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  ...publicRoutes,
  ...authRoutes,
  ...instructorRoutes,

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
