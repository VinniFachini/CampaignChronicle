<template>
    <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
        <!-- Icon with Plus Badge -->
        <div class="relative mb-6">
            <div class="w-24 h-24 rounded-full bg-parchment-100 flex items-center justify-center">
                <BookOpen class="h-12 w-12 text-gold-500" :stroke-width="1.5" />
            </div>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shadow-lg">
                <Plus class="h-6 w-6 text-white" :stroke-width="2.5" />
            </div>
        </div>

        <!-- Title and Description -->
        <h3 class="font-display text-medieval-800 mb-2 text-2xl">
            Comece sua Primeira Campanha
        </h3>
        <p class="text-medieval-600 font-body max-w-md mb-6">
            Você ainda não possui campanhas. Crie sua primeira campanha e comece a
            documentar suas aventuras épicas de RPG!
        </p>

        <!-- CTA Button -->
        <button @click="$emit('createCampaign')" class="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-md font-ui transition-colors">
            <Plus class="h-4 w-4" />
            Criar Minha Primeira Campanha
        </button>

        <!-- Features Grid -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl text-left">
            <div class="space-y-2">
                <div class="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center mb-3">
                    <span class="text-2xl">📖</span>
                </div>
                <h4 class="font-ui text-medieval-800 font-semibold">
                    Documente Sessões
                </h4>
                <p class="text-sm text-medieval-600 font-ui">
                    Registre cada sessão de jogo com detalhes e anotações
                </p>
            </div>

            <div class="space-y-2">
                <div class="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center mb-3">
                    <span class="text-2xl">🎭</span>
                </div>
                <h4 class="font-ui text-medieval-800 font-semibold">
                    Gerencie Personagens
                </h4>
                <p class="text-sm text-medieval-600 font-ui">
                    Crie e acompanhe a evolução dos personagens
                </p>
            </div>

            <div class="space-y-2">
                <div class="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center mb-3">
                    <span class="text-2xl">🗺️</span>
                </div>
                <h4 class="font-ui text-medieval-800 font-semibold">
                    Construa o Mundo
                </h4>
                <p class="text-sm text-medieval-600 font-ui">
                    Desenvolva locais, NPCs e enredos complexos
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BookOpen, Plus } from 'lucide-vue-next'

defineEmits<{
    createCampaign: []
}>()
</script>