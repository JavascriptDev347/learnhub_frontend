import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IUser } from '@/features/auth/types/AuthResponse'

export const useAuthStore = defineStore('auth', () => {
    // ─── State ───────────────────────────────────────────────────────────────
    const user = ref<IUser | null>(null)
    const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
    const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))

    // ─── Getters ─────────────────────────────────────────────────────────────
    const isAuthenticated = computed(() => !!accessToken.value)
    const isAdmin = computed(() => user.value?.role === 'admin')
    const isInstructor = computed(() => user.value?.role === 'instructor')
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

    function clearAuth() {
        accessToken.value = null
        refreshToken.value = null
        user.value = null

        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    return {
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isAdmin,
        isInstructor,
        fullName,
        setAuth,
        clearAuth,
    }
})