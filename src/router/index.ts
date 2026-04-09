import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from '@/router/auth'
import publicRoutes from '@/router/public'
import instructorRoutes from '@/router/instructor'
import studentRoutes from '@/router/student'
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  ...publicRoutes,
  ...authRoutes,
  ...instructorRoutes,
  ...studentRoutes,

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
