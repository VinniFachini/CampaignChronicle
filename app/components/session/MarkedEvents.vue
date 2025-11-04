<template>
    <div v-if="events.length > 0" class="parchment-bg paper-shadow border border-medieval-300 rounded-lg mb-8">
        <div class="p-6 border-b border-medieval-200">
            <h3 class="flex items-center gap-2 text-medieval-800 font-display text-lg font-semibold">
                <Sparkles class="w-5 h-5 text-gold-500" />
                Eventos Marcantes
            </h3>
        </div>
        <div class="p-6">
            <ul class="space-y-3">
                <li v-for="event in events" :key="event.id" class="flex items-start gap-3">
                    <span :class="['text-2xl', eventColors[event.type]]">
                        {{ eventIcons[event.type] }}
                    </span>
                    <div class="flex-1">
                        <h4 class="text-medieval-800 font-display font-semibold m-0">
                            {{ event.title }}
                        </h4>
                        <p class="text-sm text-medieval-600 font-ui m-0 mt-1">
                            {{ event.description }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'

interface SessionEvent {
    id: string
    type: 'roleplay' | 'combat' | 'death' | 'discovery' | 'decision'
    title: string
    description: string
}

interface Props {
    events: SessionEvent[]
}

defineProps<Props>()

const eventIcons: Record<string, string> = {
    roleplay: '🎭',
    combat: '⚔️',
    death: '💀',
    discovery: '🔍',
    decision: '⚖️',
}

const eventColors: Record<string, string> = {
    roleplay: 'text-blue-600',
    combat: 'text-red-600',
    death: 'text-gray-700',
    discovery: 'text-green-600',
    decision: 'text-purple-600',
}
</script>

<style scoped>
.parchment-bg {
    background-color: #FAF7F0;
}

.paper-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>