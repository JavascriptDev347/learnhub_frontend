<template>
    <div class="min-h-screen bg-zinc-950 text-white">
        <!-- Header -->
        <header class="border-b border-zinc-800 bg-zinc-900 sticky top-0 z-50">
            <!-- Navbar komponentingizni shu yerga qo'yasiz -->
            <AppHeader />
        </header>

        <div class="flex">
            <!-- Sidebar (agar kerak bo'lsa) -->
            <!-- <aside class="w-72 border-r border-zinc-800 hidden lg:block bg-zinc-900 min-h-[calc(100vh-73px)]">
                <Sidebar />
            </aside> -->

            <!-- Asosiy kontent -->
            <main class="flex-1">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <router-view />
                </div>
            </main>
        </div>

        <!-- Footer -->
        <!-- <footer class="border-t border-zinc-800 bg-zinc-900 py-6 text-center text-zinc-500 text-sm">
            © 2026 Your App. All rights reserved.
        </footer> -->
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppFooter from '@/shared/components/layout/AppFooter.vue';
import AppHeader from '@/shared/components/layout/AppHeader.vue';

// Agar Navbar va Sidebar komponentlaringiz bor bo'lsa
</script>