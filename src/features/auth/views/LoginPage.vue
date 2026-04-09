<template>
    <div class="space-y-8">

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Login
        </h1>

        <!-- Form -->
        <div class="space-y-5">
            <LoginForm />
        </div>

        <!-- Sign up link -->
        <p class="text-center text-sm text-gray-500">
            Don't have an account?
            <RouterLink to="/register" class="text-yellow-500 hover:text-yellow-600 font-semibold
                 transition-colors underline">
                Sign Up
            </RouterLink>
        </p>

    </div>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';


</script>