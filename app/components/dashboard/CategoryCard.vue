<template>
    <button @click="$emit('click')" :class="[
        'w-full flex items-center justify-between p-3 rounded-lg border transition-all group',
        isSelected
            ? 'border-gold-500 bg-gold-50'
            : 'border-medieval-200 hover:border-gold-400 hover:bg-gold-50'
    ]">
        <div class="flex items-center gap-3">
            <span class="text-2xl">{{ category.icon }}</span>
            <div class="text-left">
                <p :class="[
                    'font-ui',
                    isSelected ? 'text-gold-700' : 'text-medieval-800 group-hover:text-gold-700'
                ]">
                    {{ category.name }}
                </p>
                <p class="text-xs text-medieval-500 font-ui">
                    {{ category.campaignCount }} campanhas
                </p>
            </div>
        </div>
        <Check v-if="isSelected" class="h-4 w-4 text-gold-600" />
        <ChevronRight v-else class="h-4 w-4 text-medieval-400 group-hover:text-gold-600 transition-colors" />
    </button>
</template>

<script setup lang="ts">
import { ChevronRight, Check } from 'lucide-vue-next'
import type { Category } from './ExplorePage.vue'

interface Props {
    category: Category
    isSelected?: boolean
}

withDefaults(defineProps<Props>(), {
    isSelected: false
})

defineEmits<{
    click: []
}>()
</script>