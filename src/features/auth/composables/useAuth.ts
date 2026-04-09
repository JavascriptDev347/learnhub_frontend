import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { loginSchema, type LoginDto } from '../schemas/auth.schema'
import { authApi } from '../api/auth.api'
import { handleApiError } from '@/core/utils/handle-api-error'

export function useLogin() {
    const router = useRouter()
    const authStore = useAuthStore()

    const errors = ref<Partial<Record<keyof LoginDto, string>>>({})

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (dto: LoginDto) => authApi.login(dto),

        onSuccess(data) {
            authStore.setAuth(data.access_token, data.refresh_token, data.user)
            if (authStore.isInstructor) {
                router.push('/instructor/dashboard')
            } else if (authStore.isAdmin) {
                router.push('/admin/dashboard')
            } else {
                router.push('/student/dashboard')
            }
        },

        onError(err: unknown) {
            handleApiError(err, errors, 'email')
        },
    })

    function submit(form: LoginDto) {
        errors.value = {}

        const result = loginSchema.safeParse(form)

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[]>

            Object.entries(fieldErrors).forEach(([field, messages]) => {
                if (messages?.[0]) {
                    errors.value[field as keyof LoginDto] = messages[0]
                }
            })
            return
        }

        mutate(result.data)
    }

    function clearError(field: keyof LoginDto) {
        if (errors.value[field]) errors.value[field] = undefined
    }

    return {
        errors,
        clearError,
        submit,
        isPending,
        isError,
        error,
    }
}