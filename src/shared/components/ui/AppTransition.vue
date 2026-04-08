<template>
    <transition :name="name" :mode="mode" :appear="appear">
        <slot />
    </transition>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        name?: string
        mode?: 'in-out' | 'out-in' | 'default'
        appear?: boolean
        duration?: number
        easing?: string
    }>(),
    {
        name: 'app-fade',
        mode: 'out-in',
        appear: false,
        duration: 300,
        easing: 'ease',
    }
)
</script>

<style>
.app-fade-enter-active,
.app-fade-leave-active {
    transition: opacity v-bind("duration + 'ms'") v-bind(easing);
}

.app-fade-enter-from,
.app-fade-leave-to {
    opacity: 0;
}
</style>