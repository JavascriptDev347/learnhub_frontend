<template>
    <button :type="type" :disabled="disabled" :class="[sizeClass, { 'opacity-50 cursor-not-allowed': disabled }]"
        :style="{ borderRadius: `${borderRadius}px` }" class="bg-yellow-400 text-gray-900 font-semibold transition-all duration-300
           hover:bg-yellow-500 active:scale-95  cursor-pointer
           inline-flex items-center justify-center" @click="handleClick">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonType = 'button' | 'submit' | 'reset'

interface Props {
    label?: string
    size?: ButtonSize
    borderRadius?: number
    type?: ButtonType
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    size: 'medium',
    borderRadius: 10,
    type: 'button',
    disabled: false,
})

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const sizeMap: Record<ButtonSize, string> = {
    small: 'w-[113px] h-[51px] text-sm',
    medium: 'w-[174px] h-[70px] text-base',
    large: 'w-[448px] h-[65px] text-lg',
}

const sizeClass = computed(() => sizeMap[props.size])

function handleClick(event: MouseEvent): void {
    if (props.disabled) return
    emit('click', event)
}
</script>