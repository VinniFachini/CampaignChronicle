<script setup lang="ts">
import { BookOpen, Users, Swords, Trophy } from 'lucide-vue-next'
import type { Component } from 'vue'

export interface Stats {
    totalSessions: number
    charactersCreated: number
    activeCampaigns: number
    achievementsUnlocked: number
}

interface Props {
    stats: Stats
}

const props = defineProps<Props>()

interface StatItem {
    icon: Component
    label: string
    value: number
    color: string
}

const statItems = computed<StatItem[]>(() => [
    {
        icon: BookOpen,
        label: 'Total de Sessões',
        value: props.stats.totalSessions,
        color: 'text-gold-500',
    },
    {
        icon: Users,
        label: 'Personagens Criados',
        value: props.stats.charactersCreated,
        color: 'text-medieval-500',
    },
    {
        icon: Swords,
        label: 'Campanhas Ativas',
        value: props.stats.activeCampaigns,
        color: 'text-gold-600',
    },
    {
        icon: Trophy,
        label: 'Conquistas Desbloqueadas',
        value: props.stats.achievementsUnlocked,
        color: 'text-gold-400',
    },
])
</script>

<template>
    <div class="bg-parchment-100 border border-medieval-200 rounded-lg shadow">
        <!-- Card Header -->
        <div class="border-b border-medieval-200 p-6">
            <h3 class="font-display text-xl font-semibold text-medieval-800">
                Estatísticas
            </h3>
        </div>

        <!-- Card Content -->
        <div class="p-6">
            <div class="flex flex-col gap-4">
                <div v-for="item in statItems" :key="item.label" class="flex items-center gap-4 p-4 bg-white rounded-lg border border-medieval-200 hover:border-gold-400 transition-colors">
                    <!-- Icon Container -->
                    <div :class="['p-3 rounded-full bg-parchment-100', item.color]">
                        <component :is="item.icon" class="h-6 w-6" :stroke-width="2" />
                    </div>

                    <!-- Stats Info -->
                    <div>
                        <p class="text-3xl text-gold-500 font-display">
                            {{ item.value }}
                        </p>
                        <p class="text-sm text-medieval-600 font-ui">
                            {{ item.label }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>