import type { Ref } from 'vue'

// GlobalExceptionFilter shu strukturada qaytaradi
type ApiErrorResponse = {
    response?: {
        status: number
        data?: {
            success: boolean
            statusCode: number
            message?: string
            errors?: Record<string, string[]>
        }
    }
}

export function handleApiError<T extends string>(
    err: unknown,
    errorsRef: Ref<Partial<Record<T, string>>>,
    fallbackField: T,
) {
    const axiosError = err as ApiErrorResponse
    const serverErrors = axiosError.response?.data?.errors
    const serverMessage = axiosError.response?.data?.message

    // { errors: { password: ["..."], email: ["..."] } } — har field o'z input tagiga
    if (serverErrors) {
        Object.entries(serverErrors).forEach(([field, messages]) => {
            if (messages?.[0]) {
                errorsRef.value[field as T] = messages[0]
            }
        })
    }

    // "Email yoki parol noto'g'ri" — fallbackField input tagida
    if (serverMessage) {
        errorsRef.value[fallbackField] = serverMessage
    }

    // Ikkalasi ham yo'q — fallback
    if (!serverErrors && !serverMessage) {
        errorsRef.value[fallbackField] = 'Something went wrong. Try again.'
    }
}