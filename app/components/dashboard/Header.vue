<template>
    <header :class="[
        'sticky top-0 z-50 w-full border-b border-medieval-200 transition-all duration-300',
        isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80'
    ]">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between gap-4">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center space-x-3">
                    <div class="p-2 bg-medieval-700 rounded-lg">
                        <BookOpen class="w-8 h-8 text-gold-400" />
                    </div>
                    <span class="text-2xl font-medium text-medieval-700 font-display">CampaignChronicle</span>
                </NuxtLink>

                <!-- Navigation -->
                <nav class="hidden md:flex items-center gap-6 font-ui">
                    <button @click="$emit('viewChange', 'campaigns')" :class="[
                        'px-4 py-2 rounded-md transition-colors',
                        currentView === 'campaigns'
                            ? 'text-gold-600 bg-gold-50'
                            : 'text-medieval-700 hover:text-gold-500 hover:bg-gold-50'
                    ]">
                        Campanhas
                    </button>
                    <button @click="$emit('viewChange', 'explore')" :class="[
                        'px-4 py-2 rounded-md transition-colors',
                        currentView === 'explore'
                            ? 'text-gold-600 bg-gold-50'
                            : 'text-medieval-700 hover:text-gold-500 hover:bg-gold-50'
                    ]">
                        Explorar
                    </button>
                </nav>

                <!-- Search Bar -->
                <div class="flex-1 max-w-md hidden lg:block">
                    <div class="relative">
                        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-medieval-400" />
                        <input v-model="searchQuery" @input="handleSearch" placeholder="Buscar campanhas..." class="w-full pl-10 pr-4 py-2 bg-parchment-100 border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" />
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-3">
                    <!-- Notifications -->
                    <button class="relative p-2 text-medieval-700 hover:text-gold-500 rounded-md hover:bg-gold-50 transition-colors">
                        <Bell class="h-5 w-5" />
                        <span v-if="notificationCount > 0" class="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center bg-error text-white text-xs rounded-full">
                            {{ notificationCount }}
                        </span>
                    </button>

                    <!-- User Menu -->
                    <div class="relative" ref="dropdownRef">
                        <button @click="isDropdownOpen = !isDropdownOpen" class="relative h-10 w-10 rounded-full hover:opacity-80 transition-opacity">
                            <div class="h-10 w-10 rounded-full bg-gold-500 text-white font-ui flex items-center justify-center">
                                GM
                            </div>
                        </button>

                        <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 font-ui">
                                <div class="py-1">
                                    <div class="px-4 py-2 text-sm font-semibold text-medieval-800">
                                        Minha Conta
                                    </div>
                                    <hr class="my-1 border-medieval-200" />
                                    <button class="flex items-center w-full px-4 py-2 text-sm text-medieval-700 hover:bg-gold-50 transition-colors">
                                        <User class="mr-2 h-4 w-4" />
                                        Perfil
                                    </button>
                                    <button class="flex items-center w-full px-4 py-2 text-sm text-medieval-700 hover:bg-gold-50 transition-colors">
                                        <Settings class="mr-2 h-4 w-4" />
                                        Configurações
                                    </button>
                                    <hr class="my-1 border-medieval-200" />
                                    <button class="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-red-50 transition-colors">
                                        <LogOut class="mr-2 h-4 w-4" />
                                        Sair
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>

            <!-- Mobile Search -->
            <div class="mt-4 lg:hidden">
                <div class="relative">
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-medieval-400" />
                    <input v-model="searchQuery" @input="handleSearch" placeholder="Buscar campanhas..." class="w-full pl-10 pr-4 py-2 bg-parchment-100 border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { BookOpen, Search, Bell, User, Settings, LogOut } from 'lucide-vue-next'

interface Props {
    notificationCount: number
    currentView: 'campaigns' | 'explore'
}

const props = defineProps<Props>()

const emit = defineEmits<{
    search: [query: string]
    viewChange: [view: 'campaigns' | 'explore']
}>()

const isScrolled = ref(false)
const searchQuery = ref('')
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
}

const handleSearch = () => {
    emit('search', searchQuery.value)
}

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isDropdownOpen.value = false
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('click', handleClickOutside)
})
</script>