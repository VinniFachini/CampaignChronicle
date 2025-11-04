<script setup lang="ts">
import { Edit2, Trash2, MoreVertical, Copy, FileDown, Share2, ChevronRight } from 'lucide-vue-next'

interface SessionEvent {
    type: string
    // outras propriedades...
}

interface Session {
    id: string | number
    campaignName: string
    title: string
    date: Date | string
    duration: number
    events: SessionEvent[]
}

const showDropdown = ref(false)

// Mock data - futuramente será substituído por fetch
const session = ref<Session>({
    id: 1,
    campaignName: 'A Coroa dos Dragões',
    title: 'A Busca pela Espada Perdida',
    date: new Date('2024-03-15'),
    duration: 240, // 4 horas em minutos
    events: [
        { type: 'roleplay' },
        { type: 'combat' },
        { type: 'discovery' },
        { type: 'death' },
        { type: 'decision' },
    ]
})

const eventIcons: { [key: string]: string } = {
    roleplay: '🎭',
    combat: '⚔️',
    death: '💀',
    discovery: '🔍',
    decision: '⚖️',
}

const eventColors: { [key: string]: string } = {
    roleplay: 'bg-blue-100 text-blue-800 border-blue-300',
    combat: 'bg-red-100 text-red-800 border-red-300',
    death: 'bg-gray-100 text-gray-800 border-gray-400',
    discovery: 'bg-green-100 text-green-800 border-green-300',
    decision: 'bg-purple-100 text-purple-800 border-purple-300',
}

const formattedDate = computed(() => {
    const date = typeof session.value.date === 'string'
        ? new Date(session.value.date)
        : session.value.date

    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
})

const duration = computed(() => {
    const hours = Math.floor(session.value.duration / 60)
    const minutes = session.value.duration % 60
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`
})

const uniqueEventTypes = computed(() => {
    return [...new Set(session.value.events.map(e => e.type))]
})
</script>

<template>
    <div class="bg-parchment-50 rounded-lg p-6 mb-6 shadow">
        <!-- Breadcrumb -->
        <nav class="mb-4">
            <ol class="flex items-center gap-2 text-sm font-ui">
                <li>
                    <a href="#" class="text-medieval-700 hover:text-gold-400 transition-colors">
                        {{ session?.campaignName }}
                    </a>
                </li>
                <li>
                    <ChevronRight class="w-4 h-4 text-medieval-500" />
                </li>
                <li>
                    <a href="#" class="text-medieval-700 hover:text-gold-400 transition-colors">
                        Sessões
                    </a>
                </li>
                <li>
                    <ChevronRight class="w-4 h-4 text-medieval-500" />
                </li>
                <li>
                    <span class="text-medieval-700">
                        Sessão #{{ session?.id }}
                    </span>
                </li>
            </ol>
        </nav>

        <!-- Header Content -->
        <div class="flex items-start justify-between gap-4 mb-4">
            <div class="flex-1">
                <!-- Title -->
                <div class="flex items-center gap-3 mb-2">
                    <span class="text-gold-400 text-3xl">✦</span>
                    <h1 class="text-4xl font-display text-medieval-700 m-0">{{ session.title }}</h1>
                    <span class="text-gold-400 text-3xl">✦</span>
                </div>

                <!-- Meta Information -->
                <div class="flex flex-wrap items-center gap-3 mt-3 font-ui">
                    <span class="text-medieval-500">{{ formattedDate }}</span>
                    <span class="text-medieval-500">•</span>
                    <span class="text-medieval-500">{{ duration }}</span>

                    <!-- Event Type Badges -->
                    <span v-for="type in uniqueEventTypes" :key="type" :class="['inline-flex items-center font-ui px-2 py-1 text-xs rounded-md border', eventColors[type]]">
                        <span class="mr-1">{{ eventIcons[type] }}</span>
                        {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                    </span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2 font-ui">
                <button class="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-parchment-300 rounded-md bg-parchment-50 hover:bg-parchment-100 transition-colors">
                    <Edit2 class="w-4 h-4" />
                    Editar
                </button>
                <button class="inline-flex items-center gap-2 px-3 py-1.5 text-sm border bg-parchment-50 border-parchment-300 rounded-md text-error-500 hover:border-error-500 hover:text-error-500 hover:bg-red-50 transition-colors">
                    <Trash2 class="w-4 h-4" />
                    Excluir
                </button>

                <!-- Dropdown Menu -->
                <div class="relative">
                    <button class="inline-flex items-center px-3 py-2 text-sm border border-parchment-300 rounded-md hover:bg-parchment-100 transition-colors" @click="showDropdown = !showDropdown">
                        <MoreVertical class="w-4 h-4" />
                    </button>

                    <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10" @click="showDropdown = false">
                            <div class="py-1">
                                <button class="w-full flex items-center gap-2 px-4 py-2 text-sm text-medieval-700 hover:bg-parchment-100 transition-colors">
                                    <Copy class="w-4 h-4" />
                                    Duplicar
                                </button>
                                <button class="w-full flex items-center gap-2 px-4 py-2 text-sm text-medieval-700 hover:bg-parchment-100 transition-colors">
                                    <FileDown class="w-4 h-4" />
                                    Exportar PDF
                                </button>
                                <button class="w-full flex items-center gap-2 px-4 py-2 text-sm text-medieval-700 hover:bg-parchment-100 transition-colors">
                                    <Share2 class="w-4 h-4" />
                                    Compartilhar
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.parchment-bg {
    background-color: #f5f1e8;
}

.paper-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ornament {
    color: var(--gold-dark, #D4AF37);
}

</style>