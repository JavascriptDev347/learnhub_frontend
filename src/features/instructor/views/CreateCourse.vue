<template>
    <div class="min-h-screen bg-white rounded-2xl  ">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">

                <!-- Sidebar -->
                <CourseStepSidebar :current-step="currentStep" @go-to-step="goToStep" />

                <!-- Main content card -->
                <div class="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm">

                    <!-- Back button -->
                    <div class="px-6 sm:px-8 pt-6 border-b border-gray-100">
                        <button v-if="!isFirstStep"
                            class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                            @click="prevStep">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    </div>

                    <!-- Step content -->
                    <div class="px-6 sm:px-8 py-6">
                        <Transition name="step" mode="out-in">
                            <component :is="currentStepComponent" :key="currentStep" v-model="form"
                                :ref="(el) => { stepRef = el as { validate?: () => boolean } }" />
                        </Transition>
                    </div>

                    <!-- Footer actions -->
                    <div
                        class="px-6 sm:px-8 pb-6 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-gray-100 mt-4 pt-5">
                        <button
                            class="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                            @click="saveDraft">
                            Save as Draft
                        </button>
                        <button
                            class="w-full sm:w-auto px-8 py-2.5 rounded-xl text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition-colors shadow-sm"
                            @click="handleNext">
                            {{ isLastStep ? 'Publish Course' : 'Continue' }}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useCreateCourse } from '@/features/courses/composables/useCreateCourse'
import CourseStepSidebar from '@/features/courses/components/create-steps/CourseStepSidebar.vue'
import CourseStepBasicInfo from '@/features/courses/components/create-steps/CourseStepBasicInfo.vue'
import CourseStepCurriculum from '@/features/courses/components/create-steps/CourseStepCurriculum.vue'
import CourseStepPricing from '@/features/courses/components/create-steps/CourseStepPricing.vue'
import CourseStepPublish from '@/features/courses/components/create-steps/CourseStepPublish.vue'

const { currentStep, form, isFirstStep, isLastStep, nextStep, prevStep, goToStep, saveDraft, publishCourse } = useCreateCourse()

// Har bir step uchun component mapping
const stepComponents = [
    CourseStepBasicInfo,
    CourseStepCurriculum,
    CourseStepPricing,
    CourseStepPublish,
]

const currentStepComponent = computed(() => stepComponents[currentStep.value - 1])

// Step component ref — validate() chaqirish uchun
const stepRef = shallowRef<{ validate?: () => boolean }>()

async function handleNext() {
    const isValid = stepRef.value?.validate?.() ?? true
    if (!isValid) return
    if (isLastStep.value) {
        await publishCourse()
        return
    }
    nextStep()
}
</script>

<style scoped>
.step-enter-active,
.step-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.step-enter-from {
    opacity: 0;
    transform: translateX(16px);
}

.step-leave-to {
    opacity: 0;
    transform: translateX(-16px);
}
</style>