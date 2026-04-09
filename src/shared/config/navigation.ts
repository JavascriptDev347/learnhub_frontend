import {
    BookOpen,
    Users,
    DollarSign,
    GraduationCap,
    ClipboardList,
    Compass,
} from 'lucide-vue-next'
import type { Component } from 'vue'

export type UserRole = 'instructor' | 'student' | 'admin' | 'public'

export interface NavItem {
    key: string
    label: string
    to: string
    icon: Component
}

export const NAV_CONFIG: Record<UserRole, NavItem[]> = {
    instructor: [
        { key: 'instructor-dashboard', label: 'Dashboard', to: '/instructor/dashboard', icon: BookOpen },
    ],
    student: [
        { key: 'student-dashboard', label: 'Dashboard', to: '/student/dashboard', icon: BookOpen },
    ],
    admin: [
        { key: 'dashboard', label: 'Dashboard', to: '/admin/dashboard', icon: BookOpen },
    ],
    public: [
        { key: 'login', label: 'Login', to: '/login', icon: BookOpen },
        { key: 'register', label: 'Register', to: '/register', icon: BookOpen },
    ]
}