export type StepStatus = 'completed' | 'active' | 'pending'

export interface Step {
    id: number
    label: string
    description: string
}

export interface CreateCourseForm {
    // Step 1
    title: string
    shortDescription: string
    overview: string
    category: string
    level: string
    duration: string
    thumbnail: File | null

    // Step 2
    sections: Section[]

    // Step 3
    price: number
    accessType: 'free' | 'paid' | 'subscription'

    // Step 4
    status: 'draft' | 'published'
}

export interface Section {
    id: string
    title: string
    lessons: Lesson[]
}

export interface Lesson {
    id: string
    title: string
    type: 'video' | 'article' | 'quiz'
}