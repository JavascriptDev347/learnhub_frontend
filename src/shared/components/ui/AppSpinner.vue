<script setup lang="ts">
/**
 * OrbitSpinner — Rotating dots spinner
 *
 * Usage:
 *   <OrbitSpinner />
 *   <OrbitSpinner size="lg" color="emerald" label="Yuklanmoqda..." />
 */

type Size = 'sm' | 'md' | 'lg' | 'xl'
type Color = 'indigo' | 'emerald' | 'coral' | 'amber' | 'rose' | 'sky' | 'slate'

interface Props {
    size?: Size
    color?: Color
    label?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'indigo',
    label: '',
})

const sizeMap: Record<Size, { wrapper: string; dot: string }> = {
    sm: { wrapper: 'w-5 h-5', dot: 'w-1.5 h-1.5' },
    md: { wrapper: 'w-10 h-10', dot: 'w-2.5 h-2.5' },
    lg: { wrapper: 'w-14 h-14', dot: 'w-3.5 h-3.5' },
    xl: { wrapper: 'w-20 h-20', dot: 'w-5 h-5' },
}

const colorMap: Record<Color, string> = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    coral: 'bg-orange-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    sky: 'bg-sky-500',
    slate: 'bg-slate-500',
}

const dots = [
    { position: 'top-0 left-1/2 -translate-x-1/2', delay: 0 },
    { position: 'top-1/2 right-0 -translate-y-1/2', delay: 0.3 },
    { position: 'bottom-0 left-1/2 -translate-x-1/2', delay: 0.6 },
    { position: 'top-1/2 left-0 -translate-y-1/2', delay: 0.9 },
]
</script>

<template>
    <div class="inline-flex flex-col items-center gap-2" role="status" :aria-label="label || 'Loading'">
        <div :class="[sizeMap[size].wrapper, 'relative animate-[orbit_1.6s_linear_infinite]']">
            <span v-for="(dot, i) in dots" :key="i" :class="[
                'absolute rounded-full',
                sizeMap[size].dot,
                colorMap[color],
                dot.position,
            ]" :style="{ animation: `dot-pulse 1.2s ease-in-out ${dot.delay}s infinite` }" />
        </div>

        <span v-if="label" class="text-sm font-medium text-gray-500 dark:text-gray-400">
            {{ label }}
        </span>

        <span class="sr-only">{{ label || 'Loading' }}</span>
    </div>
</template>

<style scoped>
@keyframes orbit {
    to {
        transform: rotate(360deg);
    }
}

@keyframes dot-pulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(0.5);
        opacity: 0.4;
    }
}
</style>