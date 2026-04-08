<template>
    <form class="course-form" @submit.prevent="onSubmit">

        <BaseInput v-model="title" v-bind="titleAttrs" label="Kurs nomi"
            placeholder="Masalan: Vue 3 boshliqdan professional darajaga" width="100%" :error="errors.title" />

        <BaseInput v-model="description" v-bind="descriptionAttrs" label="Tavsif" placeholder="Kurs haqida qisqacha..."
            width="100%" :error="errors.description" />

        <div class="course-form__row">
            <BaseInput v-model="price" v-bind="priceAttrs" type="number" label="Narxi ($)" placeholder="0" width="100%"
                :error="errors.price" />

            <div class="course-form__group">
                <label class="course-form__label">Holati</label>
                <select v-model="status" v-bind="statusAttrs" class="course-form__select">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>
            </div>
        </div>

    </form>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseInput from '@/shared/components/ui/BaseInput.vue'
import { courseSchema } from '../types/course.schema'
import type { Course, CourseForm as CourseFormType } from '../types/course.types'

// ---------- Props & Emits ----------
interface Props {
    mode: 'create' | 'edit'
    course?: Course | null
    isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    course: null,
    isLoading: false,
})

const emit = defineEmits<{
    submit: [payload: CourseFormType]
}>()

// ---------- VeeValidate ----------
const { defineField, handleSubmit, errors, resetForm, setValues } = useForm<CourseFormType>({
    validationSchema: toTypedSchema(courseSchema),
    initialValues: {
        title: '',
        description: '',
        price: 0,
        status: 'draft',
    },
})

const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [price, priceAttrs] = defineField('price')
const [status, statusAttrs] = defineField('status')

// ---------- Edit rejimida formni to'ldirish ----------
watch(
    () => props.course,
    (course) => {
        if (props.mode === 'edit' && course) {
            setValues({
                title: course.title,
                description: course.description,
                price: course.price,
                status: course.status,
            })
        } else {
            resetForm()
        }
    },
    { immediate: true }
)

// ---------- Submit ----------
const onSubmit = handleSubmit((values) => {
    emit('submit', values)
})

defineExpose({ onSubmit, resetForm })
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