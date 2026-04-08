<template>
    <form class="course-form" @submit.prevent="handleSubmit">

        <BaseInput v-model="form.title" label="Kurs nomi" placeholder="Masalan: Vue 3 boshliqdan professional darajaga"
            width="100%" :error="errors.title" />

        <BaseInput v-model="form.description" label="Tavsif" placeholder="Kurs haqida qisqacha..." width="100%"
            :error="errors.description" />

        <div class="course-form__row">
            <BaseInput v-model.number="form.price" type="number" label="Narxi ($)" placeholder="0" width="100%"
                :error="errors.price" />

            <div class="course-form__group">
                <label class="course-form__label">Holati</label>
                <select v-model="form.status" class="course-form__select">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>
            </div>
        </div>

    </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseInput from '@/shared/components/ui/BaseInput.vue'
import type { Course, CourseForm as CourseFormType } from '../types/course.types'
// ---------- Types ----------
interface Props {
    mode: 'create' | 'edit'
    course?: Course | null
    isLoading?: boolean
}

// ---------- Props & Emits ----------
const props = withDefaults(defineProps<Props>(), {
    course: null,
    isLoading: false,
})

const emit = defineEmits<{
    submit: [payload: CourseFormType]
}>()

// ---------- State ----------
const defaultForm: CourseFormType = {
    title: '',
    description: '',
    price: 0,
    status: 'draft',
}

const form = ref<CourseFormType>({ ...defaultForm })
const errors = ref<Partial<Record<keyof CourseFormType, string>>>({})

// ---------- Edit rejimida to'ldirish ----------
watch(
    () => props.course,
    (course) => {
        if (props.mode === 'edit' && course) {
            form.value = {
                title: course.title,
                description: course.description,
                price: course.price,
                status: course.status,
            }
        } else {
            form.value = { ...defaultForm }
        }
        errors.value = {}
    },
    { immediate: true }
)

// ---------- Validation ----------
function validate(): boolean {
    errors.value = {}

    if (!form.value.title.trim()) {
        errors.value.title = 'Kurs nomi majburiy'
    }
    if (form.value.price < 0) {
        errors.value.price = "Narx manfiy bo'lishi mumkin emas"
    }

    return Object.keys(errors.value).length === 0
}

// ---------- Submit (parent chaqiradi) ----------
function handleSubmit() {
    if (!validate()) return
    emit('submit', { ...form.value })
}

// Parent "submit" tugmasini bosganida shu funksiyani chaqiradi
defineExpose({ handleSubmit })
</script>

<style scoped>
.course-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.course-form__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.course-form__group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}

.course-form__label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
}

.course-form__select {
    height: 56px;
    padding: 0 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 1rem;
    color: #111827;
    background-color: #fff;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.course-form__select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}
</style>