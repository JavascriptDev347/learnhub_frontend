<template>
    <div>
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Basic Info</h1>
            <p class="text-gray-500 text-sm mt-1">
                Add the course title, description, category, and a thumbnail.
            </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-6">
            <!-- Left fields -->
            <div class="flex-1 flex flex-col gap-4">
                <BaseInput v-model="localForm.title" label="Course Title"
                    placeholder="e.g. Vue 3 from zero to professional" width="100%" :error="errors.title"
                    @input="clearError('title')" />

                <BaseInput v-model="localForm.shortDescription" label="Short Description"
                    placeholder="Brief summary of the course" width="100%" :error="errors.shortDescription"
                    @input="clearError('shortDescription')" />

                <!-- Category -->
                <div class="flex flex-col gap-1.5">
                    <label class="text-sm font-semibold text-gray-800">Category</label>
                    <select v-model="localForm.category" class="base-select"
                        :class="{ 'border-red-400 focus:border-red-400 focus:shadow-red': errors.category }"
                        @change="clearError('category')">
                        <option value="" disabled>Select category</option>
                        <option value="web-dev">Web Development</option>
                        <option value="mobile">Mobile Development</option>
                        <option value="design">Design</option>
                        <option value="data-science">Data Science</option>
                    </select>
                    <p v-if="errors.category" class="text-xs text-red-500 mt-0.5">
                        {{ errors.category }}
                    </p>
                </div>

                <!-- Overview -->
                <div class="flex flex-col gap-1.5">
                    <label class="text-sm font-semibold text-gray-800">Full Course Overview</label>
                    <textarea v-model="localForm.overview" rows="5" placeholder="Detailed description..."
                        class="base-textarea"
                        :class="{ 'border-red-400 focus:border-red-400 focus:shadow-red': errors.overview }"
                        @input="clearError('overview')" />
                    <p v-if="errors.overview" class="text-xs text-red-500 mt-0.5">
                        {{ errors.overview }}
                    </p>
                </div>

                <!-- Level + Duration -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label class="text-sm font-semibold text-gray-800">Level</label>
                        <select v-model="localForm.level" class="base-select"
                            :class="{ 'border-red-400 focus:border-red-400 focus:shadow-red': errors.level }"
                            @change="clearError('level')">
                            <option value="" disabled>Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <p v-if="errors.level" class="text-xs text-red-500 mt-0.5">
                            {{ errors.level }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label class="text-sm font-semibold text-gray-800">Estimated Duration</label>
                        <select v-model="localForm.duration" class="base-select"
                            :class="{ 'border-red-400 focus:border-red-400 focus:shadow-red': errors.duration }"
                            @change="clearError('duration')">
                            <option value="" disabled>Select duration</option>
                            <option value="0-2">0–2 hours</option>
                            <option value="2-5">2–5 hours</option>
                            <option value="5-10">5–10 hours</option>
                            <option value="10+">10+ hours</option>
                        </select>
                        <p v-if="errors.duration" class="text-xs text-red-500 mt-0.5">
                            {{ errors.duration }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Thumbnail upload -->
            <div class="w-full lg:w-72 flex-shrink-0">
                <label class="text-sm font-semibold text-gray-800 block mb-1.5">Thumbnail</label>
                <div class="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all"
                    style="height: 200px" @click="triggerFileInput" @dragover.prevent @drop.prevent="onDrop">
                    <img v-if="previewUrl" :src="previewUrl" class="w-full h-full object-cover rounded-xl" />
                    <template v-else>
                        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <p class="text-sm text-gray-500">Thumbnail Upload</p>
                        <p class="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                    </template>
                </div>
                <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="onFileChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BaseInput from '@/shared/components/ui/BaseInput.vue'
import type { CreateCourseForm } from '../../types/create-course.type'
import { basicInfoSchema } from '../../types/course.schema';

interface Props {
    modelValue: CreateCourseForm
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: CreateCourseForm]
}>()

const localForm = reactive({ ...props.modelValue })
const errors = ref<Partial<Record<string, string>>>({})
const fileInputRef = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)

// Foydalanuvchi yozishni boshlaganida error ni tozalaydi
function clearError(field: string) {
    if (errors.value[field]) {
        errors.value[field] = undefined
    }
    syncParent()
}

function triggerFileInput() {
    fileInputRef.value?.click()
}

function onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    localForm.thumbnail = file
    previewUrl.value = URL.createObjectURL(file)
    syncParent()
}

function onDrop(e: DragEvent) {
    const file = e.dataTransfer?.files?.[0]
    if (!file) return
    localForm.thumbnail = file
    previewUrl.value = URL.createObjectURL(file)
    syncParent()
}

// Ota-komponent "Next" bosganda chaqiradigan funksiya
function validate(): boolean {
    errors.value = {}

    const result = basicInfoSchema.safeParse(localForm)

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors

        Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (messages?.[0]) {
                errors.value[field] = messages[0]
            }
        })

        return false
    }

    return true
}

function syncParent() {
    emit('update:modelValue', { ...props.modelValue, ...localForm })
}

defineExpose({ validate })
</script>

<style scoped>
.base-select,
.base-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 0.9375rem;
    color: #111827;
    background-color: #fff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.base-select:focus,
.base-textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.base-textarea {
    resize: vertical;
    min-height: 120px;
}

/* Error holati uchun qizil shadow */
.focus\:shadow-red:focus {
    box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.15);
}
</style>