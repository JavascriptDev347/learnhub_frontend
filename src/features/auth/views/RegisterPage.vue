<template>
    <div class="space-y-8">

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Register
        </h1>

        <!-- Form -->
        <div class="space-y-5">


            <RegisterForm @submit="handleLogin" :form="form" :errors="errors" :isLoading="isLoading" />

        </div>

        <!-- Sign up link -->
        <p class="text-center text-sm text-gray-500">
            Do you have an account?
            <RouterLink to="/login" class="text-yellow-500 hover:text-yellow-600 font-semibold
                 transition-colors underline">
                Register
            </RouterLink>
        </p>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseInput from '@/shared/components/ui/BaseInput.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import RegisterForm from '../components/RegisterForm.vue'

interface LoginForm {
    email: string
    password: string
    rememberMe: boolean
}

interface FormErrors {
    email: string
    password: string
}


const form = reactive<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
})

const errors = reactive<FormErrors>({
    email: '',
    password: '',
})

const isLoading = ref(false)


// Validation
function validateEmail(): void {
    if (!form.email) {
        errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email'
    } else {
        errors.email = ''
    }
}

function validatePassword(): void {
    if (!form.password) {
        errors.password = 'Password is required'
    } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
    } else {
        errors.password = ''
    }
}

function isFormValid(): boolean {
    validateEmail()
    validatePassword()
    return !errors.email && !errors.password
}

async function handleLogin(): Promise<void> {
    if (!isFormValid()) return

    isLoading.value = true
    try {
        // TODO: auth store action call
        console.log('Login:', { email: form.email, rememberMe: form.rememberMe })
    } catch (error) {
        console.error('Login failed:', error)
    } finally {
        isLoading.value = false
    }
}

function handleSocialLogin(provider: string): void {
    // TODO: OAuth flow
    console.log('Social login:', provider)
}
</script>