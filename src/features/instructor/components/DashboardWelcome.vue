<script setup lang="ts">
interface Stat {
    title: string
    value: number | string
    increase: string
    color?: string
}

const stats: Stat[] = [
    { title: 'Total Students', value: 450, increase: '5% increase' },
    { title: 'Courses Active', value: 12, increase: '3% increase' },
    { title: 'Assignments Graded', value: 120, increase: '10% increase' },
    { title: 'Feedback Received', value: 50, increase: '2% increase' },
]
</script>

<template>
    <div class="space-y-8  py-8">
        <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900">
                Welcome, <span class="text-yellow-500">John!</span>
            </h1>
            <p class="mt-2 text-gray-600 text-lg">
                Here's how your courses are performing today.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(stat, i) in stats" :key="i"
                class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                <p class="text-sm font-medium text-gray-500">{{ stat.title }}</p>
                <div class="mt-4">
                    <span class="text-4xl font-semibold text-gray-900">{{ stat.value }}</span>
                </div>
                <div class="mt-2 flex items-center text-emerald-600 text-sm font-medium">
                    <span class="inline-block w-4 h-4 mr-1">↑</span>
                    {{ stat.increase }}
                </div>
            </div>
        </div>
    </div>
</template>