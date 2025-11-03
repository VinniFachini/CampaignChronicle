<script setup lang="ts">
import { Settings, UserPlus, FileDown, Edit, Lock, Users } from 'lucide-vue-next'

interface Props {
    isGM?: boolean
}

withDefaults(defineProps<Props>(), {
    isGM: true
})
</script>

<template>
    <div class="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg mb-6 shadow-lg">
        <!-- Background Image -->
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1618385418700-35dc948cdeec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMG1hcCUyMHBhcmNobWVudHxlbnwxfHx8fDE3NjIwMjgxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080')" />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-medieval-700/70 via-medieval-700/60 to-medieval-700/80" />

        <!-- Content -->
        <div class="relative h-full flex flex-col justify-center items-center text-center px-6 z-10">
            <div class="max-w-4xl">
                <!-- Title -->
                <h1 class="font-display text-4xl md:text-6xl text-parchment-100 mb-4 drop-shadow-lg">
                    A Coroa dos Dragões
                </h1>

                <!-- Subtitle with System and Privacy -->
                <div class="flex flex-wrap items-center justify-center gap-3 mb-6">
                    <p class="font-ui text-parchment-100 flex items-center gap-2">
                        <span class="inline-block w-2 h-2 rounded-full bg-gold-400" />
                        Dungeons & Dragons 5e
                    </p>
                    <span class="text-parchment-100">•</span>
                    <p class="font-ui text-parchment-100 flex items-center gap-2">
                        <Lock class="w-4 h-4" />
                        Campanha Privada
                    </p>
                </div>

                <!-- Tags/Badges -->
                <div class="flex flex-wrap items-center justify-center gap-2 mb-8">
                    <span class="px-3 py-1 rounded-full text-sm bg-gold-500 text-parchment-100 hover:bg-gold-400 font-ui transition-colors cursor-default">
                        High Fantasy
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm bg-gold-500 text-parchment-100 hover:bg-gold-400 font-ui transition-colors cursor-default">
                        Épico
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm bg-gold-500 text-parchment-100 hover:bg-gold-400 font-ui transition-colors cursor-default">
                        Combate Tático
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm bg-gold-500 text-parchment-100 hover:bg-gold-400 font-ui transition-colors cursor-default">
                        Roleplay Pesado
                    </span>
                </div>

                <!-- GM Actions -->
                <div v-if="isGM" class="flex flex-wrap items-center justify-center gap-3">
                    <button class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui rounded-md shadow-lg transition-all duration-200">
                        <Edit class="w-4 h-4" />
                        Editar Campanha
                    </button>
                    <button class="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gold-400 text-parchment-100 hover:bg-gold-400/20 font-ui rounded-md transition-colors">
                        <Settings class="w-4 h-4" />
                        Configurações
                    </button>
                    <button class="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gold-400 text-parchment-100 hover:bg-gold-400/20 font-ui rounded-md transition-colors">
                        <UserPlus class="w-4 h-4" />
                        Adicionar Membros
                    </button>
                    <button class="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gold-400 text-parchment-100 hover:bg-gold-400/20 font-ui rounded-md transition-colors">
                        <FileDown class="w-4 h-4" />
                        Exportar PDF
                    </button>
                </div>

                <!-- Player CTA -->
                <button v-if="!isGM" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui rounded-md shadow-lg transition-colors">
                    <Users class="w-4 h-4" />
                    Seguir Campanha
                </button>
            </div>
        </div>

        <!-- Decorative bottom border -->
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
    </div>
</template>