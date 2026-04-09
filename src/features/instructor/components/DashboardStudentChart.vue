<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartOptions,
    type ChartData,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Props {
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Student Monthly Engagement',
})

const chartData = computed<ChartData<'bar'>>(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Students',
            data: [75, 85, 52, 93, 115, 83, 104, 97, 125, 80, 101, 83],
            backgroundColor: '#FACC15',
            borderRadius: 6,
            borderSkipped: false,
        },
    ],
}))

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
    responsive: true,
    maintainAspectRatio: false, // ← balandlikni biz boshqaramiz
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#fff',
            titleColor: '#111827',
            bodyColor: '#374151',
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
                label: (ctx) => ` ${ctx.parsed.y} students`,
            },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#6B7280', font: { size: 12 }, autoSkip: false },
        },
        y: {
            beginAtZero: true,
            max: 140,
            grid: { color: 'rgba(0,0,0,0.06)' },
            border: { display: false, dash: [4, 4] },
            ticks: { color: '#6B7280', font: { size: 12 }, stepSize: 20 },
        },
    },
}))
</script>

<template>
    <div class="w-full rounded-2xl bg-white p-6">
        <!-- Header -->
        <div class="mb-6 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">{{ props.title }}</h2>
            <div class="flex items-center gap-2 text-xs text-gray-500">
                <span class="inline-block h-2.5 w-2.5 rounded-sm bg-yellow-400"></span>
                Monthly Engagement
            </div>
        </div>

        <!--
      FIX: Chart.js canvas ning parent'i:
        1. position: relative  — Chart.js shu elementni kuzatadi
        2. width: 100%         — gorizontal to'liq kenglik
        3. height: aniq px     — maintainAspectRatio: false bo'lganda shart

      Faqat Tailwind class (h-64) berish ishlamaydi — ba'zida Chart.js
      uni "0px" deb o'qiydi. Shuning uchun inline style ishlatiladi.
    -->
        <div class="w-full" style="position: relative; height: 260px;">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>