<template>
    <div class="w-full max-w-md mx-auto">
        <div class="bg-white rounded-xl shadow-[0_8px_30px_rgba(44,24,16,0.12)] p-8 transition-all duration-300">
            <!-- Header -->
            <div class="text-center mb-8">
                <h2 class="font-display text-3xl text-medieval-700 mb-2">
                    {{ mode === 'login' ? 'Bem-vindo de volta' : 'Criar sua conta' }}
                </h2>
                <p class="text-medieval-500 font-body text-sm">
                    {{ mode === 'login'
                        ? 'Entre para continuar sua jornada'
                        : 'Comece a documentar suas aventuras' }}
                </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
                <!-- Email Field -->
                <div>
                    <label for="email" class="block text-sm text-medieval-700 mb-2 font-ui">
                        Email
                    </label>
                    <div class="relative">
                        <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medieval-500" />
                        <input id="email" type="email" v-model="formData.email" @input="handleInputChange('email', ($event.target as HTMLInputElement).value)" class="w-full pl-11 pr-4 py-2.5 border border-parchment-200 rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400 focus:ring-opacity-20 font-ui bg-parchment-100 transition-all outline-none" placeholder="seu@email.com" />
                    </div>
                    <p v-if="errors.email" class="text-error-500 text-sm mt-1 font-ui">
                        {{ errors.email }}
                    </p>
                </div>

                <!-- Username Field (Register only) -->
                <div v-if="mode === 'register'">
                    <label for="username" class="block text-sm text-medieval-700 mb-2 font-ui">
                        Nome de usuário
                    </label>
                    <div class="relative">
                        <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medieval-500" />
                        <input id="username" type="text" v-model="formData.username" @input="handleInputChange('username', ($event.target as HTMLInputElement).value)" class="w-full pl-11 pr-4 py-2.5 border border-parchment-200 rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400 focus:ring-opacity-20 font-ui bg-parchment-100 transition-all outline-none" placeholder="mestredasmasmorras" />
                    </div>
                    <p v-if="errors.username" class="text-error-500 text-sm mt-1 font-ui">
                        {{ errors.username }}
                    </p>
                </div>

                <!-- Password Field -->
                <div>
                    <label for="password" class="block text-sm text-medieval-700 mb-2 font-ui">
                        Senha
                    </label>
                    <div class="relative">
                        <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medieval-500" />
                        <input id="password" :type="showPassword ? 'text' : 'password'" v-model="formData.password" @input="handleInputChange('password', ($event.target as HTMLInputElement).value)" class="w-full pl-11 pr-11 py-2.5 border border-parchment-200 rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400 focus:ring-opacity-20 font-ui bg-parchment-100 transition-all outline-none" placeholder="••••••••" />
                        <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-medieval-500 hover:text-medieval-400 transition-colors">
                            <EyeOff v-if="showPassword" class="w-5 h-5" />
                            <Eye v-else class="w-5 h-5" />
                        </button>
                    </div>
                    <p v-if="errors.password" class="text-error-500 text-sm mt-1 font-ui">
                        {{ errors.password }}
                    </p>

                    <!-- Password Strength Indicator -->
                    <div v-if="mode === 'register' && formData.password && passwordStrength" class="mt-2">
                        <div class="flex gap-1 mb-1">
                            <div v-for="level in 3" :key="level" :class="[
                                'h-1 flex-1 rounded-full transition-all duration-300',
                                level <= passwordStrength.strength ? passwordStrength.color : 'bg-parchment-200'
                            ]" />
                        </div>
                        <p class="text-xs font-ui text-medieval-500">
                            Força da senha: {{ passwordStrength.label }}
                        </p>
                    </div>
                </div>

                <!-- Confirm Password Field (Register only) -->
                <div v-if="mode === 'register'">
                    <label for="confirmPassword" class="block text-sm text-medieval-700 mb-2 font-ui">
                        Confirmar senha
                    </label>
                    <div class="relative">
                        <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medieval-500" />
                        <input id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" v-model="formData.confirmPassword" @input="handleInputChange('confirmPassword', ($event.target as HTMLInputElement).value)" class="w-full pl-11 pr-11 py-2.5 border border-parchment-200 rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400 focus:ring-opacity-20 font-ui bg-parchment-100 transition-all outline-none" placeholder="••••••••" />
                        <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-medieval-500 hover:text-medieval-400 transition-colors">
                            <EyeOff v-if="showConfirmPassword" class="w-5 h-5" />
                            <Eye v-else class="w-5 h-5" />
                        </button>
                    </div>
                    <p v-if="errors.confirmPassword" class="text-error-500 text-sm mt-1 font-ui">
                        {{ errors.confirmPassword }}
                    </p>
                </div>

                <!-- Remember Me / Accept Terms -->
                <div class="flex items-start">
                    <div v-if="mode === 'login'" class="flex items-center gap-2">
                        <input id="rememberMe" type="checkbox" v-model="formData.rememberMe" class="w-4 h-4 rounded border-parchment-200 text-gold-400 focus:ring-gold-400 cursor-pointer" />
                        <label for="rememberMe" class="text-sm text-medieval-500 cursor-pointer font-ui">
                            Lembrar-me
                        </label>
                    </div>
                    <div v-else class="flex items-start gap-2">
                        <input id="acceptTerms" type="checkbox" v-model="formData.acceptTerms" class="w-4 h-4 rounded border-parchment-200 text-gold-400 focus:ring-gold-400 cursor-pointer mt-0.5" />
                        <label for="acceptTerms" class="text-sm text-medieval-500 cursor-pointer font-ui">
                            Aceito os
                            <a href="#" class="text-gold-400 hover:text-gold-500 underline">
                                termos de uso
                            </a>
                        </label>
                    </div>
                </div>

                <p v-if="errors.acceptTerms" class="text-error-500 text-sm font-ui -mt-3">
                    {{ errors.acceptTerms }}
                </p>

                <!-- Forgot Password (Login only) -->
                <div v-if="mode === 'login'" class="text-right">
                    <a href="#" class="text-sm text-medieval-500 hover:text-medieval-400 font-ui transition-colors">
                        Esqueceu a senha?
                    </a>
                </div>

                <!-- Submit Button -->
                <button type="submit" :disabled="isLoading" class="w-full bg-gold-400 hover:bg-gold-500 text-medieval-700 py-3 rounded-lg transition-all duration-300 font-ui font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="isLoading" class="flex items-center justify-center gap-2">
                        <span class="w-5 h-5 border-2 border-medieval-700 border-t-transparent rounded-full animate-spin" />
                        Processando...
                    </span>
                    <span v-else>
                        {{ mode === 'login' ? 'Entrar' : 'Criar Conta' }}
                    </span>
                </button>

                <!-- Toggle Mode -->
                <div class="text-center">
                    <button type="button" @click="toggleMode" class="text-sm text-medieval-500 hover:text-medieval-400 font-ui transition-colors">
                        <span v-if="mode === 'login'">
                            Não tem uma conta?
                            <span class="text-gold-400 hover:text-gold-500">Criar conta</span>
                        </span>
                        <span v-else>
                            Já tem uma conta?
                            <span class="text-gold-400 hover:text-gold-500">Entrar</span>
                        </span>
                    </button>
                </div>
            </form>

            <!-- Separator -->
            <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-parchment-200" />
                </div>
                <div class="relative flex justify-center">
                    <span class="bg-white px-4 text-sm text-medieval-500 font-ui">
                        Ou continue com:
                    </span>
                </div>
            </div>

            <!-- Social Login Buttons -->
            <div class="grid grid-cols-3 gap-3">
                <button type="button" class="flex items-center justify-center gap-2 px-4 py-3 border border-parchment-200 rounded-lg hover:bg-parchment-100 transition-all duration-200 font-ui text-sm text-medieval-700">
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span class="hidden sm:inline">Google</span>
                </button>

                <button type="button" class="flex items-center justify-center gap-2 px-4 py-3 border border-parchment-200 rounded-lg hover:bg-parchment-100 transition-all duration-200 font-ui text-sm text-medieval-700">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span class="hidden sm:inline">Discord</span>
                </button>

                <button type="button" class="flex items-center justify-center gap-2 px-4 py-3 border border-parchment-200 rounded-lg hover:bg-parchment-100 transition-all duration-200 font-ui text-sm text-medieval-700">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span class="hidden sm:inline">GitHub</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-vue-next'

type AuthMode = 'login' | 'register'

interface FormData {
    email: string
    username: string
    password: string
    confirmPassword: string
    rememberMe: boolean
    acceptTerms: boolean
}

interface FormErrors {
    email?: string
    username?: string
    password?: string
    confirmPassword?: string
    acceptTerms?: string
}

const mode = ref<AuthMode>('login')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

const formData = ref<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    acceptTerms: false,
})

const errors = ref<FormErrors>({})

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const getPasswordStrength = (password: string) => {
    let strength = 0

    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    if (strength <= 1) return { strength: 1, label: 'Fraca', color: 'bg-error-500' }
    if (strength <= 3) return { strength: 2, label: 'Média', color: 'bg-gold-400' }
    return { strength: 3, label: 'Forte', color: 'bg-success-500' }
}

const passwordStrength = computed(() => {
    return mode.value === 'register' ? getPasswordStrength(formData.value.password) : null
})

const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    formData.value[field] = value as never

    // Real-time validation
    const newErrors = { ...errors.value }

    if (field === 'email' && typeof value === 'string') {
        if (value && !validateEmail(value)) {
            newErrors.email = 'Email inválido'
        } else {
            delete newErrors.email
        }
    }

    if (field === 'password' && typeof value === 'string') {
        if (value && value.length < 8) {
            newErrors.password = 'A senha deve ter no mínimo 8 caracteres'
        } else {
            delete newErrors.password
        }
    }

    if (field === 'confirmPassword' && typeof value === 'string') {
        if (value && value !== formData.value.password) {
            newErrors.confirmPassword = 'As senhas não coincidem'
        } else {
            delete newErrors.confirmPassword
        }
    }

    errors.value = newErrors
}

const handleSubmit = async () => {
    const newErrors: FormErrors = {}

    if (!validateEmail(formData.value.email)) {
        newErrors.email = 'Email inválido'
    }

    if (mode.value === 'register') {
        if (!formData.value.username) {
            newErrors.username = 'Nome de usuário obrigatório'
        }
        if (formData.value.password.length < 8) {
            newErrors.password = 'A senha deve ter no mínimo 8 caracteres'
        }
        if (formData.value.password !== formData.value.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem'
        }
        if (!formData.value.acceptTerms) {
            newErrors.acceptTerms = 'Você deve aceitar os termos'
        }
    }

    if (Object.keys(newErrors).length > 0) {
        errors.value = newErrors
        return
    }

    isLoading.value = true

    // Simulate API call
    setTimeout(() => {
        console.log('Form submitted:', { mode: mode.value, formData: formData.value })
        isLoading.value = false
    }, 2000)
}

const toggleMode = () => {
    mode.value = mode.value === 'login' ? 'register' : 'login'
    errors.value = {}
    formData.value = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
        acceptTerms: false,
    }
}
</script>