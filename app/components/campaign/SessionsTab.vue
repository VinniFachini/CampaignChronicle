<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
                <h2 class="font-display text-medieval-700 text-2xl mb-1">Sessões da Campanha</h2>
                <p class="text-medieval-400 font-ui">Total: {{ completedCount }} sessões completadas, {{ scheduledCount }} agendada</p>
            </div>
            <button v-if="isGM" class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui shadow-md px-4 py-2 rounded-md flex items-center transition-colors">
                <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                Nova Sessão
            </button>
        </div>

        <!-- Filters -->
        <div class="bg-parchment-50 border border-gold-400/30 rounded-lg shadow-md">
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="relative">
                        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
                        <input v-model="searchQuery" type="text" placeholder="Buscar sessões..." class="w-full pl-10 pr-4 py-2 bg-parchment-50 border border-gold-400/30 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-400" />
                    </div>

                    <select v-model="statusFilter" class="w-full px-4 py-2 bg-parchment-50 border border-gold-400/30 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-400">
                        <option value="all">Todos os Status</option>
                        <option value="completed">Concluídas</option>
                        <option value="scheduled">Agendadas</option>
                        <option value="cancelled">Canceladas</option>
                    </select>

                    <select v-model="sortBy" class="w-full px-4 py-2 bg-parchment-50 border border-gold-400/30 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-400">
                        <option value="recent">Mais recentes</option>
                        <option value="oldest">Mais antigas</option>
                        <option value="duration">Duração</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Sessions List -->
        <div class="grid grid-cols-1 gap-4">
            <div v-for="session in filteredAndSortedSessions" :key="session.id" class="bg-parchment-50 border border-gold-400/30 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <!-- Header -->
                <div class="p-6 border-b border-gold-400/20">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="border border-gold-500 text-gold-500 px-3 py-1 rounded-full text-xs font-ui">
                                    Sessão #{{ session.id }}
                                </span>
                                <span :class="[
                                    'px-3 py-1 rounded-full text-xs font-ui',
                                    session.status === 'completed'
                                        ? 'bg-success-500 text-white'
                                        : session.status === 'scheduled'
                                            ? 'bg-info-500 text-white'
                                            : 'bg-medieval-400 text-white'
                                ]">
                                    {{ session.status === 'completed' ? 'Concluída' : session.status === 'scheduled' ? 'Agendada' : 'Cancelada' }}
                                </span>
                            </div>
                            <h3 class="font-display text-medieval-700 text-lg font-semibold">{{ session.title }}</h3>
                            <div class="flex flex-wrap gap-3 mt-2 font-ui text-sm text-gray-500">
                                <span class="flex items-center gap-1">
                                    <Icon name="lucide:calendar" class="w-3 h-3" />
                                    {{ session.date }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <Icon name="lucide:clock" class="w-3 h-3" />
                                    {{ session.duration }}
                                </span>
                            </div>
                        </div>
                        <img v-if="session.thumbnail" :src="session.thumbnail" :alt="session.title" class="w-24 h-24 object-cover rounded-lg border-2 border-gold-400/30 hidden md:block" />
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <p class="font-body text-medieval-500 mb-4 leading-relaxed">
                        {{ session.summary }}
                    </p>

                    <!-- Events Tags -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span v-for="(event, idx) in session.events" :key="idx" class="border border-gold-400 text-medieval-400 px-3 py-1 rounded-full text-xs font-ui">
                            {{ event }}
                        </span>
                    </div>

                    <div class="flex gap-2">
                        <button class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui px-4 py-2 rounded-md text-sm transition-colors">
                            Ver Detalhes
                        </button>
                        <button v-if="isGM && session.status === 'completed'" class="border border-gold-400 text-gold-500 hover:bg-gold-400/20 font-ui px-4 py-2 rounded-md text-sm transition-colors">
                            Editar Resumo
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredAndSortedSessions.length === 0" class="bg-parchment-50 border border-gold-400/30 rounded-lg shadow-md">
            <div class="py-12 text-center px-6">
                <Icon name="lucide:scroll" class="w-16 h-16 text-gold-400 mx-auto mb-4 opacity-50" />
                <h3 class="font-display text-medieval-700 mb-2 text-lg">Nenhuma sessão encontrada</h3>
                <p class="text-medieval-400 font-ui mb-6">
                    {{ searchQuery || statusFilter !== 'all' ? 'Tente ajustar os filtros para encontrar sessões.' : 'Comece criando sua primeira sessão para esta campanha.' }}
                </p>
                <button v-if="!searchQuery && statusFilter === 'all'" class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui px-4 py-2 rounded-md flex items-center mx-auto transition-colors">
                    <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                    Criar Primeira Sessão
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Session {
    id: number
    title: string
    date: string
    duration: string
    status: 'completed' | 'scheduled' | 'cancelled'
    summary: string
    events: string[]
    thumbnail?: string
    dateValue?: Date
    durationMinutes?: number
}

interface SessionsTabProps {
    isGM?: boolean
}

const props = withDefaults(defineProps<SessionsTabProps>(), {
    isGM: false
})

const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('recent')

const sessions: Session[] = [
    {
        id: 12,
        title: "O Covil do Dragão Vermelho",
        date: "28 de Outubro, 2024",
        duration: "4h 30min",
        status: "completed",
        summary: "Batalha épica contra Infernus. Recuperação da segunda relíquia.",
        events: ["Combate épico", "Morte temporária", "Relíquia obtida"],
        thumbnail: "https://images.unsplash.com/photo-1610926597998-fc7f2c1b89b0?w=300",
        dateValue: new Date(2024, 9, 28),
        durationMinutes: 270
    },
    {
        id: 11,
        title: "A Jornada pelas Montanhas Gélidas",
        date: "14 de Outubro, 2024",
        duration: "4h 00min",
        status: "completed",
        summary: "Travessia perigosa pelas montanhas. Encontro com os Anões de Ironpeak.",
        events: ["Exploração", "Roleplay intenso", "Aliança formada"],
        thumbnail: "https://images.unsplash.com/photo-1485465053475-dd55ed3894b9?w=300",
        dateValue: new Date(2024, 9, 14),
        durationMinutes: 240
    },
    {
        id: 10,
        title: "Intrigas na Corte Real",
        date: "30 de Setembro, 2024",
        duration: "3h 45min",
        status: "completed",
        summary: "Navegação política delicada. Revelação de traição dentro do reino.",
        events: ["Investigação", "Roleplay político", "Plot twist"],
        thumbnail: "https://images.unsplash.com/photo-1485465053475-dd55ed3894b9?w=300",
        dateValue: new Date(2024, 8, 30),
        durationMinutes: 225
    },
    {
        id: 13,
        title: "O Templo Esquecido",
        date: "11 de Novembro, 2024",
        duration: "A definir",
        status: "scheduled",
        summary: "Próxima aventura: exploração de ruínas antigas em busca de pistas.",
        events: ["Planejado"],
        thumbnail: "https://images.unsplash.com/photo-1618385418700-35dc948cdeec?w=300",
        dateValue: new Date(2024, 10, 11),
        durationMinutes: 0
    },
]

// Filter by status
const statusFilteredSessions = computed(() => {
    if (statusFilter.value === 'all') return sessions
    return sessions.filter(session => session.status === statusFilter.value)
})

// Filter by search query
const searchFilteredSessions = computed(() => {
    if (!searchQuery.value.trim()) return statusFilteredSessions.value

    const query = searchQuery.value.toLowerCase()
    return statusFilteredSessions.value.filter(session => {
        return (
            session.title.toLowerCase().includes(query) ||
            session.summary.toLowerCase().includes(query) ||
            session.events.some(event => event.toLowerCase().includes(query))
        )
    })
})

// Sort sessions
const filteredAndSortedSessions = computed(() => {
    const sorted = [...searchFilteredSessions.value]

    switch (sortBy.value) {
        case 'recent':
            return sorted.sort((a, b) => (b.dateValue?.getTime() || 0) - (a.dateValue?.getTime() || 0))
        case 'oldest':
            return sorted.sort((a, b) => (a.dateValue?.getTime() || 0) - (b.dateValue?.getTime() || 0))
        case 'duration':
            return sorted.sort((a, b) => (b.durationMinutes || 0) - (a.durationMinutes || 0))
        default:
            return sorted
    }
})

// Counters
const completedCount = computed(() => sessions.filter(s => s.status === 'completed').length)
const scheduledCount = computed(() => sessions.filter(s => s.status === 'scheduled').length)
</script>