<template>
    <div class="h-screen flex overflow-hidden">

        <!-- Left side — faqat desktop -->
        <div class="hidden lg:flex lg:w-1/2 bg-yellow-400 items-center justify-center p-12">
            <img :src="AuthDashboard" alt="LearnHub illustration"
                class="w-full max-w-130 h-auto object-contain drop-shadow-2xl">
        </div>

        <!-- Right side — form slot -->
        <div class="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
            <div class="w-full max-w-md">
                <router-view />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import AuthDashboard from '@/assets/icons/svg/auth_dashboard.svg'
</script>
