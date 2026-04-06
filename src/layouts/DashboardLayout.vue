<template>
    <div class="min-h-screen">
        <!-- Header -->
        <AppHeader />
        <!-- </header> -->

        <div class="flex">
            <!-- Asosiy kontent -->
            <main class="flex-1">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <router-view />
                </div>
            </main>
        </div>
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppFooter from '@/shared/components/layout/AppFooter.vue';
import AppHeader from '@/shared/components/layout/AppHeader.vue';

// Agar Navbar va Sidebar komponentlaringiz bor bo'lsa
</script>