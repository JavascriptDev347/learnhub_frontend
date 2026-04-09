import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUser } from '@/features/auth/types/AuthResponse'
import type { UserRole } from '@/shared/config/navigation'
import { authApi, useGetMe } from '@/features/auth/api/auth.api'

export const useAuthStore = defineStore('auth', () => {
    // ─── State ───────────────────────────────────────────────────────────────
    const user = ref<IUser | null>(null)
    const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
    const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
    const isInitialized = ref(false)
    // ─── Getters ─────────────────────────────────────────────────────────────
    const isAuthenticated = computed(() => !!accessToken.value)
    const isAdmin = computed(() => user.value?.role === 'admin')
    const isInstructor = computed(() => user.value?.role === 'instructor')
    const isStudent = computed(() => user.value?.role === 'student')
    const role = computed(() => user.value?.role || null)

    const fullName = computed(() => {
        if (!user.value) return ''
        return `${user.value.firstName} ${user.value.lastName}`
    })

    // ─── Actions ─────────────────────────────────────────────────────────────
    function setAuth(access: string, refresh: string, userData: IUser) {
        accessToken.value = access
        refreshToken.value = refresh
        user.value = userData

        localStorage.setItem('accessToken', access)
        localStorage.setItem('refreshToken', refresh)
    }

    function setUser(data: IUser) {
        user.value = data
    }

    const fetchMe = async () => {
        if (!accessToken.value) return false
        const data = await authApi.getMe()
        setUser(data)
        return true
    }

    function hasRole(requiredRoles: UserRole[] | '*'): boolean {
        if (!role.value) return false
        if (requiredRoles === '*') return true
        return requiredRoles.includes(role.value as UserRole)
    }

    function clearAuth() {
        accessToken.value = null
        refreshToken.value = null
        user.value = null

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    const initializeAuth = async (): Promise<boolean> => {
        if (isInitialized.value) return !!user.value

        isInitialized.value = true

        if (!accessToken.value) {
            return false
        }

        return await fetchMe()
    }

    return {
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isAdmin,
        isStudent,
        isInstructor,
        isInitialized,
        fullName,
        fetchMe,
        initializeAuth,
        setAuth,
        clearAuth,
        setUser,
        hasRole
    }
})