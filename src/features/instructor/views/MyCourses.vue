<template>
    <div>
        <div class="flex items-center justify-between mb-5">
            <h1 class="text-2xl font-bold text-gray-900">My Courses</h1>
            <button @click="isModalOpen = true" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold
               px-6 py-2.5 rounded-full text-sm transition-colors cursor-pointer">
                + Create New Course
            </button>
        </div>

        <!-- Filters + Sort -->
        <div class="flex items-center gap-2">
            <button v-for="tab in tabs" :key="tab.value" @click="onTabClick(tab.value)" :class="[
                'px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer',
                activeTab === tab.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
            ]">
                {{ tab.label }}
            </button>
            <AppSelect v-model="selectedStatus" :options="statusOptions" placeholder="Status"
                @select="onStatusSelect" />

        </div>
        <!--  instructor course table -->
        <CourseTable />

        <AppPagination :params="paginationParams" @change-page="onPageChange" />
    </div>

    <CourseFormModal v-model:is-open="isModalOpen" :mode="modalMode" :course="courses" @submitted="onSubmitted" />



</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { PaginationParams } from '@/shared/components/ui/AppPagination.vue'
import AppPagination from '@/shared/components/ui/AppPagination.vue'
import type { SelectOption } from '@/shared/components/ui/AppSelect.vue'
import AppSelect from '@/shared/components/ui/AppSelect.vue'
import CourseTable from '../components/CourseTable.vue'
import CourseFormModal from '../components/CourseFormModal.vue'
import type { Course } from '../types/course.types'

const isModalOpen = ref(false)
const modalMode = ref<'create' | 'edit'>('edit')
const selectedCourse = ref<Course | null>(null)

const courses = ref<Course>(
    { id: 1, title: 'Vue 3', description: '...', price: 49, status: 'published' },
)


function onSubmitted() {
    console.log('Muvaffaqiyatli saqlandi!')
}


const statusOptions: SelectOption[] = [
    { label: 'Published', value: 'published' },
    { label: 'Draft', value: 'draft' },
    { label: 'Archived', value: 'archived' },
]

const tabs = [
    { label: 'Published', value: 'published' },
    { label: 'Draft', value: 'draft' },
    { label: 'Archived', value: 'archived' },
]

const activeTab = ref<string>('published')

function onTabClick(value: string) {
    console.log('Selected tab:', value)
    activeTab.value = value
}

const onStatusSelect = (option: SelectOption) => {
    console.log('Selected status:', option.value)
}


const selectedStatus = ref<string | number | null>(null)


const paginationParams = reactive<PaginationParams>({
    page: 1,
    last_page: 10,
})

function onPageChange(page: number) {
    paginationParams.page = page
}




</script>

<style scoped lang="scss"></style>