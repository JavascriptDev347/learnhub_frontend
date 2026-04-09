<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    type ChartOptions,
    type ChartData,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

interface Props {
    title?: string
    completed?: number
    inProgress?: number
    notStarted?: number
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Course Completion',
    completed: 55,
    inProgress: 30,
    notStarted: 15,
})

const chartData = computed<ChartData<'pie'>>(() => ({
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
        {
            data: [props.completed, props.inProgress, props.notStarted],
            backgroundColor: ['#3B82F6', '#FACC15', '#EF4444'],
            borderWidth: 0,
            hoverOffset: 8,
        },
    ],
}))

const chartOptions = computed<ChartOptions<'pie'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'right',
            labels: {
                color: '#374151',
                font: { size: 13 },
                padding: 16,
                usePointStyle: true,
                pointStyle: 'rect',
            },
        },
        tooltip: {
            backgroundColor: '#fff',
            titleColor: '#111827',
            bodyColor: '#374151',
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
                label: (ctx) => `  ${ctx.label}: ${ctx.parsed}%`,
            },
        },
    },
}))
</script>

<template>
    <div class="w-full rounded-2xl bg-white p-6">
        <h2 class="mb-6 text-xl font-semibold text-gray-900">{{ props.title }}</h2>

        <!-- position: relative + explicit height — responsive fix -->
        <div class="w-full" style="position: relative; height: 240px;">
            <Pie :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>