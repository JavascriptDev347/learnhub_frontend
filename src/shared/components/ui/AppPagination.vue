<script setup lang="ts">
import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'

export interface PaginationParams {
    page: number
    last_page: number
}

interface Props {
    params: PaginationParams
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'change-page': [page: number]
}>()

function onPageChange(page: number) {
    emit('change-page', page)
}
</script>

<template>
    <div class="custom-pagination">
        <v-pagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#DCEDFF"
            @update:modelValue="onPageChange" />
    </div>
</template>

<style lang="scss">
.custom-pagination {
    display: flex;
    justify-content: end;
}
</style>