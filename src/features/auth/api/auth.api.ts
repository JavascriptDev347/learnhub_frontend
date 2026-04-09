import { api } from '@/core/api/axios.instance'
import type { LoginDto } from '../schemas/auth.schema'
import type { LoginResponse, LoginData } from '../types/AuthResponse'
import { extractData } from '@/core/api/helper'

export const authApi = {
    login: (dto: LoginDto): Promise<LoginData> =>
        api.post<LoginResponse>('/auth/login', dto).then(extractData),

    logout: () =>
        api.post('/auth/logout').then((r) => r.data),
}