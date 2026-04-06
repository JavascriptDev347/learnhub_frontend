<template>
    <section class="bg-white py-16 md:py-24">
        <div class="max-w-7xl mx-auto">

            <h2 ref="titleRef" class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                Testimonials
            </h2>

            <!-- Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="(review, index) in testimonials" :key="review.id"
                    :ref="(el) => setCardRef(el as HTMLElement, index)" class="border border-gray-200 rounded-2xl p-6 flex flex-col justify-between
                 hover:shadow-md transition-shadow duration-300">
                    <!-- Header: avatar + info + time -->
                    <div>
                        <div class="flex items-center justify-between mb-5">
                            <div class="flex items-center gap-3">
                                <img :src="review.avatar" :alt="review.name"
                                    class="w-12 h-12 rounded-full object-cover">
                                <div>
                                    <h3 class="text-base font-bold text-gray-900">{{ review.name }}</h3>
                                    <p class="text-sm text-gray-500">{{ review.course }}</p>
                                </div>
                            </div>
                            <span class="text-sm text-gray-400 shrink-0">{{ review.timeAgo }}</span>
                        </div>

                        <!-- Review text -->
                        <p class="text-sm text-gray-600 leading-relaxed mb-5">
                            {{ review.text }}
                        </p>
                    </div>

                    <!-- Stars -->
                    <div class="flex gap-0.5">
                        <svg v-for="star in 5" :key="star" class="w-5 h-5"
                            :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                   00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
                   00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1
                   1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                   1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0
                   00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Next button -->
            <div ref="nextRef" class="flex justify-end mt-8">
                <button class="flex items-center gap-2 text-gray-700 font-medium cursor-pointer
                 hover:text-yellow-500 transition-colors duration-300 group" @click="emit('next')">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform duration-300"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0
                 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'

interface Testimonial {
    id: number
    name: string
    course: string
    avatar: string
    timeAgo: string
    text: string
    rating: number
}

// TODO: keyinchalik API'dan keladi
const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Marta G.',
        course: 'UI/UX Design Essentials',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        timeAgo: '2D',
        text: 'I landed my first internship thanks to this platform! The structure and hands-on projects made learning fun and effective.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Samuel T.',
        course: 'Full Stack Development',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        timeAgo: '1D',
        text: 'Clear videos, engaging quizzes, and the project-based lessons were a game changer for me. Highly recommended!',
        rating: 4,
    },
    {
        id: 3,
        name: 'Hana K.',
        course: 'Intro to AI',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        timeAgo: '4D',
        text: 'The best part was how easy it was to track my progress. I now feel confident applying AI concepts in my job',
        rating: 5,
    },
]

const emit = defineEmits<{
    next: []
}>()

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
                transition: { duration: 500, delay: 200 + index * 150 },
            },
        })
    })
})
</script>