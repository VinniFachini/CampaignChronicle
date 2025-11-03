<script setup lang="ts">
import { TrendingUp, ArrowRight } from 'lucide-vue-next'

export interface PopularCampaign {
    id: string
    title: string
    coverImage: string
    system: string
    followers: number
}

interface Props {
    campaigns: PopularCampaign[]
}

defineProps<Props>()
</script>

<template>
    <div class="bg-white border border-medieval-200 rounded-lg shadow">
        <!-- Card Header -->
        <div class="border-b border-medieval-100 p-6">
            <h3 class="font-display text-xl font-semibold text-medieval-800 flex items-center gap-2">
                <TrendingUp class="h-5 w-5 text-gold-500" />
                Populares da Comunidade
            </h3>
        </div>

        <!-- Card Content -->
        <div class="p-4 space-y-4">
            <div v-for="campaign in campaigns" :key="campaign.id" class="group cursor-pointer rounded-lg overflow-hidden border border-medieval-200 hover:border-gold-400 transition-all hover:shadow-md">
                <!-- Campaign Cover Image with 16:9 Aspect Ratio -->
                <div class="relative w-full overflow-hidden" style="padding-bottom: 56.25%">
                    <img :src="campaign.coverImage" :alt="campaign.title" class="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                </div>

                <!-- Campaign Info -->
                <div class="p-3 space-y-1">
                    <h4 class="font-display text-medieval-800 line-clamp-1">
                        {{ campaign.title }}
                    </h4>
                    <p class="text-sm text-medieval-600 font-ui">
                        {{ campaign.system }}
                    </p>
                    <p class="text-sm text-medieval-500 font-ui">
                        {{ campaign.followers }} seguidores
                    </p>
                </div>
            </div>

            <!-- View More Button -->
            <button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-gold-600 hover:text-gold-700 hover:bg-gold-50 font-ui rounded-md transition-colors">
                Ver mais campanhas
                <ArrowRight class="h-4 w-4" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>