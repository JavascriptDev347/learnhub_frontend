<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'
import { HeroSectionIcon } from '@/assets/icons'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
const titleRef = ref()
const textRef = ref()
const buttonRef = ref()
const imageRef = ref()

useMotion(titleRef, {
    initial: { opacity: 0, y: 40 },
    enter: { opacity: 1, y: 0, transition: { duration: 800 } },
})

useMotion(textRef, {
    initial: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0, transition: { duration: 800, delay: 200 } },
})

useMotion(buttonRef, {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 600, delay: 400 } },
})

useMotion(imageRef, {
    initial: { opacity: 0, scale: 0.85, rotate: -8 },
    enter: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1000, delay: 300 } },
})
</script>

<template>
    <section class="bg-white py-16 md:py-24 overflow-hidden">
        <div class="">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                <div class="space-y-8">
                    <h1 ref="titleRef" class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Unlock Your Future with World-<br class="hidden lg:block">Class Learning
                    </h1>

                    <p ref="textRef" class="text-lg md:text-xl text-gray-600 max-w-lg">
                        Gain in-demand knowledge, grow your career, and learn from top
                        instructors, anytime, anywhere.
                    </p>

                    <div ref="buttonRef">
                        <BaseButton label="Get Started" size="medium" />
                    </div>
                </div>

                <div ref="imageRef" class="relative flex justify-center lg:justify-end">
                    <!-- Container = doira o'lchami -->
                    <div class="relative w-[450px] h-[450px] flex items-center justify-center">
                        <!-- Sariq doira — container bilan bir xil o'lcham -->
                        <div class="absolute inset-0 bg-yellow-400 rounded-full"></div>

                        <!-- Rasm — doira ichida markazlashgan -->
                        <img :src="HeroSectionIcon" alt="World-class learning illustration"
                            class="relative z-10 w-[363px] h-[349px] object-contain drop-shadow-2xl">
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>