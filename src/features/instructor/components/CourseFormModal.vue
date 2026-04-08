<template>
    <AppModal :model-value="isOpen" :title="mode === 'create' ? 'Yangi kurs yaratish' : 'Kursni tahrirlash'"
        width="600px" max-height="85vh" :close-on-esc="true" :close-on-backdrop="true" :show-close="true"
        @update:model-value="emit('update:isOpen', $event)" @close="emit('update:isOpen', false)">
        <!-- Form -->
        <CourseForm ref="formRef" :mode="mode" :course="course" @submit="onFormSubmit" />

        <!-- Footer -->
        <template #footer>
            <div class="modal-footer">
                <button class="btn btn--ghost" type="button" @click="emit('update:isOpen', false)">
                    Bekor qilish
                </button>
                <button class="btn btn--primary" type="button" :disabled="isLoading" @click="formRef?.handleSubmit()">
                    <span v-if="isLoading" class="btn__spinner" />
                    {{ mode === 'create' ? 'Yaratish' : 'Saqlash' }}
                </button>
            </div>
        </template>
    </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppModal from '@/shared/components/ui/AppModal.vue'
import CourseForm from './CourseForm.vue'
import type { Course, CourseForm as CourseFormType } from '../types/course.types'

// ---------- Props & Emits ----------
interface Props {
    isOpen: boolean
    mode: 'create' | 'edit'
    course?: Course | null
}

const props = withDefaults(defineProps<Props>(), {
    course: null,
})

const emit = defineEmits<{
    'update:isOpen': [value: boolean]
    submitted: []
}>()

// ---------- State ----------
const formRef = ref<InstanceType<typeof CourseForm> | null>(null)
const isLoading = ref(false)

// ---------- Submit ----------
async function onFormSubmit(payload: CourseFormType) {
    try {
        isLoading.value = true

        if (props.mode === 'create') {
            // await courseApi.create(payload)
            console.log('CREATE:', payload)
        } else {
            // await courseApi.update(props.course!.id, payload)
            console.log('UPDATE:', props.course?.id, payload)
        }

        emit('submitted')
        emit('update:isOpen', false)
    } catch (e) {
        console.error(e)
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s, opacity 0.2s;
}

.btn--ghost {
    background-color: #f3f4f6;
    color: #374151;
}

.btn--ghost:hover {
    background-color: #e5e7eb;
}

.btn--primary {
    background-color: #facc15;
    color: #111827;
}

.btn--primary:hover {
    background-color: #eab308;
}

.btn--primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-top-color: #111827;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>