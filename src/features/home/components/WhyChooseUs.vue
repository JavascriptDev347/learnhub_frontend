<template>
    <section class="bg-white">
        <div class="max-w-7xl mx-auto">
            <h2 ref="titleRef" class="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                Why Choose Us
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="(feature, index) in features" :key="index"
                    :ref="(el) => setCardRef(el as HTMLElement, index)" class="border border-gray-200 rounded-2xl p-6 space-y-4
                 hover:shadow-md transition-shadow duration-300">
                    <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <CircleCheckBig />

                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-gray-900">{{ feature.title }}</h3>
                        <p class="text-sm text-gray-500 mt-1">{{ feature.description }}</p>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'
import { CircleCheckBig } from 'lucide-vue-next'
interface Feature {
    title: string
    description: string
}

const features: Feature[] = [
    { title: 'Expert Instructors', description: 'Learn from industry leaders.' },
    { title: 'Learn Anytime', description: 'Flexible, self-paced content.' },
    { title: 'Verified Certificates', description: 'Get certified after completion.' },
    { title: 'Lifetime Access', description: 'Access your courses anytime.' },
]

// Title animation
const titleRef = ref<HTMLElement>()

useMotion(titleRef, {
    initial: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0, transition: { duration: 600 } },
})

// Card refs + staggered animation
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: HTMLElement, index: number): void {
    if (el) cardRefs.value[index] = el
}

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
                    delay: 200 + index * 150, // har bir karta 150ms kechikish
                },
            },
        })
    })
})
</script>