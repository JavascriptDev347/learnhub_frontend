<template>
    <div ref="selectRef" class="relative w-fit">
        <button @click="isOpen = !isOpen" :class="[
            'flex items-center text-[14px] gap-2 px-4 py-2 rounded-lg text-sm transition-all cursor-pointer',
            'focus:outline-none',
            bgColor === 'white'
                ? 'bg-white border-none'
                : `${bgColor} border border-gray-200`,
        ]">
            <span :class="selectedOption ? 'text-gray-900' : 'text-gray-400'">
                {{ selectedOption?.label ?? placeholder }}
            </span>
            <svg :class="['w-4 h-4 text-gray-500 transition-transform', { 'rotate-180': isOpen }]" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
            <ul v-if="isOpen" class="absolute z-50 mt-1 w-full min-w-max bg-white border border-gray-200
               rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto">
                <li v-for="option in options" :key="option.value" @click="selectOption(option)" :class="[
                    'px-4 py-2 text-sm cursor-pointer transition-colors',
                    modelValue === option.value
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-50',
                ]">
                    <slot name="option" :option="option">
                        {{ option.label }}
                    </slot>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface SelectOption {
    label: string
    value: string | number
}

interface Props {
    options: SelectOption[]
    modelValue?: string | number | null
    placeholder?: string
    bgColor?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    placeholder: 'Select...',
    bgColor: 'white',
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
    'select': [option: SelectOption]
}>()

const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() =>
    props.options.find((opt) => opt.value === props.modelValue) ?? null,
)

function selectOption(option: SelectOption) {
    emit('update:modelValue', option.value)
    emit('select', option)
    isOpen.value = false
}

function onClickOutside(e: MouseEvent) {
    if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>