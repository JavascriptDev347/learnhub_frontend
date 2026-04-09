import { api } from '@/core/api/axios.instance'
import type { LoginDto } from '../schemas/auth.schema'
import type { LoginResponse, LoginData } from '../types/AuthResponse'

export const authApi = {
    login: (dto: LoginDto): Promise<LoginData> =>
        api.post<LoginResponse>('/auth/login', dto).then((r) => {
            console.log('Login response:', r.data) // Debug log to check the response structure
            return r.data.data
        }),

    logout: () =>
        api.post('/auth/logout').then((r) => r.data),
}