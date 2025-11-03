<template>
    <div class="min-h-screen">
        <!-- Header -->
        <DashboardHeader :notification-count="3" :current-view="currentView" @search="handleSearch" @view-change="handleViewChange" />

        <!-- Main Content -->
        <NuxtLayout name="dashboard-layout" class="container mx-auto px-4 py-8">
            <DashboardExplorePage v-if="currentView === 'explore'" />

            <div v-else class="flex flex-col lg:flex-row gap-8">
                <!-- Main Column -->
                <div class="flex-1 space-y-8">
                    <!-- My Campaigns Section -->
                    <section>
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div class="flex items-center gap-3">
                                <h2 class="font-display text-medieval-800">
                                    Minhas Campanhas
                                </h2>
                                <span v-if="campaigns.length > 0" class="px-2 py-1 text-xs rounded-md bg-gold-100 text-gold-700 border border-gold-300 font-ui">
                                    {{ filteredCampaigns.length }} de {{ campaigns.length }}
                                </span>
                            </div>
                            <button @click="isModalOpen = true" class="flex items-center justify-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-md font-ui transition-colors w-full sm:w-auto">
                                <Plus class="h-4 w-4" />
                                Nova Campanha
                            </button>
                        </div>

                        <!-- Filters and Sort -->
                        <div v-if="campaigns.length > 0" class="flex flex-col sm:flex-row gap-3 mb-6">
                            <div class="flex items-center gap-2 flex-1">
                                <Filter class="h-4 w-4 text-medieval-500" />
                                <select v-model="statusFilter" class="flex-1 px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500">
                                    <option value="all">Todas</option>
                                    <option value="active">Ativas</option>
                                    <option value="hiatus">Em Hiato</option>
                                    <option value="completed">Completas</option>
                                    <option value="archived">Arquivadas</option>
                                </select>
                            </div>

                            <div class="flex items-center gap-2 flex-1">
                                <SortAsc class="h-4 w-4 text-medieval-500" />
                                <select v-model="sortBy" class="flex-1 px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500">
                                    <option value="recent">Mais Recentes</option>
                                    <option value="name">Nome A-Z</option>
                                    <option value="sessions">Mais Sessões</option>
                                </select>
                            </div>
                        </div>

                        <!-- Campaign Grid -->
                        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <DashboardCampaignSkeleton v-for="i in 6" :key="i" />
                        </div>

                        <DashboardEmptyState v-else-if="filteredCampaigns.length === 0 && campaigns.length === 0" @create-campaign="isModalOpen = true" />

                        <div v-else-if="filteredCampaigns.length === 0" class="text-center py-12 bg-white rounded-lg border border-medieval-200">
                            <p class="text-medieval-600 font-body mb-2">
                                Nenhuma campanha encontrada com os filtros selecionados.
                            </p>
                            <button @click="clearFilters" class="text-gold-600 hover:text-gold-700 font-ui transition-colors">
                                Limpar filtros
                            </button>
                        </div>

                        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <div v-for="(campaign, index) in filteredCampaigns" :key="campaign.id" class="animate-fade-in" :style="{ animationDelay: `${index * 50}ms` }">
                                <DashboardCampaignCard :campaign="campaign" @click="handleCampaignClick(campaign)" />
                            </div>
                        </div>
                    </section>

                    <!-- Activity Feed -->
                    <section v-if="campaigns.length > 0">
                        <DashboardActivityFeed :activities="mockActivities" />
                    </section>
                </div>

                <!-- Sidebar -->
                <aside v-if="campaigns.length > 0" class="lg:w-80 space-y-6">
                    <!-- Stats -->
                    <DashboardStatsCard :stats="stats" />

                    <!-- Popular Campaigns -->
                    <DashboardPopularCampaigns :campaigns="mockPopularCampaigns" />

                    <!-- Quick Tips -->
                    <DashboardQuickTip />
                </aside>
            </div>
        </NuxtLayout>

        <!-- Create Campaign Modal -->
        <DashboardCreateCampaignModal :open="isModalOpen" @close="isModalOpen = false" @create-campaign="handleCreateCampaign" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Filter, SortAsc } from 'lucide-vue-next'

type ViewType = 'campaigns' | 'explore'

// State
const currentView = ref<ViewType>('campaigns')
const isLoading = ref(false)
const isModalOpen = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const sortBy = ref('recent')

// Mock data for campaigns
const initialCampaigns: any[] = [
    {
        id: '1',
        title: 'A Torre do Mago Sombrio',
        coverImage: 'https://images.unsplash.com/photo-1683660107861-c555be9775b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGZhbnRhc3klMjBjYXN0bGV8ZW58MXx8fHwxNzYxNzk2MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'D&D 5ª Edição',
        privacy: 'private',
        sessionsCount: 24,
        charactersCount: 5,
        lastSession: 'Há 2 dias',
        tags: ['Alta Fantasia', 'Dungeon Crawl', 'Épico'],
        status: 'active',
    },
    {
        id: '2',
        title: 'Curse of Strahd',
        coverImage: 'https://images.unsplash.com/photo-1728339097250-bf673536786f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHVuZ2VvbiUyMGRhcmt8ZW58MXx8fHwxNzYxNzgzNzAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'D&D 5ª Edição',
        privacy: 'public',
        sessionsCount: 15,
        charactersCount: 4,
        lastSession: 'Há 1 semana',
        tags: ['Horror', 'Gótico', 'Ravenloft'],
        status: 'active',
    },
    {
        id: '3',
        title: 'Lost Mines of Phandelver',
        coverImage: 'https://images.unsplash.com/photo-1553069350-71209c6757bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZm9yZXN0JTIwbWFnaWNhbHxlbnwxfHx8fDE3NjE4NzU4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'D&D 5ª Edição',
        privacy: 'restricted',
        sessionsCount: 8,
        charactersCount: 3,
        lastSession: 'Há 3 dias',
        tags: ['Iniciante', 'Aventura', 'Tesouro'],
        status: 'hiatus',
    },
    {
        id: '4',
        title: 'Ruínas de Eldoria',
        coverImage: 'https://images.unsplash.com/photo-1598610768519-418002c9142e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcnVpbnMlMjBteXN0aWNhbHxlbnwxfHx8fDE3NjE4NzU4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'Pathfinder 2e',
        privacy: 'private',
        sessionsCount: 31,
        charactersCount: 6,
        lastSession: 'Há 1 dia',
        tags: ['Exploração', 'Sandbox', 'Homebrew'],
        status: 'active',
    },
    {
        id: '5',
        title: 'A Taverna do Dragão Vermelho',
        coverImage: 'https://images.unsplash.com/photo-1595007163136-82fb6da20c05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwdGF2ZXJuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxODc1ODIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'D&D 5ª Edição',
        privacy: 'public',
        sessionsCount: 42,
        charactersCount: 7,
        lastSession: 'Há 4 dias',
        tags: ['Urban', 'Intriga', 'Roleplay'],
        status: 'completed',
    },
    {
        id: '6',
        title: 'A Ascensão do Dragão',
        coverImage: 'https://images.unsplash.com/photo-1761570365095-f0ad45de3bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFnb24lMjBmYW50YXN5JTIwZXBpY3xlbnwxfHx8fDE3NjE3NjMwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'D&D 5ª Edição',
        privacy: 'restricted',
        sessionsCount: 18,
        charactersCount: 5,
        lastSession: 'Ontem',
        tags: ['Dragões', 'Épico', 'Alta Magia'],
        status: 'active',
    },
]

const campaigns = ref<any[]>(initialCampaigns)

// Mock data for activities
const mockActivities: any[] = [
    {
        id: '1',
        user: { name: 'João Silva', initials: 'JS' },
        action: 'comentou',
        campaign: 'A Torre do Mago',
        time: 'Há 2 horas',
        type: 'comment',
    },
    {
        id: '2',
        user: { name: 'Maria Santos', initials: 'MS' },
        action: 'adicionou personagem',
        campaign: 'Curse of Strahd',
        time: 'Há 5 horas',
        type: 'character',
    },
    {
        id: '3',
        user: { name: 'Pedro Costa', initials: 'PC' },
        action: 'registrou nova sessão',
        campaign: 'Lost Mines',
        time: 'Há 1 dia',
        type: 'session',
    },
    {
        id: '4',
        user: { name: 'Ana Oliveira', initials: 'AO' },
        action: 'comentou',
        campaign: 'Ruínas de Eldoria',
        time: 'Há 1 dia',
        type: 'comment',
    },
    {
        id: '5',
        user: { name: 'Carlos Lima', initials: 'CL' },
        action: 'adicionou personagem',
        campaign: 'Dragão Vermelho',
        time: 'Há 2 dias',
        type: 'character',
    },
]

// Mock data for popular campaigns
const mockPopularCampaigns: any[] = [
    {
        id: 'p1',
        title: 'Príncipes do Apocalipse',
        coverImage: 'https://images.unsplash.com/photo-1683660107861-c555be9775b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGZhbnRhc3klMjBjYXN0bGV8ZW58MXx8fHwxNzYxNzk2MDM3fDA&ixlib=rb-4.1.0&q=80&w=400',
        system: 'D&D 5e',
        followers: 1247,
    },
    {
        id: 'p2',
        title: 'Out of the Abyss',
        coverImage: 'https://images.unsplash.com/photo-1728339097250-bf673536786f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHVuZ2VvbiUyMGRhcmt8ZW58MXx8fHwxNzYxNzgzNzAzfDA&ixlib=rb-4.1.0&q=80&w=400',
        system: 'D&D 5e',
        followers: 892,
    },
    {
        id: 'p3',
        title: 'Tomb of Annihilation',
        coverImage: 'https://images.unsplash.com/photo-1553069350-71209c6757bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZm9yZXN0JTIwbWFnaWNhbHxlbnwxfHx8fDE3NjE4NzU4MjB8MA&ixlib=rb-4.1.0&q=80&w=400',
        system: 'D&D 5e',
        followers: 756,
    },
]

// Computed stats
const stats = computed<any>(() => {
    const activeCampaigns = campaigns.value.filter((c: any) => c.status === 'active').length
    const totalSessions = campaigns.value.reduce((sum: any, c: any) => sum + c.sessionsCount, 0)
    const charactersCreated = campaigns.value.reduce((sum: any, c: any) => sum + c.charactersCount, 0)

    return {
        totalSessions,
        charactersCreated,
        activeCampaigns,
        achievementsUnlocked: 12,
    }
})

// Filtered and sorted campaigns
const filteredCampaigns = computed(() => {
    let filtered = campaigns.value

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
            (campaign: any) =>
                campaign.title.toLowerCase().includes(query) ||
                campaign.system.toLowerCase().includes(query) ||
                campaign.tags.some((tag: any) => tag.toLowerCase().includes(query))
        )
    }

    // Status filter
    if (statusFilter.value !== 'all') {
        filtered = filtered.filter((campaign: any) => campaign.status === statusFilter.value)
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
        switch (sortBy.value) {
            case 'name':
                return a.title.localeCompare(b.title)
            case 'sessions':
                return b.sessionsCount - a.sessionsCount
            case 'recent':
            default:
                return 0
        }
    })

    return filtered
})

// Methods
const handleSearch = (query: string) => {
    searchQuery.value = query
}

const handleViewChange = (view: ViewType) => {
    currentView.value = view
}

const clearFilters = () => {
    searchQuery.value = ''
    statusFilter.value = 'all'
}

const handleCreateCampaign = (formData: any) => {
    const newCampaign: any = {
        id: Date.now().toString(),
        title: formData.title,
        coverImage: 'https://images.unsplash.com/photo-1683660107861-c555be9775b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGZhbnRhc3klMjBjYXN0bGV8ZW58MXx8fHwxNzYxNzk2MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        system: formData.system === 'dnd5e' ? 'D&D 5ª Edição' : formData.system,
        privacy: formData.privacy,
        sessionsCount: 0,
        charactersCount: 0,
        lastSession: 'Nunca',
        tags: [],
        status: 'active',
    }

    campaigns.value = [newCampaign, ...campaigns.value]
    isModalOpen.value = false
}

const handleCampaignClick = (campaign: any) => {
    console.log('Abrindo campanha:', campaign.title)
    // Navigate to campaign detail page using navigateTo()
}
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
    opacity: 0;
}
</style>