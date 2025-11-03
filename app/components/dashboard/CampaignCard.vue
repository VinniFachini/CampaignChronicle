<template>
    <div @click="$emit('click')" class="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20 hover:-translate-y-1 hover:border-gold-500 bg-white rounded-lg border border-medieval-200">
        <!-- Cover Image -->
        <div class="relative overflow-hidden">
            <div class="relative w-full pb-[56.25%]">
                <img :src="campaign.coverImage" :alt="campaign.title" class="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div class="absolute top-3 right-3 flex gap-2">
                <span :class="[
                    'inline-flex items-center px-2 py-1 text-xs rounded-md border font-ui',
                    statusColors[campaign.status]
                ]">
                    {{ statusLabels[campaign.status] }}
                </span>
            </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">
            <!-- Title and System -->
            <div>
                <h3 class="font-display text-medieval-800 mb-1 line-clamp-1">
                    {{ campaign.title }}
                </h3>
                <p class="text-sm text-medieval-600 font-ui opacity-80">
                    {{ campaign.system }}
                </p>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-4 text-sm text-medieval-600 font-ui">
                <div class="flex items-center gap-1">
                    <Calendar class="h-4 w-4 text-gold-500" />
                    <span>{{ campaign.sessionsCount }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <Users class="h-4 w-4 text-gold-500" />
                    <span>{{ campaign.charactersCount }}</span>
                </div>
                <div class="flex items-center gap-1 text-medieval-500">
                    <component :is="privacyIcon" class="h-4 w-4" />
                    <span>{{ privacyLabels[campaign.privacy] }}</span>
                </div>
            </div>

            <!-- Last Session -->
            <p class="text-sm text-medieval-500 font-ui">
                Última sessão: {{ campaign.lastSession }}
            </p>

            <!-- Tags -->
            <div v-if="campaign.tags.length > 0" class="flex flex-wrap gap-2">
                <span v-for="tag in campaign.tags.slice(0, 3)" :key="tag" class="inline-flex items-center px-2 py-1 text-xs rounded-md bg-parchment-100 text-medieval-700 border border-medieval-200 font-ui">
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Calendar, Users, Lock, Globe, Link2 } from 'lucide-vue-next'

interface Props {
    campaign: any
}

const props = defineProps<Props>()

defineEmits<{
    click: []
}>()

const privacyIcons: any = {
    private: Lock,
    public: Globe,
    restricted: Link2,
}

const privacyLabels: any = {
    private: 'Privada',
    public: 'Pública',
    restricted: 'Restrita',
}

const statusColors: any = {
    active: 'bg-success-500/10 text-success-500 border-success-500/20',
    hiatus: 'bg-warning-500/10 text-warning-500 border-warning-500/20',
    completed: 'bg-info-500/10 text-info-500 border-info-500/20',
    archived: 'bg-medieval-200 text-medieval-600 border-medieval-300',
}

const statusLabels: any = {
    active: 'Ativa',
    hiatus: 'Hiato',
    completed: 'Completa',
    archived: 'Arquivada',
}

const privacyIcon = computed(() => privacyIcons[props.campaign.privacy])
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>