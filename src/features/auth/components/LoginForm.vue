<script setup lang="ts">
import { reactive } from 'vue'
import { useLogin } from '../composables/useAuth'
import type { LoginDto } from '../schemas/auth.schema';
import BaseInput from '@/shared/components/ui/BaseInput.vue';
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import { lockIconSvg, mailIconSvg } from './auth.icon';
const { errors, isPending, clearError, submit } = useLogin()

const form = reactive<LoginDto>({ email: '', password: '' })
function onSubmit() {
    submit(form)
}

</script>

<template>
    <form @submit.prevent="onSubmit" novalidate class="flex flex-col gap-4">
        <BaseInput v-model="form.email" label="Email" type="email" placeholder="you@example.com" :error="errors.email"
            @input="clearError('email')" :suffixIcon="mailIconSvg" />
        <BaseInput v-model="form.password" label="Password" type="password" placeholder="••••••••"
            :error="errors.password" @input="clearError('password')" :suffixIcon="lockIconSvg" />

        <BaseButton label="Login" size="large" :border-radius="50" type="submit" :loading="isPending"
            :disabled="isPending" class="mt-2" />
    </form>
</template>