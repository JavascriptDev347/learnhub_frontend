import type { Ref } from 'vue'

// GlobalExceptionFilter shu strukturada qaytaradi
type ApiErrorResponse = {
    response?: {
        status: number
        data?: {
            success: boolean
            statusCode: number
            message?: string | string[]
            errors?: Record<string, string[]>
        }
    }
}

export function handleApiError<T extends string>(
    err: unknown,
    errorsRef: Ref<Partial<Record<T, string>>>,
    fallbackField: T = 'email' as T   // default 'email'
) {
    const axiosError = err as ApiErrorResponse
    const data = axiosError.response?.data

    if (!data) {
        errorsRef.value[fallbackField] = 'Server bilan bog‘lanishda xatolik yuz berdi. Qayta urinib ko‘ring.'
        return
    }

    const serverErrors = data.errors
    let serverMessage = data.message

    // Agar message array bo'lsa (NestJS standart validation), birinchi xabarni olamiz
    if (Array.isArray(serverMessage)) {
        serverMessage = serverMessage[0]
    }

    // 1. Agar field-by-field xatolar kelsa (eng muhim)
    if (serverErrors && typeof serverErrors === 'object') {
        Object.entries(serverErrors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages[0]) {
                errorsRef.value[field as T] = messages[0]
            }
        })
        return   // field xatoliklari bor bo'lsa, umumiy message ni qo'ymaymiz
    }

    // 2. Agar faqat umumiy message bo'lsa (Bad Request, Unauthorized, Login xatosi va h.k.)
    if (serverMessage) {
        errorsRef.value[fallbackField] = serverMessage as string
        return
    }

    // 3. Hech narsa topilmasa — fallback
    errorsRef.value[fallbackField] = 'Noma’lum xatolik yuz berdi. Qayta urinib ko‘ring.'
}
// export function handleApiError<T extends string>(
//     err: unknown,
//     errorsRef: Ref<Partial<Record<T, string>>>,
//     fallbackField: T,
// ) {
//     const axiosError = err as ApiErrorResponse
//     const serverErrors = axiosError.response?.data?.errors
//     const serverMessage = axiosError.response?.data?.message

//     // { errors: { password: ["..."], email: ["..."] } } — har field o'z input tagiga
//     if (serverErrors) {
//         Object.entries(serverErrors).forEach(([field, messages]) => {
//             if (messages?.[0]) {
//                 errorsRef.value[field as T] = messages[0]
//             }
//         })
//     }

//     // "Email yoki parol noto'g'ri" — fallbackField input tagida
//     if (serverMessage) {
//         errorsRef.value[fallbackField] = serverMessage
//     }

//     // Ikkalasi ham yo'q — fallback
//     if (!serverErrors && !serverMessage) {
//         errorsRef.value[fallbackField] = 'Something went wrong. Try again.'
//     }
// }