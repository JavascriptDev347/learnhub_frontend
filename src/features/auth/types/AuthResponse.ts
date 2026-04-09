// ─── Umumiy wrapper — TransformInterceptor har doim shu strukturada qaytaradi

import type { ApiResponse } from "@/core/api/api.response"


// ─── Login uchun data qismi
export interface LoginData {
    user: IUser
    access_token: string
    refresh_token: string
}

export type UserResponse = ApiResponse<IUser>
// Login response = wrapper + data
export type LoginResponse = ApiResponse<LoginData>

// ─── User
export interface IUser {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    avatar_url: null | string
    avatar_public_id: null | string
    is_active: boolean
    is_deleted: boolean
    created_at: string
    updated_at: string
}