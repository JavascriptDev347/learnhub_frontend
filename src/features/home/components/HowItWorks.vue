<template>
    <section class="bg-white  overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <!-- Section Title -->
            <div class="mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    How It Works
                </h2>
            </div>

            <!-- Student Path -->
            <div class="mb-16">
                <p class="text-gray-500 text-sm font-medium mb-8 uppercase tracking-wide">
                    As a Student
                </p>

                <div class="relative">
                    <!-- Desktop: Horizontal layout -->
                    <div class="hidden lg:grid lg:grid-cols-4 gap-8">
                        <template v-for="(step, index) in studentSteps" :key="step.id">
                            <div class="relative flex flex-col items-center text-center">
                                <!-- Icon -->
                                <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                    :class="step.iconBg">
                                    <component :is="step.icon" class="w-7 h-7" :class="step.iconColor"
                                        stroke-width="2" />
                                </div>

                                <!-- Title -->
                                <h3 class="text-lg font-semibold text-gray-900">
                                    {{ step.title }}
                                </h3>

                                <!-- Arrow (except last item) -->
                                <svg v-if="index < studentSteps.length - 1"
                                    class="absolute top-8 -right-4 w-24 h-12 text-gray-800" viewBox="0 0 100 40"
                                    fill="none">
                                    <!-- Dotted curved path -->
                                    <path d="M0,20 Q25,5 50,20 T100,20" stroke="currentColor" stroke-width="2"
                                        stroke-dasharray="4 4" fill="none" marker-end="url(#arrowhead-student)" />
                                    <defs>
                                        <marker id="arrowhead-student" markerWidth="10" markerHeight="7" refX="9"
                                            refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                                        </marker>
                                    </defs>
                                </svg>
                            </div>
                        </template>
                    </div>

                    <!-- Mobile/Tablet: Vertical layout -->
                    <div class="lg:hidden space-y-8">
                        <template v-for="(step, index) in studentSteps" :key="step.id">
                            <div class="flex items-start gap-4">
                                <!-- Icon -->
                                <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                                    :class="step.iconBg">
                                    <component :is="step.icon" class="w-6 h-6" :class="step.iconColor"
                                        stroke-width="2" />
                                </div>

                                <div class="flex-1 pt-2">
                                    <h3 class="text-lg font-semibold text-gray-900 mb-1">
                                        {{ step.title }}
                                    </h3>
                                </div>
                            </div>

                            <!-- Vertical dotted line -->
                            <div v-if="index < studentSteps.length - 1"
                                class="ml-7 w-px h-8 border-l-2 border-dashed border-gray-400" />
                        </template>
                    </div>
                </div>
            </div>

            <!-- Teacher Path -->
            <div>
                <p class="text-gray-500 text-sm font-medium mb-8 uppercase tracking-wide">
                    As a Teacher
                </p>

                <div class="relative">
                    <!-- Desktop: Horizontal layout -->
                    <div class="hidden lg:grid lg:grid-cols-4 gap-8">
                        <template v-for="(step, index) in teacherSteps" :key="step.id">
                            <div class="relative flex flex-col items-center text-center">
                                <!-- Icon -->
                                <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                    :class="step.iconBg">
                                    <component :is="step.icon" class="w-7 h-7" :class="step.iconColor"
                                        stroke-width="2" />
                                </div>

                                <!-- Title -->
                                <h3 class="text-lg font-semibold text-gray-900">
                                    {{ step.title }}
                                </h3>

                                <!-- Arrow (except last item) -->
                                <svg v-if="index < teacherSteps.length - 1"
                                    class="absolute top-8 -right-4 w-24 h-12 text-yellow-400" viewBox="0 0 100 40"
                                    fill="none">
                                    <!-- Dotted curved path - direction changes -->
                                    <path :d="index === 1 ? 'M0,20 Q25,35 50,20 T100,20' : 'M0,20 Q25,5 50,20 T100,20'"
                                        stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" fill="none"
                                        :marker-end="`url(#arrowhead-teacher-${index})`" />
                                    <defs>
                                        <marker :id="`arrowhead-teacher-${index}`" markerWidth="10" markerHeight="7"
                                            refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                                        </marker>
                                    </defs>
                                </svg>
                            </div>
                        </template>
                    </div>

                    <!-- Mobile/Tablet: Vertical layout -->
                    <div class="lg:hidden space-y-8">
                        <template v-for="(step, index) in teacherSteps" :key="step.id">
                            <div class="flex items-start gap-4">
                                <!-- Icon -->
                                <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                                    :class="step.iconBg">
                                    <component :is="step.icon" class="w-6 h-6" :class="step.iconColor"
                                        stroke-width="2" />
                                </div>

                                <div class="flex-1 pt-2">
                                    <h3 class="text-lg font-semibold text-gray-900 mb-1">
                                        {{ step.title }}
                                    </h3>
                                </div>
                            </div>

                            <!-- Vertical dotted line -->
                            <div v-if="index < teacherSteps.length - 1"
                                class="ml-7 w-px h-8 border-l-2 border-dashed border-yellow-400" />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import {
    LogIn,
    GraduationCap,
    Monitor,
    Award,
    UserPlus,
    Library,
    CircleCheck,
    TrendingUp,
    type LucideIcon
} from 'lucide-vue-next'

interface Step {
    id: number
    title: string
    icon: LucideIcon
    iconBg: string
    iconColor: string
}

const studentSteps: Step[] = [
    {
        id: 1,
        title: 'Sign Up',
        icon: LogIn,
        iconBg: 'bg-gray-900',
        iconColor: 'text-yellow-400',
    },
    {
        id: 2,
        title: 'Choose Courses',
        icon: GraduationCap,
        iconBg: 'bg-gray-900',
        iconColor: 'text-yellow-400',
    },
    {
        id: 3,
        title: 'Start Learning',
        icon: Monitor,
        iconBg: 'bg-gray-900',
        iconColor: 'text-yellow-400',
    },
    {
        id: 4,
        title: 'Earn Certificates',
        icon: Award,
        iconBg: 'bg-gray-900',
        iconColor: 'text-yellow-400',
    },
]

const teacherSteps: Step[] = [
    {
        id: 1,
        title: 'Create an Account',
        icon: UserPlus,
        iconBg: 'bg-yellow-400',
        iconColor: 'text-gray-900',
    },
    {
        id: 2,
        title: 'Build Your Course',
        icon: Library,
        iconBg: 'bg-yellow-400',
        iconColor: 'text-gray-900',
    },
    {
        id: 3,
        title: 'Publish & Teach',
        icon: CircleCheck,
        iconBg: 'bg-yellow-400',
        iconColor: 'text-gray-900',
    },
    {
        id: 4,
        title: 'Track Students\' Progress',
        icon: TrendingUp,
        iconBg: 'bg-yellow-400',
        iconColor: 'text-gray-900',
    },
]
</script>