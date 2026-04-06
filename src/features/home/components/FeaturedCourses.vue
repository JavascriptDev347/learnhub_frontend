<!-- src/features/home/components/FeaturedCourses.vue -->
<template>
    <section class="bg-white py-16 md:py-24">
        <div class="max-w-7xl mx-auto ">

            <h2 ref="titleRef" class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                Featured Courses
            </h2>

            <!-- Course Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="(course, index) in courses" :key="course.id"
                    :ref="(el) => setCardRef(el as HTMLElement, index)" class="border border-gray-200 rounded-2xl overflow-hidden
                 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    <!-- Thumbnail -->
                    <div class="aspect-[4/3] overflow-hidden">
                        <img :src="course.thumbnail" :alt="course.title"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
                    </div>

                    <!-- Info -->
                    <div class="p-4">
                        <h3 class="text-base font-bold text-gray-900 line-clamp-1">
                            {{ course.title }}
                        </h3>
                        <p class="text-sm text-gray-500 mt-1">
                            {{ course.instructor }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Next button -->
            <div ref="nextRef" class="flex justify-end mt-8 cursor-pointer">
                <button class="flex items-center gap-2 text-gray-700 font-medium cursor-pointer
                 hover:text-yellow-500 transition-colors duration-300 group" @click="handleNext">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform duration-300"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'

interface Course {
    id: number
    title: string
    instructor: string
    thumbnail: string
}

const courses: Course[] = [
    {
        id: 1,
        title: 'UI/UX Design Essentials',
        instructor: 'Sarah Thompson',
        thumbnail: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop',
    },
    {
        id: 2,
        title: 'Full Stack Development',
        instructor: 'John Adewale',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    },
    {
        id: 3,
        title: 'Data Analysis Python',
        instructor: 'Amina Yusuf',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    },
    {
        id: 4,
        title: 'Digital Marketing 101',
        instructor: 'Carlos Mendoza',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    },
]

const emit = defineEmits<{
    next: []
}>()

function handleNext(): void {
    emit('next')
}

// Animations
const titleRef = ref<HTMLElement>()
const nextRef = ref<HTMLElement>()
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: HTMLElement, index: number): void {
    if (el) cardRefs.value[index] = el
}

useMotion(titleRef, {
    initial: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0, transition: { duration: 600 } },
})

useMotion(nextRef, {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 500, delay: 800 } },
})

onMounted(() => {
    cardRefs.value.forEach((el, index) => {
        useMotion(el, {
            initial: { opacity: 0, y: 40, scale: 0.95 },
            enter: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: 500,
                    delay: 200 + index * 150,
                },
            },
        })
    })
})
</script>