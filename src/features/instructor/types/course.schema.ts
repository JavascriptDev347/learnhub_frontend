import { z } from 'zod'

export const courseSchema = z.object({
    title: z.string()
        .min(1, 'Kurs nomi majburiy')
        .max(100, 'Maksimal 100 belgi'),

    description: z.string()
        .min(10, 'Kamida 10 belgi')
        .optional(),

    price: z.number()
        .min(0, "Narx manfiy bo'lishi mumkin emas"),

    status: z.enum(['draft', 'published', 'archived']),
})

// Type avtomatik chiqadi — qo'lda yozmaysan
export type CourseForm = z.infer<typeof courseSchema>