import { ref } from "vue"
import type z from "zod"

// Generic validate — har qanday schema uchun ishlaydi
export function useFormValidation<T extends Record<string, unknown>>(schema: z.ZodType<T>) {
    const errors = ref<Partial<Record<string, string>>>({})

    function validate(form: T): boolean {
        errors.value = {}
        const result = schema.safeParse(form)

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[]>

            Object.entries(fieldErrors).forEach(([field, messages]) => {
                if (messages?.[0]) errors.value[field] = messages[0]
            })
            return false
        }
        return true
    }

    function clearError(field: string) {
        if (errors.value[field]) errors.value[field] = undefined
    }

    return { errors, validate, clearError }
}
