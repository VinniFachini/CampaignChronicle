<template>
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Título -->
            <div class="text-center mb-16">
                <h2 class="font-display text-4xl sm:text-5xl mb-4 text-medieval-700">
                    Por Que CampaignChronicle?
                </h2>
            </div>

            <!-- Cards -->
            <div class="grid md:grid-cols-3 gap-8">
                <div v-for="(diff, index) in differentials" :key="index" class="p-8 py-16 text-center h-full border-2 flex flex-col items-center justify-start rounded-xl transition-all duration-300 hover:shadow-lg bg-white border-parchment-400">
                    <div class="text-5xl mb-8">{{ diff.emoji }}</div>
                    <h3 class="font-display text-xl mb-2 text-medieval-700">
                        {{ diff.title }}
                    </h3>
                    <p class="font-body text-medieval-500">
                        {{ diff.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const differentials = [
    {
        emoji: '🎭',
        title: 'Foco Narrativo',
        description: 'Não é só uma planilha - é uma ferramenta feita para contar histórias memoráveis'
    },
    {
        emoji: '👥',
        title: 'Colaborativo',
        description: 'Toda a mesa pode contribuir, comentar e relembrar os momentos épicos juntos'
    },
    {
        emoji: '📱',
        title: 'Acessível em qualquer lugar',
        description: 'Acesse suas campanhas de qualquer dispositivo, a qualquer momento'
    }
];
</script>