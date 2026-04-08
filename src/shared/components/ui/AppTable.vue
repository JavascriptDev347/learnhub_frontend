<template>
    <div class="app-table-wrapper">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th v-if="selectable" class="checkbox-col">
                            <label class="custom-checkbox">
                                <input type="checkbox" :checked="isAllSelected" :indeterminate="isIndeterminate"
                                    @change="toggleAll" />
                                <span class="checkmark"></span>
                            </label>
                        </th>
                        <th v-for="(header, i) in headers" :key="`header${i}`">
                            {{ header.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in body" :key="item.id" :class="{ 'row-selected': isSelected(item.id) }">
                        <td v-if="selectable" class="checkbox-col">
                            <label class="custom-checkbox">
                                <input type="checkbox" :checked="isSelected(item.id)" @change="toggleItem(item.id)" />
                                <span class="checkmark"></span>
                            </label>
                        </td>
                        <td v-for="(bodyInHeader, bodyHeaderIndex) in headers" :key="`bodyHeader${bodyHeaderIndex}`">
                            <slot :name="`body_${bodyInHeader.value}`" :item="item">
                                {{ item[bodyInHeader.value] ?? '-' }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="!body.length" class="empty-state">
            <span>No data</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface TableHeader {
    title: string
    value: string
}

export interface TableItem {
    id: string | number
    [key: string]: unknown
}

interface Props {
    headers?: TableHeader[]
    body?: TableItem[]
    selectable?: boolean
    selectedIds?: (string | number)[]
}

const props = withDefaults(defineProps<Props>(), {
    headers: () => [],
    body: () => [],
    selectable: false,
    selectedIds: () => [],
})

const emit = defineEmits<{
    'update:selectedIds': [ids: (string | number)[]]
}>()

// Selection logic
const isAllSelected = computed(
    () => props.body.length > 0 && props.selectedIds.length === props.body.length,
)

const isIndeterminate = computed(
    () => props.selectedIds.length > 0 && props.selectedIds.length < props.body.length,
)

function isSelected(id: string | number): boolean {
    return props.selectedIds.includes(id)
}

function toggleItem(id: string | number) {
    const newIds = isSelected(id)
        ? props.selectedIds.filter((selectedId) => selectedId !== id)
        : [...props.selectedIds, id]
    emit('update:selectedIds', newIds)
}

function toggleAll() {
    const newIds = isAllSelected.value ? [] : props.body.map((item) => item.id)
    emit('update:selectedIds', newIds)
}
</script>

<style scoped lang="scss">
.app-table-wrapper {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    margin-bottom: 30px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

/* ── Header ── */
thead {
    background: #f8f9fb;

    th {
        padding: 14px 24px;
        font-size: 13px;
        font-weight: 600;
        color: #4b5563;
        text-align: left;
        white-space: nowrap;
        border-bottom: 1px solid #e5e7eb;
        letter-spacing: 0.01em;
    }
}

/* ── Body ── */
tbody {
    tr {
        transition: background-color 0.15s ease;

        &:hover {
            background-color: #f9fafb;
        }

        &.row-selected {
            background-color: #eff6ff;
        }

        &:not(:last-child) td {
            border-bottom: 1px solid #f0f0f0;
        }
    }

    td {
        padding: 14px 24px;
        font-size: 14px;
        color: #374151;
        text-align: left;
        white-space: nowrap;
    }
}

/* ── Checkbox ── */
.checkbox-col {
    width: 52px;
    min-width: 52px;
    padding-left: 20px !important;
    padding-right: 8px !important;
}

.custom-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;

        &:checked+.checkmark {
            background-color: #3b82f6;
            border-color: #3b82f6;

            &::after {
                display: block;
            }
        }

        &:indeterminate+.checkmark {
            background-color: #3b82f6;
            border-color: #3b82f6;

            &::after {
                display: block;
                width: 8px;
                height: 0;
                border-width: 0 0 2px 0;
                transform: rotate(0deg) translate(-50%, -50%);
                top: 50%;
                left: 50%;
                position: absolute;
            }
        }
    }

    .checkmark {
        width: 18px;
        height: 18px;
        border: 1.5px solid #d1d5db;
        border-radius: 4px;
        background: #fff;
        transition: all 0.15s ease;
        position: relative;

        &::after {
            content: '';
            display: none;
            position: absolute;
            left: 5.5px;
            top: 2px;
            width: 5px;
            height: 9px;
            border: solid #fff;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }
}

/* ── Empty State ── */
.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    border-top: 1px solid #e5e7eb;

    span {
        font-size: 14px;
        color: #9ca3af;
    }
}
</style>