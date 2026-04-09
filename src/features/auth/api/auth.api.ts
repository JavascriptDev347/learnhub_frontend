import { api } from '@/core/api/axios.instance'
import type { LoginDto } from '../schemas/auth.schema'
import type { LoginResponse, LoginData, UserResponse } from '../types/AuthResponse'
import { extractData } from '@/core/api/helper'
import { useQuery } from '@tanstack/vue-query'

export const authApi = {
    login: (dto: LoginDto): Promise<LoginData> =>
        api.post<LoginResponse>('/auth/login', dto).then(extractData),

    logout: () =>
        api.post('/auth/logout').then((r) => r.data),
    getMe: () =>
        api.get<UserResponse>('/auth/me').then(extractData),
}


export function useGetMe() {
    const query = useQuery({
        queryKey: ['auth', 'me'],
        queryFn: () => authApi.getMe(),
        retry: false,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    })

    return query
}