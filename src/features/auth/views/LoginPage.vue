<template>
    <div class="space-y-8">

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Login
        </h1>

        <!-- Form -->
        <div class="space-y-5">
            <!-- Email -->
            <BaseInput v-model="form.email" label="Email" type="email" placeholder="Enter email address"
                :error-message="errors.email" @blur="validateEmail">
                <template #leftIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 4l-10 8L2 4" />
                    </svg>
                </template>
            </BaseInput>

            <!-- Password -->
            <BaseInput v-model="form.password" label="Password" type="password" placeholder="Enter Password"
                :error-message="errors.password" @blur="validatePassword">
                <template #leftIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                </template>
            </BaseInput>

            <!-- Remember me + Forgot -->
            <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input v-model="form.rememberMe" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-yellow-400
                     focus:ring-yellow-400 cursor-pointer">
                    <span class="text-sm text-gray-600">Remember Me</span>
                </label>

                <RouterLink to="/forgot-password" class="text-sm text-yellow-500 hover:text-yellow-600 font-medium
                   transition-colors">
                    Forgot Password?
                </RouterLink>
            </div>

            <!-- Login button -->
            <BaseButton size="large" :border-radius="50" label="Login" :disabled="isLoading" @click="handleLogin" />
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
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseInput from '@/shared/components/ui/BaseInput.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'

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