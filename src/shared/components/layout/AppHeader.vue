<template>
    <header class="bg-white border-b-2 border-yellow-400 shadow-sm font-sans sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Main navbar row -->
            <div class="flex items-center justify-between h-[90px] gap-4">

                <!-- Logo -->
                <a href="/" class="text-2xl font-bold text-gray-900 flex-shrink-0 tracking-tight"
                    style="font-family: 'Playfair Display', serif;">
                    <img :src="EdaIcon" alt="Eda Icon">
                </a>

                <!-- Search bar (hidden on mobile) -->
                <div class="hidden md:flex flex-1 max-w-xl mx-4">
                    <div
                        class="flex items-center w-full bg-gray-100 border border-gray-200 rounded-full px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-yellow-400">
                        <svg class="w-4 h-4 text-gray-400 flex-shrink-0 mr-2" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input v-model="searchQuery" type="text" placeholder="What do you want to learn"
                            class="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                            @keyup.enter="handleSearch" />
                        <button @click="handleSearch"
                            class="ml-2 w-8 h-8 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Desktop nav links -->
                <nav class="hidden md:flex items-center gap-2 flex-shrink-0">
                    <!-- Add more nav links here as needed -->
                    <RouterLink to="/courses"
                        class="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                        Courses
                    </RouterLink>
                    <RouterLink to="/login"
                        class="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                        Login
                    </RouterLink>
                    <RouterLink to="/register"
                        class="text-sm font-semibold bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2 rounded-full transition-colors shadow-sm">
                        Sign up
                    </RouterLink>
                </nav>

                <!-- Mobile hamburger button -->
                <button @click="toggleMobileMenu" class="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu">
                    <span class="block w-5 h-0.5 bg-gray-700 transition-all duration-300"
                        :class="{ 'rotate-45 translate-y-1.5': isMenuOpen }"></span>
                    <span class="block w-5 h-0.5 bg-gray-700 my-1 transition-all duration-300"
                        :class="{ 'opacity-0': isMenuOpen }"></span>
                    <span class="block w-5 h-0.5 bg-gray-700 transition-all duration-300"
                        :class="{ '-rotate-45 -translate-y-1.5': isMenuOpen }"></span>
                </button>
            </div>

            <!-- Mobile search bar (always visible on mobile) -->
            <div class="md:hidden pb-3">
                <div
                    class="flex items-center w-full bg-gray-100 border border-gray-200 rounded-full px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-yellow-400">
                    <svg class="w-4 h-4 text-gray-400 flex-shrink-0 mr-2" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    <input v-model="searchQuery" type="text" placeholder="What do you want to learn"
                        class="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                        @keyup.enter="handleSearch" />
                    <button @click="handleSearch"
                        class="ml-2 w-8 h-8 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile dropdown menu -->
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <nav v-if="isMenuOpen" class="md:hidden border-t border-gray-100 bg-white">
                <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
                    <!-- Add more mobile nav links here as needed -->
                    <RouterLink to="/courses"
                        class="text-sm text-gray-700 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                        @click="isMenuOpen = false">
                        Courses
                    </RouterLink>
                    <RouterLink to="/login"
                        class="text-sm text-gray-700 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                        @click="isMenuOpen = false">
                        Login
                    </RouterLink>
                    <RouterLink to="/register"
                        class="text-sm font-semibold bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2.5 rounded-lg transition-colors text-center mt-1"
                        @click="isMenuOpen = false">
                        Sign up
                    </RouterLink>
                </div>
            </nav>
        </Transition>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { EdaIcon } from '@/assets/icons'

const router = useRouter()
const searchQuery = ref('')
const isMenuOpen = ref(false)

function toggleMobileMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function handleSearch() {
    if (!searchQuery.value.trim()) return
    router.push({ path: '/courses', query: { q: searchQuery.value.trim() } })
}
</script>