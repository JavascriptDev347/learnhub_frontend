<template>
    <div class="relative">
        <button @click="dropdownOpen = !dropdownOpen" class="
            relative
            block
            w-8
            h-8
            overflow-hidden
            rounded-full
            shadow
            focus:outline-none 
            cursor-pointer
          ">
            <img class="object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
                alt="Your avatar" />
        </button>

        <div v-show="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 z-10 w-full h-full"></div>

        <transition enter-active-class="transition duration-150 ease-out transform"
            enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0">
            <div v-show="dropdownOpen" style="z-index: 999" class="
              absolute
              right-0
              z-20
              w-48
              py-1
              mt-2
              bg-white
              rounded-lg
              shadow-xl
            ">
                <router-link to="/profile" class="
                px-4
                py-2
                flex
                rounded-md
                text-sm text-gray-700
                hover:text-black
              ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                </router-link>
                <span
                    class="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:text-black  cursor-pointer             ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Dark/Light
                </span>
                <router-link to="/" class="
                flex
                px-4
                py-2
                rounded-md
                text-sm text-gray-700
                hover:text-black
              " @click="logout">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log out
                </router-link>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';

const logout = () => {
    useAuthStore().clearAuth()
}

const dropdownOpen = ref(false);
</script>

<style scoped></style>