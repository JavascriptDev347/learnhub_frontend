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

    status: z.enum(['draft', 'published', 'archived'] as const),
})

export const thumbnailSchema = z
    .instanceof(File)
    .refine(f => f.size <= 2 * 1024 * 1024, 'Max file size is 2MB')
    .refine(f => f.type.startsWith('image/'), 'Only image files allowed')

// ── Step 1 ──
export const basicInfoSchema = z.object({
    title: z
        .string()
        .min(1, 'Course title is required')
        .min(10, 'Title must be at least 10 characters')
        .max(100, 'Title must be under 100 characters'),

    shortDescription: z
        .string()
        .min(1, 'Short description is required')
        .min(20, 'At least 20 characters')
        .max(200, 'Max 200 characters'),

    category: z
        .string()
        .min(1, 'Please select a category'),

    overview: z
        .string()
        .max(2000, 'Max 2000 characters')
        .optional(),

    level: z
        .enum(['beginner', 'intermediate', 'advanced'] as const, {
            message: 'Please select a level',
        })
        .optional(),

    duration: z
        .enum(['0-2', '2-5', '5-10', '10+'] as const, {
            message: 'Please select duration',
        })
        .optional(),

    thumbnail: thumbnailSchema.nullable().optional()
})

// ── Step 2 ──
export const curriculumSchema = z.object({
    sections: z
        .array(z.object({
            id: z.string(),
            title: z.string().min(1, 'Section title is required'),
            lessons: z.array(z.object({
                id: z.string(),
                title: z.string().min(1, 'Lesson title is required'),
                type: z.enum(['video', 'article', 'quiz'] as const),
            })),
        }))
        .min(1, 'At least one section is required'),
})

// ── Step 3 ──
export const pricingSchema = z.object({
    accessType: z.enum(['free', 'paid', 'subscription'] as const),
    price: z.number().min(0, 'Price cannot be negative').optional(),
}).refine(
    (data) => data.accessType === 'free' || (data.price !== undefined && data.price > 0),
    { message: 'Price is required for paid courses', path: ['price'] }
)

// ── Step 4 ──
export const publishSchema = z.object({
    status: z.enum(['draft', 'published'] as const),
})

// ── To'liq forma (barcha steplar) ──
export const createCourseSchema = basicInfoSchema
    .merge(curriculumSchema)
    .merge(pricingSchema)
    .merge(publishSchema)

// ── Tiplar (qo'lda yozilmaydi) ──
export type BasicInfoForm = z.infer<typeof basicInfoSchema>
export type CreateCourseForm = z.infer<typeof createCourseSchema>
// Type avtomatik chiqadi — qo'lda yozmaysan
export type CourseForm = z.infer<typeof courseSchema>