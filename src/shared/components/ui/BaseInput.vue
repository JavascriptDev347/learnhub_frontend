<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'

// ──────────────────────────────────────────────
// Props
// ──────────────────────────────────────────────
export interface Props {
    modelValue?: string
    type?: string
    placeholder?: string
    label?: string
    size?: 'sm' | 'md' | 'lg'
    width?: string
    disabled?: boolean
    readonly?: boolean
    error?: string
    // Icons — faqat nom berasan, slot orqali ham mumkin
    prefixIcon?: string
    suffixIcon?: string
    // Action callbacks — icon bosilganda
    onPrefixAction?: () => void
    onSuffixAction?: () => void
    // Password toggle — avtomatik suffix icon + action
    toggleable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    placeholder: '',
    label: '',
    size: 'md',
    width: '600px',
    disabled: false,
    readonly: false,
    error: '',
    prefixIcon: '',
    suffixIcon: '',
    toggleable: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
    'focus': [event: FocusEvent]
    'blur': [event: FocusEvent]
    'keydown': [event: KeyboardEvent]
    'prefix-click': []
    'suffix-click': []
}>()

const slots = useSlots()

// ──────────────────────────────────────────────
// Internal state
// ──────────────────────────────────────────────
const isFocused = ref(false)
const isPasswordVisible = ref(false)

// ──────────────────────────────────────────────
// Computed
// ──────────────────────────────────────────────
const actualType = computed(() => {
    if (props.type === 'password' && isPasswordVisible.value) return 'text'
    return props.type
})

const isToggleable = computed(() => {
    return props.toggleable || props.type === 'password'
})

const hasPrefixIcon = computed(() => !!props.prefixIcon || !!slots['prefix-icon'])
const hasSuffixIcon = computed(() => !!props.suffixIcon || !!slots['suffix-icon'] || isToggleable.value)
const hasPrefixAction = computed(() => !!props.onPrefixAction)
const hasSuffixAction = computed(() => !!props.onSuffixAction || isToggleable.value)

const hasError = computed(() => !!props.error)

// Size konfiguratsiyasi
const sizeConfig = computed(() => {
    const sizes = {
        sm: {
            height: '40px',
            inputClass: 'text-sm',
            labelClass: 'text-xs mb-1',
            iconSize: 'w-4 h-4',
            paddingX: 'px-3',
            errorClass: 'text-xs mt-1',
        },
        md: {
            height: '56px',
            inputClass: 'text-base',
            labelClass: 'text-sm mb-1.5',
            iconSize: 'w-5 h-5',
            paddingX: 'px-4',
            errorClass: 'text-sm mt-1.5',
        },
        lg: {
            height: '71px',
            inputClass: 'text-lg',
            labelClass: 'text-base mb-2',
            iconSize: 'w-6 h-6',
            paddingX: 'px-5',
            errorClass: 'text-sm mt-1.5',
        },
    }
    return sizes[props.size]
})

// Wrapper stilini hisoblash
const wrapperStyle = computed(() => ({
    width: props.width,
    maxWidth: '100%',
}))

const inputWrapperStyle = computed(() => ({
    height: sizeConfig.value.height,
}))

// ──────────────────────────────────────────────
// Handlers
// ──────────────────────────────────────────────
function onInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

function onFocus(event: FocusEvent) {
    isFocused.value = true
    emit('focus', event)
}

function onBlur(event: FocusEvent) {
    isFocused.value = false
    emit('blur', event)
}

function onKeydown(event: KeyboardEvent) {
    emit('keydown', event)
}

function handlePrefixClick() {
    if (props.disabled) return
    props.onPrefixAction?.()
    emit('prefix-click')
}

function handleSuffixClick() {
    if (props.disabled) return
    if (isToggleable.value) {
        isPasswordVisible.value = !isPasswordVisible.value
        return
    }
    props.onSuffixAction?.()
    emit('suffix-click')
}
</script>

<template>
    <div :style="wrapperStyle" class="base-input">
        <!-- Label -->
        <label v-if="label" :class="[
            sizeConfig.labelClass,
            'block font-semibold text-gray-800 select-none',
            { 'text-red-500': hasError },
        ]">
            {{ label }}
        </label>

        <!-- Input wrapper -->
        <div :style="inputWrapperStyle" :class="[
            'relative flex items-center rounded-xl border bg-white transition-all duration-200',
            sizeConfig.paddingX,
            {
                // Normal holat
                'border-gray-200 hover:border-gray-300': !hasError && !isFocused,
                // Focus holat
                'border-blue-500 ring-4 ring-blue-500/10': isFocused && !hasError,
                // Error holat
                'border-red-500 ring-4 ring-red-500/10': hasError,
                // Disabled holat
                'bg-gray-50 opacity-60 cursor-not-allowed': disabled,
            },
        ]">
            <!-- Prefix Icon -->
            <div v-if="hasPrefixIcon" :class="[
                'flex-shrink-0 flex items-center justify-center mr-3 text-gray-400',
                { 'cursor-pointer hover:text-gray-600 active:scale-95 transition-all': hasPrefixAction && !disabled },
            ]" @click="handlePrefixClick">
                <slot name="prefix-icon">
                    <span :class="sizeConfig.iconSize" v-html="prefixIcon" />
                </slot>
            </div>

            <!-- Input -->
            <input :type="actualType" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
                :readonly="readonly" :class="[
                    'flex-1 w-full h-full bg-transparent outline-none text-gray-900 placeholder-gray-400',
                    sizeConfig.inputClass,
                    { 'cursor-not-allowed': disabled },
                ]" @input="onInput" @focus="onFocus" @blur="onBlur" @keydown="onKeydown" />

            <!-- Suffix Icon / Password Toggle -->
            <div v-if="hasSuffixIcon" :class="[
                'flex-shrink-0 flex items-center justify-center ml-3 text-gray-400',
                { 'cursor-pointer hover:text-gray-600 active:scale-95 transition-all': hasSuffixAction && !disabled },
            ]" @click="handleSuffixClick">
                <slot name="suffix-icon">
                    <!-- Password toggle default icon -->
                    <template v-if="isToggleable">
                        <!-- Eye Open -->
                        <svg v-if="isPasswordVisible" :class="sizeConfig.iconSize" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <!-- Eye Closed -->
                        <svg v-else :class="sizeConfig.iconSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path
                                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                    </template>
                    <!-- Custom suffix icon -->
                    <span v-else :class="sizeConfig.iconSize" v-html="suffixIcon" />
                </slot>
            </div>
        </div>

        <!-- Error message -->
        <Transition enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1">
            <p v-if="hasError" :class="[sizeConfig.errorClass, 'text-red-500 font-medium']">
                {{ error }}
            </p>
        </Transition>
    </div>
</template>

<style scoped>
/* Autofill stillarini toza saqlash */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-text-fill-color: #111827;
    transition: background-color 5000s ease-in-out 0s;
}

/* Number inputdan o'qlarni olib tashlash */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
}

/* Search inputdan x tugmasini olib tashlash */
input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
}
</style>