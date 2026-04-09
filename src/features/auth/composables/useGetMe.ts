import { useQuery } from '@tanstack/vue-query'
import { authApi } from '../api/auth.api'
import type { ComputedRef, Ref } from 'vue'
type EnabledOption = boolean | Ref<boolean> | ComputedRef<boolean> | (() => boolean)

interface UseGetMeOptions {
    enabled?: EnabledOption
}
export function useGetMe(options?: UseGetMeOptions) {
    return useQuery({
        queryKey: ['auth', 'me'],
        queryFn: async () => {
            const data = await authApi.getMe()
            return data
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
        enabled: options?.enabled,
    })
}