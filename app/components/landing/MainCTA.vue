<script setup lang="ts">
import { Check, PartyPopper } from 'lucide-vue-next'

const features = [
    'Campanhas ilimitadas',
    '500MB de armazenamento',
    'Exportação para PDF',
    'Suporte prioritário'
]
</script>

<template>
    <section id="precos" class="py-24 relative overflow-hidden">
        <!-- Fundo dourado em degradê -->
        <div class="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-500"></div>

        <!-- Padrão decorativo -->
        <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23000000%27 fill-opacity=%271%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <!-- Badge Beta -->
            <div class="font-ui px-4 py-2 mb-6 rounded-md font-medium text-sm inline-flex items-center gap-2 bg-white/20 text-white border border-white/30">
                <PartyPopper class="w-4 h-4" />
                Beta Gratuito
            </div>

            <!-- Título -->
            <h2 class="font-display text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
                Comece a Escrever Sua Lenda
            </h2>

            <!-- Subtítulo -->
            <p class="font-body text-xl sm:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
                Junte-se a centenas de mestres que já estão documentando suas aventuras épicas
            </p>

            <!-- Lista de recursos -->
            <div class="grid sm:grid-cols-2 gap-4 mb-12 max-w-lg mx-auto">
                <div v-for="(feature, index) in features" :key="index" class="flex items-center gap-3 text-white">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-white/20">
                        <Check class="w-4 h-4" />
                    </div>
                    <span class="font-ui">{{ feature }}</span>
                </div>
            </div>

            <!-- Botão principal -->
            <div>
                <button size="lg" class="font-ui text-lg px-12 py-4 rounded-lg mb-4 transition-all duration-300 hover:scale-105 hover:text-gold-500 shadow-2xl bg-white text-gold-600 font-medium">
                    Criar Primeira Campanha →
                </button>

                <p class="font-ui text-sm text-white/80">
                    Sem cartão de crédito • Pronto em 2 minutos
                </p>
            </div>
        </div>
    </section>
</template>
