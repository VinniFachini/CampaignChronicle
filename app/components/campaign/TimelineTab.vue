<template>
    <div class="space-y-6">
        <!-- Header with Filters -->
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
                <h2 class="font-display text-medieval-700 text-2xl mb-1">Linha do Tempo da Campanha</h2>
                <p class="text-medieval-400 font-ui">Acompanhe a jornada épica do início ao presente</p>
            </div>
            <div class="flex gap-2">
                <select v-model="eventType" class="w-[180px] px-4 py-2 bg-parchment-50 border border-gold-400/30 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-400">
                    <option value="all">Todos os eventos</option>
                    <option value="session">Sessões</option>
                    <option value="combat">Combates</option>
                    <option value="discovery">Descobertas</option>
                    <option value="social">Interações sociais</option>
                </select>
                <select v-model="sortOrder" class="w-[180px] px-4 py-2 bg-parchment-50 border border-gold-400/30 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-400">
                    <option value="desc">Mais recentes</option>
                    <option value="asc">Mais antigas</option>
                </select>
            </div>
        </div>

        <!-- Timeline -->
        <div class="relative">
            <!-- Central vertical line -->
            <div class="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-400 hidden md:block" :style="{ height: `calc(100% - 120px)` }" />

            <div class="space-y-8 md:space-y-12">
                <div v-for="(event, index) in filteredEvents" :key="event.id" :class="[
                    'relative flex items-center gap-8',
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                ]">
                    <!-- Content Card -->
                    <div :class="['w-full md:w-[calc(50%-2rem)]', index % 2 === 0 ? 'md:text-right' : 'md:text-left']">
                        <div class="parchment-texture border border-gold-400/30 rounded-lg shadow-md hover:shadow-lg transition-all">
                            <div class="p-6">
                                <div class="flex items-start justify-between mb-3">
                                    <div :class="['flex-1', index % 2 === 0 ? 'md:order-2' : '']">
                                        <span class="inline-block border border-gold-500 text-gold-500 px-3 py-1 rounded-full text-xs font-ui mb-2">
                                            Sessão #{{ event.id }}
                                        </span>
                                        <h3 class="font-display text-medieval-700 text-lg mb-1">
                                            {{ event.title }}
                                        </h3>
                                        <p class="text-sm text-medieval-400 font-ui mb-3">
                                            {{ event.date }}
                                        </p>
                                    </div>
                                </div>
                                <p class="font-body text-medieval-500 leading-relaxed">
                                    {{ event.description }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Central Icon (Desktop) -->
                    <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 items-center justify-center shadow-lg border-4 border-parchment-100 z-10">
                        <Swords v-if="event.icon === 'swords'" class="w-7 h-7 text-white" :stroke-width="2.5" />
                        <MapPin v-else-if="event.icon === 'map-pin'" class="w-7 h-7 text-white" :stroke-width="2.5" />
                        <Crown v-else-if="event.icon === 'crown'" class="w-7 h-7 text-white" :stroke-width="2.5" />
                        <Skull v-else-if="event.icon === 'skull'" class="w-7 h-7 text-white" :stroke-width="2.5" />
                        <Trophy v-else-if="event.icon === 'trophy'" class="w-7 h-7 text-white" :stroke-width="2.5" />
                        <Users v-else-if="event.icon === 'users'" class="w-7 h-7 text-white" :stroke-width="2.5" />
                        <Scroll v-else class="w-7 h-7 text-white" :stroke-width="2.5" />
                    </div>

                    <!-- Mobile Icon -->
                    <div class="md:hidden flex w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 items-center justify-center shadow-lg border-4 border-parchment-100 flex-shrink-0">
                        <Swords v-if="event.icon === 'swords'" class="w-6 h-6 text-white" :stroke-width="2.5" />
                        <MapPin v-else-if="event.icon === 'map-pin'" class="w-6 h-6 text-white" :stroke-width="2.5" />
                        <Crown v-else-if="event.icon === 'crown'" class="w-6 h-6 text-white" :stroke-width="2.5" />
                        <Skull v-else-if="event.icon === 'skull'" class="w-6 h-6 text-white" :stroke-width="2.5" />
                        <Trophy v-else-if="event.icon === 'trophy'" class="w-6 h-6 text-white" :stroke-width="2.5" />
                        <Users v-else-if="event.icon === 'users'" class="w-6 h-6 text-white" :stroke-width="2.5" />
                        <Scroll v-else class="w-6 h-6 text-white" :stroke-width="2.5" />
                    </div>

                    <!-- Spacer for alternating layout -->
                    <div class="hidden md:block w-[calc(50%-2rem)]" />
                </div>
            </div>

            <!-- Timeline Start Marker -->
            <div class="relative flex items-center justify-center mt-12">
                <div class="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center shadow-lg border-4 border-parchment-100">
                    <Scroll class="w-9 h-9 text-white" :stroke-width="2.5" />
                </div>
            </div>
            <div class="text-center mt-4">
                <p class="font-display text-medieval-700">Início da Campanha</p>
                <p class="text-sm text-medieval-400 font-ui">15 de Março, 2024</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swords, MapPin, Crown, Skull, Trophy, Users, Scroll } from 'lucide-vue-next'

const eventType = ref('all')
const sortOrder = ref('desc')

const allTimelineEvents = [
    {
        id: 12,
        type: "combat",
        title: "O Covil do Dragão Vermelho",
        date: "28 de Outubro, 2024",
        description: "Batalha épica contra Infernus. Thorne quase caiu, mas Elara o salvou com um sacrifício heroico. Recuperaram a segunda relíquia: o Cetro de Chamas Eternas.",
        icon: "swords"
    },
    {
        id: 11,
        type: "discovery",
        title: "A Jornada pelas Montanhas Gélidas",
        date: "14 de Outubro, 2024",
        description: "Travessia perigosa pelas montanhas. Encontro com os Anões de Ironpeak e formação de aliança crucial.",
        icon: "map-pin"
    },
    {
        id: 10,
        type: "social",
        title: "Intrigas na Corte Real",
        date: "30 de Setembro, 2024",
        description: "Navegação política delicada. Revelação de traição dentro do reino - o Conselheiro Mordeth trabalhava para as forças das trevas.",
        icon: "crown"
    },
    {
        id: 9,
        type: "combat",
        title: "A Emboscada na Floresta Negra",
        date: "16 de Setembro, 2024",
        description: "Grupo atacado por cultistas enquanto viajavam. Descobriram que estão sendo caçados ativamente.",
        icon: "skull"
    },
    {
        id: 8,
        type: "discovery",
        title: "O Primeiro Artefato",
        date: "2 de Setembro, 2024",
        description: "Recuperação bem-sucedida da primeira relíquia: o Anel de Proteção dos Antigos. Celebração na taverna local.",
        icon: "trophy"
    },
    {
        id: 7,
        type: "session",
        title: "Formação do Grupo",
        date: "19 de Agosto, 2024",
        description: "Encontro inicial dos heróis na cidade de Silverhaven. Unidos por destino e necessidade.",
        icon: "users"
    }
]

// Computed property for filtered and sorted events
const filteredEvents = computed(() => {
    let events = [...allTimelineEvents]

    // Filter by type
    if (eventType.value !== 'all') {
        events = events.filter(event => event.type === eventType.value)
    }

    // Sort by order
    events.sort((a, b) => {
        if (sortOrder.value === 'desc') {
            return b.id - a.id // Most recent first
        } else {
            return a.id - b.id // Oldest first
        }
    })

    return events
})
</script>

<style scoped>
.parchment-texture {
    @apply bg-parchment-50
}
</style>