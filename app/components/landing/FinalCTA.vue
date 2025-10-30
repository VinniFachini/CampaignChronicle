<script setup lang="ts">
import { ArrowRight, ArrowRightCircle, ArrowRightCircleIcon, ArrowRightFromLine, ArrowRightIcon, ArrowRightLeft, ChevronRightIcon } from 'lucide-vue-next';

const isInView = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (!sectionRef.value) return;

    const observer = new IntersectionObserver(
        ([entry]: any) => {
            isInView.value = entry.isIntersecting;
        },
        { threshold: 0.1 }
    );

    observer.observe(sectionRef.value);

    onUnmounted(() => {
        observer.disconnect();
    });
});
</script>

<template>
    <section ref="sectionRef" class="py-32 relative overflow-hidden bg-white">
        <!-- Background image with overlay -->
        <div class="absolute inset-0 bg-cover bg-center opacity-10" />

        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-white/80 to-white/95" />

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center space-y-8 transition-all duration-600" :class="isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
                <h2 class="font-display text-4xl sm:text-5xl lg:text-6xl text-medieval-700">
                    Toda Grande Aventura Merece Ser Lembrada
                </h2>

                <p class="font-body text-xl sm:text-2xl max-w-2xl mx-auto text-medieval-500">
                    Comece hoje a construir o legado da sua mesa. Seus jogadores vão agradecer.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button class="font-ui text-lg px-10 py-3 rounded-lg bg-gold-400 text-white transition-all duration-300 hover:scale-105 hover:bg-gold-500 shadow-lg">
                        Começar Minha Crônica
                    </button>

                    <button class="font-ui text-lg px-10 py-3 rounded-lg text-medieval-600 transition-all duration-300 hover:bg-parchment-100 inline-flex items-center justify-center gap-2">
                        Ou explore um exemplo
                        <ChevronRightIcon class="w-5 h-5" />
                    </button>
                </div>

                <!-- Decorative elements -->
                <div class="flex items-center justify-center gap-4 pt-8">
                    <div class="w-20 h-px bg-gold-400" />
                    <span class="text-2xl">⚔️</span>
                    <div class="w-20 h-px bg-gold-400" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.duration-600 {
    transition-duration: 600ms;
}
</style>