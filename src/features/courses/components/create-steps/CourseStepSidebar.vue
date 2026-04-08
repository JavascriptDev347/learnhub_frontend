<template>
    <!-- Desktop sidebar -->
    <aside class="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0">
        <h2 class="text-lg font-bold text-gray-900 mb-8">Create New Course</h2>

        <ol class="flex flex-col gap-0">
            <li v-for="(step, index) in steps" :key="step.id" class="flex gap-4">
                <!-- Indicator column -->
                <div class="flex flex-col items-center">
                    <!-- Circle -->
                    <button
                        class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-300 border-2"
                        :class="circleClass(step.id)" @click="$emit('go-to-step', step.id)">
                        <!-- Checkmark if completed -->
                        <svg v-if="getStepStatus(step.id) === 'completed'" class="w-5 h-5" fill="none"
                            stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span v-else>{{ step.id }}</span>
                    </button>

                    <!-- Connector line -->
                    <div v-if="index < steps.length - 1"
                        class="w-0.5 flex-1 my-1 min-h-[2rem] transition-colors duration-300"
                        :class="getStepStatus(step.id) === 'completed' ? 'bg-yellow-400' : 'bg-gray-200'" />
                </div>

                <!-- Text -->
                <div class="pb-8">
                    <p class="text-xs font-bold tracking-wide uppercase transition-colors duration-300"
                        :class="getStepStatus(step.id) === 'pending' ? 'text-gray-400' : 'text-gray-900'">
                        {{ step.label }}
                    </p>
                    <p class="text-sm mt-0.5 transition-colors duration-300"
                        :class="getStepStatus(step.id) === 'active' ? 'text-yellow-600 font-semibold' : 'text-gray-500'">
                        {{ step.description }}
                    </p>
                </div>
            </li>
        </ol>
    </aside>

    <!-- Mobile step bar -->
    <div class="lg:hidden w-full mb-6">
        <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-semibold text-gray-700">
                Step {{ currentStep }} of {{ steps.length }}
            </span>
            <span class="text-sm text-yellow-600 font-semibold">
                {{ steps[currentStep - 1]?.description }}
            </span>
        </div>
        <!-- Progress bar -->
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-yellow-400 rounded-full transition-all duration-500"
                :style="{ width: `${(currentStep / steps.length) * 100}%` }" />
        </div>
        <!-- Mobile step dots -->
        <div class="flex justify-center gap-3 mt-3">
            <button v-for="step in steps" :key="step.id" class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                :class="{
                    'bg-yellow-400 scale-125': step.id === currentStep,
                    'bg-green-400': getStepStatus(step.id) === 'completed',
                    'bg-gray-300': getStepStatus(step.id) === 'pending',
                }" @click="$emit('go-to-step', step.id)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { STEPS } from '../../composables/useCreateCourse'
import type { Step, StepStatus } from '../../types/create-course.type';

interface Props {
    currentStep: number
    steps?: Step[]
}

const props = withDefaults(defineProps<Props>(), {
    steps: () => STEPS,
})

defineEmits<{
    'go-to-step': [stepId: number]
}>()

function getStepStatus(stepId: number): StepStatus {
    if (stepId < props.currentStep) return 'completed'
    if (stepId === props.currentStep) return 'active'
    return 'pending'
}

function circleClass(stepId: number) {
    const status = getStepStatus(stepId)
    return {
        'bg-yellow-400 border-yellow-400 text-gray-900': status === 'completed',
        'bg-yellow-400 border-yellow-400 text-gray-900 ring-4 ring-yellow-100': status === 'active',
        'bg-white border-gray-300 text-gray-400': status === 'pending',
    }
}
</script>