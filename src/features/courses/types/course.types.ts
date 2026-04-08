
export interface CourseForm {
    title: string
    description: string
    price: number
    status: 'draft' | 'published' | 'archived'
}

export interface Course extends CourseForm {
    id: number
}