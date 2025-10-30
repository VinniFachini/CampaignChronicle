<template>
    <section class="py-24 bg-parchment-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Título -->
            <div class="text-center mb-16">
                <h2 class="font-display text-4xl sm:text-5xl mb-4 text-medieval-700">
                    Para Quem É?
                </h2>
                <p class="font-body text-xl max-w-2xl mx-auto text-medieval-500">
                    Seja você mestre, jogador ou entusiasta — temos o que você precisa
                </p>
            </div>

            <!-- Cards -->
            <div class="grid md:grid-cols-2 gap-8">
                <div v-for="(audience, index) in audiences" :key="index" class="p-8 h-full border-2 border-parchment-400 bg-white transition-all duration-300 hover:shadow-lg rounded-2xl">
                    <div class="flex items-start gap-4">
                        <!-- Ícone / Emoji -->
                        <div class="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl bg-gold-400">
                            <component :is="audience.icon" class="w-7 h-7 text-white" />
                        </div>

                        <!-- Conteúdo -->
                        <div class="flex-1">
                            <h3 class="font-display text-2xl mb-4 text-medieval-700">
                                {{ audience.title }}
                            </h3>
                            <ul class="space-y-3">
                                <li v-for="(feature, i) in audience.features" :key="i" class="font-body flex items-start gap-3 text-medieval-500" >
                                    <span class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-gold-400"></span>
                                    <span>{{ feature }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

import { CrownIcon, UsersRoundIcon, GlobeIcon } from 'lucide-vue-next'
const audiences = [
    {
        icon: CrownIcon,
        title: 'Para Mestres',
        features: [
            'Gerencie múltiplas campanhas simultâneas',
            'Organize NPCs, locais e tramas',
            'Exporte para PDF para referência offline'
        ]
    },
    {
        icon: UsersRoundIcon,
        title: 'Para Jogadores',
        features: [
            'Preserve a história do seu personagem',
            'Relembre momentos marcantes',
            'Acompanhe a evolução da campanha'
        ]
    },
    {
        icon: UsersRoundIcon,
        title: 'Para Grupos',
        features: [
            'Crônica compartilhada e colaborativa',
            'Sistema de comentários e reações',
            'Perspectivas únicas de cada jogador'
        ]
    },
    {
        icon: GlobeIcon,
        title: 'Para a Comunidade',
        features: [
            'Descubra campanhas inspiradoras',
            'Compartilhe suas histórias épicas',
            'Conecte-se com outros mestres'
        ]
    }
];

</script>