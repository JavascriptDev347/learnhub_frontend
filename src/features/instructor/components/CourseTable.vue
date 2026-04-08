<template>
    <div>
        <AppTable :headers="headers" :body="courses" selectable v-model:selected-ids="selectedIds">
            <!-- Status column: badge/pill slot -->
            <template #body_status="{ item }">
                <span :class="['status-badge', `status-${item.status}`]">
                    <span class="status-dot"></span>
                    {{ statusLabel(item.status as string) }}
                </span>
            </template>

            <!-- Enrollments: dash if empty -->
            <template #body_enrollments="{ item }">
                {{ item.enrollments || '-' }}
            </template>

            <!-- Completion Rate -->
            <template #body_completionRate="{ item }">
                {{ item.completionRate ? `${item.completionRate}%` : '-' }}
            </template>

            <!-- Last Updated: formatted date -->
            <template #body_lastUpdated="{ item }">
                {{ item.lastUpdated ? formatDate(item.lastUpdated as string) : '-' }}
            </template>

            <!-- Actions column: icon buttons -->
            <template #body_actions="{ item }">
                <div class="action-buttons">
                    <button class="action-btn edit" @click="onEdit(item)">
                        <EditIcon />
                    </button>
                    <button class="action-btn delete" @click="onDelete(item)">
                        <TrashIcon />
                    </button>
                    <button class="action-btn external" @click="onView(item)">
                        <ExternalLinkIcon />
                    </button>
                </div>
            </template>
        </AppTable>
    </div>
</template>

<script setup lang="ts">
import type { TableHeader, TableItem } from '@/shared/components/ui/AppTable.vue';
import { ref } from 'vue';
import { EditIcon, TrashIcon, ExternalLinkIcon } from 'lucide-vue-next'
import AppTable from '@/shared/components/ui/AppTable.vue';

const headers: TableHeader[] = [
    { title: 'Course Title', value: 'title' },
    { title: 'Status', value: 'status' },
    { title: 'Enrollments', value: 'enrollments' },
    { title: 'Completion Rate', value: 'completionRate' },
    { title: 'Last Updated', value: 'lastUpdated' },
    { title: 'Actions', value: 'actions' },
]

const selectedIds = ref<(string | number)[]>([])


function statusLabel(status: string): string {
    const map: Record<string, string> = {
        published: 'Published',
        draft: 'Draft',
        archived: 'Archived',
    }
    return map[status] ?? status
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function onEdit(item: TableItem) {
    console.log('Edit:', item.id)
}

function onDelete(item: TableItem) {
    console.log('Delete:', item.id)
}

function onView(item: TableItem) {
    console.log('View:', item.id)
}

const courses: TableItem[] = [
    {
        id: 1,
        title: 'UI Design Basics',
        status: 'published',
        enrollments: 520,
        completionRate: 76,
        lastUpdated: '2025-06-15',
    },
    {
        id: 2,
        title: 'Figma for Beginners',
        status: 'published',
        enrollments: 410,
        completionRate: 78,
        lastUpdated: '2025-06-12',
    },
    {
        id: 3,
        title: 'Typography Fundamentals',
        status: 'draft',
        enrollments: null,
        completionRate: null,
        lastUpdated: null,
    },
    {
        id: 4,
        title: 'Microinteractions',
        status: 'archived',
        enrollments: 93,
        completionRate: 59,
        lastUpdated: '2025-04-18',
    },
]
</script>

<style scoped lang="scss">
/* ── Status Badge ── */
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;

    .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
}

.status-published {
    background: #ecfdf5;
    color: #065f46;

    .status-dot {
        background: #10b981;
    }
}

.status-draft {
    background: #fefce8;
    color: #854d0e;

    .status-dot {
        background: #eab308;
    }
}

.status-archived {
    background: #fef2f2;
    color: #991b1b;

    .status-dot {
        background: #ef4444;
    }
}


/* ── Action Buttons ── */
.action-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
}

.action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: opacity 0.15s ease;

    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        opacity: 0.8;
    }

    &.edit {
        background: #dbeafe;
        color: #2563eb;
    }

    &.delete {
        background: #fee2e2;
        color: #dc2626;
    }

    &.external {
        background: #f3f4f6;
        color: #6b7280;
    }
}
</style>