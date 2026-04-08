<template>
    <Teleport to="body">
        <App-Transition name="app-fade">
            <div v-if="modelValue" class="modal-backdrop" />
        </App-Transition>

        <div class="modal-wrapper" :class="{ 'modal-wrapper--visible': modelValue }" role="dialog" aria-modal="true"
            :aria-labelledby="title ? 'modal-title' : undefined" @click.self="closeOnBackdrop && close()">
            <App-Transition name="app-scale">
                <div v-if="modelValue" class="modal" :style="modalStyles">
                    <div v-if="title || $slots.header" class="modal__header">
                        <slot name="header">
                            <h3 id="modal-title" class="modal__title">{{ title }}</h3>
                        </slot>
                        <button v-if="showClose" class="modal__close" aria-label="Close modal" @click="close">
                            ✕
                        </button>
                    </div>

                    <div class="modal__body">
                        <slot />
                    </div>

                    <div v-if="$slots.footer" class="modal__footer">
                        <slot name="footer" />
                    </div>
                </div>
            </App-Transition>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, type CSSProperties } from 'vue'
import AppTransition from './AppTransition.vue'

interface Props {
    modelValue: boolean
    title?: string
    width?: string
    maxWidth?: string
    maxHeight?: string
    showClose?: boolean
    closeOnBackdrop?: boolean
    closeOnEsc?: boolean
    scrollable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    title: undefined,
    width: '50%',
    maxWidth: '900px',
    maxHeight: '80vh',
    showClose: true,
    closeOnBackdrop: true,
    closeOnEsc: true,
    scrollable: true,
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    close: []
}>()

const modalStyles = computed((): CSSProperties => ({
    width: props.width,
    maxWidth: props.maxWidth,
    maxHeight: props.maxHeight,
    overflowY: props.scrollable ? 'auto' : 'hidden',
}))

function close() {
    emit('update:modelValue', false)
    emit('close')
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.closeOnEsc && props.modelValue) {
        close()
    }
}

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            document.body.style.overflow = 'hidden'
            window.addEventListener('keydown', onKeydown)
        } else {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKeydown)
        }
    }
)
</script>

<style scoped>
/* Backdrop */
.modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

/* Wrapper centers the modal */
.modal-wrapper {
    position: fixed;
    inset: 0;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.modal-wrapper--visible {
    z-index: 1001;
    pointer-events: auto;
}

/* Modal box */
.modal {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    width: 50%;
    max-height: 80vh;
}

/* Header */
.modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    flex-shrink: 0;
}

.modal__title {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
    color: #111827;
}

.modal__close {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0.25rem;
    line-height: 1;
    border-radius: 0.25rem;
    transition: color 0.2s;
}

.modal__close:hover {
    color: #111827;
}

/* Body */
.modal__body {
    padding: 1.5rem;
    overflow-y: auto;
    flex: 1;
}

/* Footer */
.modal__footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    flex-shrink: 0;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
}

/* Transitions */
.app-fade-enter-active,
.app-fade-leave-active {
    transition: opacity 0.25s ease;
}

.app-fade-enter-from,
.app-fade-leave-to {
    opacity: 0;
}

.app-scale-enter-active,
.app-scale-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.app-scale-enter-from,
.app-scale-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-8px);
}

/* Responsive */
@media (max-width: 990px) {
    .modal {
        width: 70% !important;
    }
}

@media (max-width: 768px) {
    .modal {
        width: 80% !important;
    }
}

@media (max-width: 576px) {
    .modal {
        width: 95% !important;
    }
}
</style>