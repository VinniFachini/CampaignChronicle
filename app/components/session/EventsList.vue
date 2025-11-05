<template>
    <div class="bg-parchment-100 border border-medieval-300 rounded-lg shadow-sm">
        <div class="p-6 border-b border-medieval-200">
            <h3 class="text-lg font-display font-semibold text-medieval-800">
                Eventos Marcantes
            </h3>
        </div>
        <div class="p-6 space-y-4">
            <div v-if="events.length === 0" class="text-center py-8 text-medieval-500">
                <p class="font-ui">Nenhum evento adicionado ainda.</p>
                <p class="text-sm mt-1">Clique em "Adicionar Evento" para começar.</p>
            </div>

            <div v-else class="space-y-3">
                <div v-for="(event, index) in events" :key="event.id" :draggable="true" @dragstart="handleDragStart(index)" @dragover.prevent="handleDragOver($event, index)" @dragend="handleDragEnd" :class="[
                    'flex items-center gap-3 p-3 bg-white rounded-md border border-medieval-300 transition-all hover:border-gold-500 cursor-move',
                    draggedIndex === index ? 'opacity-50' : 'opacity-100'
                ]">
                    <!-- Drag Handle -->
                    <div class="cursor-grab active:cursor-grabbing">
                        <GripVertical class="h-5 w-5 text-medieval-400" />
                    </div>

                    <!-- Icon -->
                    <div class="flex-shrink-0">
                        <component :is="eventIcons[event.type].icon" class="h-5 w-5 text-medieval-600" />
                    </div>

                    <!-- Content - Select and Input in same line -->
                    <div class="flex-1 flex gap-2 items-center">
                        <select :value="event.type" @change="updateEvent(event.id, { type: ($event.target as HTMLSelectElement).value as SessionEvent['type'] })" class="px-3 py-1.5 border border-medieval-300 rounded-md bg-parchment-50 font-ui text-sm min-w-[180px] focus:outline-none focus:ring-2 focus:ring-gold-500">
                            <option v-for="[key, { label }] in Object.entries(eventIcons)" :key="key" :value="key">
                                {{ label }}
                            </option>
                        </select>

                        <input :value="event.description" @input="updateEvent(event.id, { description: ($event.target as HTMLInputElement).value })" placeholder="Descreva o evento..." class="flex-1 px-3 py-1.5 bg-parchment-50 border border-medieval-300 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" />
                    </div>

                    <!-- Remove Button -->
                    <button @click="removeEvent(event.id)" class="h-8 w-8 flex items-center justify-center hover:bg-red-50 hover:text-red-600 rounded transition-colors flex-shrink-0">
                        <X class="h-4 w-4" />
                    </button>
                </div>
            </div>

            <button @click="addEvent" class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-medieval-400 text-medieval-700 hover:bg-medieval-50 rounded-md font-ui transition-colors">
                <Plus class="h-4 w-4" />
                Adicionar Evento
            </button>

            <p v-if="events.length === 0" class="text-sm text-medieval-500 text-center font-ui">
                Sugestão: adicione pelo menos um evento importante da sessão
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    Plus,
    GripVertical,
    X,
    Swords,
    Skull,
    Gem,
    Theater,
    Shuffle,
    Map,
    Users,
} from 'lucide-vue-next'

export interface SessionEvent {
    id: string
    type: 'combat' | 'death' | 'treasure' | 'roleplay' | 'twist' | 'location' | 'npc' | 'discovery' | 'decision'
    description: string
    title?: string
}

interface Props {
    events: SessionEvent[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:events': [events: SessionEvent[]]
}>()

const draggedIndex = ref<number | null>(null)

const eventIcons = {
    combat: { icon: Swords, label: '⚔️ Combate' },
    death: { icon: Skull, label: '💀 Morte de personagem' },
    treasure: { icon: Gem, label: '💎 Tesouro/descoberta' },
    discovery: { icon: Gem, label: '🔍 Descoberta' },
    roleplay: { icon: Theater, label: '🎭 Momento roleplay' },
    twist: { icon: Shuffle, label: '🔀 Reviravolta' },
    decision: { icon: Shuffle, label: '⚖️ Decisão importante' },
    location: { icon: Map, label: '🗺️ Nova localização' },
    npc: { icon: Users, label: '🤝 NPC importante' },
}

const addEvent = () => {
    const newEvent: SessionEvent = {
        id: `event-${Date.now()}`,
        type: 'combat',
        description: '',
    }
    emit('update:events', [...props.events, newEvent])
}

const removeEvent = (id: string) => {
    emit('update:events', props.events.filter((e) => e.id !== id))
}

const updateEvent = (id: string, updates: Partial<SessionEvent>) => {
    emit(
        'update:events',
        props.events.map((e) => (e.id === id ? { ...e, ...updates } : e))
    )
}

const handleDragStart = (index: number) => {
    draggedIndex.value = index
}

const handleDragOver = (e: DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex.value === null || draggedIndex.value === index) return
    if (draggedIndex.value < 0 || draggedIndex.value >= props.events.length) return

    const newEvents = [...props.events]
    const draggedEvent = newEvents[draggedIndex.value]

    if (!draggedEvent) return

    newEvents.splice(draggedIndex.value, 1)
    newEvents.splice(index, 0, draggedEvent)

    emit('update:events', newEvents)
    draggedIndex.value = index
}

const handleDragEnd = () => {
    draggedIndex.value = null
}
</script>

<style scoped>
.cursor-grab {
    cursor: grab;
}

.cursor-grab:active {
    cursor: grabbing;
}

.cursor-move {
    cursor: move;
}
</style>