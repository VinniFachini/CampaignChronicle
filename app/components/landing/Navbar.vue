<template>
    <nav :class="['fixed w-full z-50 transition-all duration-300', scrolled ? 'bg-transparent backdrop-blur-3xl shadow-lg' : 'bg-transparent']">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <NuxtLink to="/" class="flex items-center space-x-3">
                    <div class="p-2 bg-medieval-700 rounded-lg">
                        <BookOpen class="w-8 h-8 text-gold-400" />
                    </div>
                    <span class="text-2xl font-medium text-medieval-700 font-display">CampaignChronicle</span>
                </NuxtLink>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#features" class="text-medieval-700 hover:text-medieval-400 transition font-ui">Funcionalidades</a>
                    <a href="#how-it-works" class="text-medieval-700 hover:text-medieval-400 transition font-ui">Como Funciona</a>
                    <a href="#pricing" class="text-medieval-700 hover:text-medieval-400 transition font-ui">Planos</a>
                    <a href="#testimonials" class="text-medieval-700 hover:text-medieval-400 transition font-ui">Depoimentos</a>
                </div>
                <div class="hidden md:flex items-center">
                    <button class="bg-transparent text-medieval-700 hover:bg-medieval-50 px-4 py-2 rounded-lg text-sm transition mr-4 font-ui">
                        Entrar
                    </button>
                    <button class="bg-gold-400 text-white hover:bg-gold-500 px-4 py-2 rounded-lg text-sm transition font-ui">
                        Começar Grátis
                    </button>
                </div>

                <!-- Mobile Menu Button -->
                <button @click="toggleMenu" class="md:hidden text-medieval-700">
                    <X v-if="isMenuOpen" class="w-6 h-6" />
                    <Menu v-else class="w-6 h-6" />
                </button>
            </div>

            <!-- Mobile Menu -->
            <Transition name="slide-fade">
                <div v-if="isMenuOpen" class="md:hidden pb-4">
                    <div class="flex flex-col space-y-3">
                        <a href="#features" class="text-medieval-700 hover:text-medieval-400 transition font-ui">Funcionalidades</a>
                        <a href="#how-it-works" class="text-medieval-700 hover:text-medieval-400 transition font-ui">Como Funciona</a>
                        <a href="#pricing" class="text-medieval-700 hover:text-medieval-400 transition font-ui">Planos</a>
                        <a href="#testimonials" class="text-medieval-700 hover:text-medieval-400 transition font-ui">Depoimentos</a>
                        <button class="bg-transparent text-medieval-700 hover:bg-parchment-100 px-4 py-2 rounded-lg text-sm transition mr-4 font-ui">
                            Entrar
                        </button>
                        <button class="bg-gold-400 text-white hover:bg-gold-500 px-4 py-2 rounded-lg text-sm transition font-ui">
                            Começar Grátis
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { BookOpen, Menu, X } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const scrolled = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}

const handleScroll = () => {
    scrolled.value = window.scrollY > 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>