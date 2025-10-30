<script setup lang="ts">
import { ref, onMounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const isInView = ref(false)

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries: any) => {
            if (entries[0].isIntersecting) {
                isInView.value = true
                observer.disconnect()
            }
        },
        { threshold: 0.2 }
    )
    if (sectionRef.value) observer.observe(sectionRef.value)
})

</script>

<template>
    <section ref="sectionRef" id="exemplos" class="py-24 transition-all duration-700 bg-parchment-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Cabeçalho -->
            <div class="text-center mb-12 transition-all duration-700" :class="{ 'opacity-100 translate-y-0': isInView, 'opacity-0 translate-y-8': !isInView }">
                <h2 class="font-display text-4xl sm:text-5xl mb-4 text-medieval-700">
                    Uma Crônica Completa
                </h2>
                <p class="font-body text-xl max-w-2xl mx-auto text-medieval-500">
                    Interface intuitiva que coloca suas histórias em primeiro lugar
                </p>
            </div>

            <!-- Imagem principal -->
            <div class="relative rounded-2xl aspect-video overflow-hidden shadow-2xl border-4 transform transition-all duration-700 border-medieval-500" :class="{ 'opacity-100 scale-100': isInView, 'opacity-0 scale-95': !isInView }">
                <img src="https://images.unsplash.com/photo-1677248245752-f45092b09e5a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074" alt="Interface completa do CampaignChronicle" class="w-full h-auto" />

                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            <!-- Callouts (Mobile) -->
            <div class="lg:hidden mt-8 flex flex-wrap gap-3 justify-center">
            </div>
        </div>
    </section>
</template>
