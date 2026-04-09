<script setup lang="ts">
import { reactive } from 'vue'
// import { useRegister } from '../composables/useAuth'
import type { RegisterDto } from '../schemas/auth.schema';
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import BaseInput from '@/shared/components/ui/BaseInput.vue';
import { lockIconSvg, mailIconSvg, userIconSvg } from './auth.icon';

// const { errors, isLoading, clearError, submit } = useRegister()

const form = reactive<RegisterDto>({
    name: '', email: '', password: '', confirmPassword: ''
})
</script>

<template>
    <!-- <form @submit.prevent="submit(form)" novalidate class="flex flex-col gap-4">
        <BaseInput v-model="form.name" label="Full Name" :error="errors.name" @input="clearError('name')"
            :suffixIcon="userIconSvg" />
        <BaseInput v-model="form.email" label="Email" :error="errors.email" @input="clearError('email')" type="email"
            :suffixIcon="mailIconSvg" />
        <BaseInput v-model="form.password" label="Password" :error="errors.password" @input="clearError('password')"
            type="password" :suffixIcon="lockIconSvg" />
        <BaseInput v-model="form.confirmPassword" label="Confirm" :error="errors.confirmPassword"
            @input="clearError('confirmPassword')" type="password" :suffixIcon="lockIconSvg" />
        <BaseButton label="Create Account" size="large" :border-radius="50" type="submit" :loading="isLoading"
            :disabled="isLoading" class="mt-2" />
    </form> -->
</template>