import type { UserRole } from "@/shared/config/navigation"
import { useAuthStore } from "@/stores/auth.store"
import type { Router } from "vue-router"

export function setupRouteGuard(router: Router): void {
    router.beforeEach(async (to) => {
        const auth = useAuthStore()
        // 1. BIRINCHI — Auth'ni initialize qil
        if (!auth.isInitialized) {
            try {
                await auth.initializeAuth()
            } catch {
                auth.isInitialized = true
            }
        }

        // 2. Role talabini ol
        const requiredRoles = to.meta.roles as UserRole[] | '*' | undefined

        // 3. Public route
        if (!requiredRoles) return true

        // 4. Login tekshirish (ENDI isAuthenticated to'g'ri)
        if (!auth.isAuthenticated || !auth.user) {
            return { path: '/login', query: { redirect: to.fullPath } }
        }

        // 5. Har qanday authenticated user
        if (requiredRoles === '*') return true

        // 6. Role tekshirish
        if (!auth.hasRole(requiredRoles)) {
            // toast.error("Bu sahifaga kirish uchun sizda yetarli huquq yo'q!", {
            //     timeout: 5000,
            //     icon: '🔒',
            // })
            return { name: 'forbidden' }
        }

        return true
    })
}