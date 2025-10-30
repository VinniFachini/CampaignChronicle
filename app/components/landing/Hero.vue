<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
    isVisible.value = true
})
</script>

<template>
    <section class="min-h-screen flex items-center pt-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="grid lg:grid-cols-[60%_40%] gap-12 items-center">

                <!-- Left Column -->
                <div class="space-y-8">
                    <div class="space-y-4">
                        <h1 class="font-display text-medieval-700 text-5xl sm:text-6xl lg:text-7xl leading-loose">
                            Transforme sua campanha em uma crônica viva
                        </h1>
                        <p class="font-body text-xl text-medieval-600 sm:text-2xl leading-relaxed">
                            Documente aventuras de RPG, crie timeline épica e preserve memórias da sua mesa
                        </p>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <button class="font-ui text-lg px-8 py-2 transition-all duration-300 bg-gold-400 text-white hover:scale-105 shadow-lg rounded-lg">
                            Comece Grátis
                        </button>

                        <button class="font-ui text-lg px-8 py-2 transition-all duration-300 hover:scale-105 rounded-lg border text-medieval-700 border-medieval-700">
                            Ver Exemplo
                            <LucideArrowRight class="ml-2 w-5 h-5 inline-block" />
                        </button>
                    </div>

                    <span class="font-ui px-4 py-2 text-sm flex items-center gap-2 rounded-lg w-fit bg-parchment-200">
                        <LucideSparkles class="w-4 h-4 text-gold-400" />
                        Gratuito • Sem cartão
                    </span>

                    <div class="flex items-center  gap-6 pt-4">
                        <div class="flex items-center gap-2">
                            <LucideBook class="w-5 h-5 text-gold-400" />
                            <span class="font-ui text-medieval-600" >
                                500+ campanhas
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <LucideDices class="w-5 h-5 text-gold-400" />
                            <span class="font-ui text-medieval-600" >
                                10.000+ sessões
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="relative" >
                    <div class="relative">
                        <!-- Mockup principal -->
                        <div class="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-medieval-700">
                            <img alt="CampaignChronicle Interface" src="https://images.unsplash.com/photo-1650024520299-4383f4520fc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" class="w-full h-auto" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        <!-- Floating Dices -->
                        <div class="absolute -top-6 -right-6 w-20 h-20 rotate-6 rounded-xl shadow-xl flex items-center bg-gold-400 justify-center" >
                            <LucideDices class="w-10 h-10 text-white" />
                        </div>

                        <!-- Floating Book -->
                        <div class="absolute -bottom-4 -left-4 w-16 h-16 rounded-lg -rotate-6 shadow-xl flex items-center bg-gold-100 justify-center parchment-texture">
                            <LucideBook class="w-8 h-8 text-medieval-700"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.animate-pulse-gold {
    animation: pulseGold 2s infinite;
}

@keyframes pulseGold {

    0%,
    100% {
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    }

    50% {
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.9);
    }
}
</style>
