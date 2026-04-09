import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required').min(8, 'Min 8 characters'),
})

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(8, 'Min 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(
    (data) => data.password === data.confirmPassword,
    { message: "Passwords don't match", path: ['confirmPassword'] }
)

export type LoginDto = z.infer<typeof loginSchema>
export type RegisterDto = z.infer<typeof registerSchema>