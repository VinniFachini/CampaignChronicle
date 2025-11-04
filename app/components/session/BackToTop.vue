<template>
    <Transition name="fade">
        <button v-if="visible" class="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 shadow-lg bg-gold-500 hover:bg-gold-400 text-white transition-colors flex items-center justify-center" @click="scrollToTop" aria-label="Voltar ao topo">
            <Icon name="lucide:arrow-up" class="w-6 h-6" />
        </button>
    </Transition>
</template>

<script setup lang="ts">
const visible = ref(false)

const toggleVisible = () => {
    visible.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

onMounted(() => {
    window.addEventListener('scroll', toggleVisible)
    toggleVisible()
})

onUnmounted(() => {
    window.removeEventListener('scroll', toggleVisible)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>