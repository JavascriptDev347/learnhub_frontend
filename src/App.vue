<script setup lang="ts">
import { useAuthStore } from './stores/auth.store';
import AppSpinner from './shared/components/ui/AppSpinner.vue';
import { useRouteLoading } from './composables/useRouteLoading';
import { computed } from 'vue';
const auth = useAuthStore()

const { isNavigating } = useRouteLoading()

const showFullSpinner = computed(() => !auth.isInitialized)
const showNavSpinner = computed(() => auth.isInitialized && isNavigating.value)
</script>


<template>
  <div v-if="showFullSpinner" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-950">
    <div class="flex flex-col items-center gap-4">
      <AppSpinner size="lg" color="emerald" />
      <p class="text-sm font-medium text-gray-400 animate-pulse">
        Yuklanmoqda...
      </p>
    </div>
  </div>

  <template v-else>
    <Transition name="fade">
      <div v-if="showNavSpinner"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 dark:bg-gray-950/70 ">
        <AppSpinner size="md" color="emerald" />
      </div>
    </Transition>

    <RouterView />
  </template>
  <!-- <div v-if="!auth.isInitialized" class="loading-screen">
    <AppSpinner size="lg" color="emerald" label="Yuklanmoqda..." />
  </div>
  <router-view v-else /> -->
</template>

<style scoped></style>
