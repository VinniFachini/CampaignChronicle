<template>
    <button @click="$emit('click')" class="w-full flex gap-3 p-3 rounded-lg border border-medieval-200 hover:border-gold-400 hover:bg-gold-50 transition-all group text-left">
        <div class="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
            <img :src="campaign.coverImage" :alt="campaign.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" @error="handleImageError" />
        </div>
        <div class="flex-1 min-w-0">
            <h4 class="font-ui text-medieval-800 group-hover:text-gold-700 mb-1 truncate">
                {{ campaign.title }}
            </h4>
            <p class="text-xs text-medieval-500 font-ui mb-2">
                {{ campaign.system }}
            </p>
            <div class="flex items-center gap-3 text-xs text-medieval-600 font-ui">
                <div class="flex items-center gap-1">
                    <Calendar class="h-3 w-3" />
                    <span>{{ campaign.sessionsCount }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <Users class="h-3 w-3" />
                    <span>{{ campaign.charactersCount }}</span>
                </div>
            </div>
        </div>
    </button>
</template>

<script setup lang="ts">
import { Users, Calendar } from 'lucide-vue-next'

interface Props {
    campaign: any
}

defineProps<Props>()

defineEmits<{
    click: []
}>()

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    // Fallback image - you can customize this
    img.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400'
}
</script>