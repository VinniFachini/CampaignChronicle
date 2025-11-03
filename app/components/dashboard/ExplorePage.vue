<template>
    <div class="space-y-8">
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-medieval-800 to-medieval-700 rounded-lg p-8 text-white">
            <div class="max-w-3xl">
                <div class="flex items-center gap-2 mb-3">
                    <TrendingUp class="h-6 w-6 text-gold-400" />
                    <span class="font-ui text-gold-400 uppercase tracking-wide">
                        Explorar Campanhas
                    </span>
                </div>
                <h2 class="font-display text-white mb-4">
                    Descubra Aventuras Épicas
                </h2>
                <p class="font-body text-parchment-100 text-lg">
                    Explore campanhas públicas da comunidade, encontre inspiração para
                    suas próprias histórias e conecte-se com outros narradores ao redor
                    do mundo.
                </p>
            </div>
        </section>

        <!-- Search and Filters -->
        <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1 relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-medieval-400" />
                <input v-model="searchQuery" placeholder="Buscar por título, sistema ou tags..." class="w-full pl-10 pr-4 py-3 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" />
            </div>
            <div class="flex gap-3">
                <button @click="showFilters = !showFilters" :class="[
                    'flex items-center gap-2 px-4 py-3 rounded-md font-ui transition-colors',
                    showFilters
                        ? 'bg-gold-500 hover:bg-gold-600 text-white'
                        : 'border border-medieval-200 text-medieval-700 hover:bg-parchment-100'
                ]">
                    <SlidersHorizontal class="h-4 w-4" />
                    Filtros
                </button>
                <select v-model="sortBy" class="w-[180px] px-3 py-3 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500">
                    <option value="popular">Mais Populares</option>
                    <option value="recent">Mais Recentes</option>
                    <option value="name">Nome A-Z</option>
                </select>
            </div>
        </div>

        <!-- Filters Panel -->
        <DashboardExploreFilters v-if="showFilters" :filters="filters" @update:filters="filters = $event" />

        <!-- Main Content -->
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Campaign Grid -->
            <div class="flex-1">
                <div class="mb-4">
                    <p class="text-medieval-600 font-ui">
                        {{ filteredCampaigns.length }} campanhas encontradas
                    </p>
                </div>

                <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <DashboardCampaignSkeleton v-for="i in 6" :key="i" />
                </div>

                <div v-else-if="filteredCampaigns.length === 0" class="text-center py-12 bg-white rounded-lg border border-medieval-200">
                    <p class="text-medieval-600 font-body mb-2">
                        Nenhuma campanha encontrada com os critérios selecionados.
                    </p>
                    <button @click="clearAllFilters" class="text-gold-600 hover:text-gold-700 font-ui transition-colors">
                        Limpar filtros
                    </button>
                </div>

                <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div v-for="(campaign, index) in filteredCampaigns" :key="campaign.id" class="animate-fade-in" :style="{ animationDelay: `${index * 50}ms` }">
                        <DashboardCampaignCard :campaign="campaign" @click="handleCampaignClick(campaign)" />
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <aside class="lg:w-80 space-y-6">
                <!-- Categories -->
                <div class="bg-white rounded-lg border border-medieval-200 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-display text-medieval-800">
                            Categorias Populares
                        </h3>
                        <button v-if="selectedCategory" @click="selectedCategory = null" class="text-xs text-medieval-600 hover:text-medieval-800 font-ui p-1 transition-colors">
                            Limpar
                        </button>
                    </div>
                    <div class="space-y-2">
                        <DashboardCategoryCard v-for="category in categories" :key="category.id" :category="category" :is-selected="selectedCategory === category.id" @click="toggleCategory(category.id)" />
                    </div>
                </div>

                <!-- Featured Campaigns -->
                <div class="bg-white rounded-lg border border-medieval-200 p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <Star class="h-5 w-5 text-gold-500" />
                        <h3 class="font-display text-medieval-800">Em Destaque</h3>
                    </div>
                    <div class="space-y-4">
                        <DashboardFeaturedCampaignCard v-for="campaign in featuredCampaigns" :key="campaign.id" :campaign="campaign" @click="handleCampaignClick(campaign)" />
                    </div>
                </div>

                <!-- Stats -->
                <div class="bg-gradient-to-br from-gold-50 to-parchment-100 rounded-lg border border-gold-200 p-6">
                    <h3 class="font-display text-medieval-800 mb-4">
                        Comunidade
                    </h3>
                    <div class="space-y-3 font-ui text-sm">
                        <div class="flex justify-between">
                            <span class="text-medieval-600">Campanhas Públicas</span>
                            <span class="text-medieval-800">1,247</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-medieval-600">Narradores Ativos</span>
                            <span class="text-medieval-800">3,892</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-medieval-600">Sessões Esta Semana</span>
                            <span class="text-medieval-800">456</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, SlidersHorizontal, TrendingUp, Star } from 'lucide-vue-next'

export interface Category {
    id: string
    name: string
    icon: string
    campaignCount: number
}

interface Filters {
    system: string
    tags: string[]
    difficulty: string
    players: string
}

// State
const searchQuery = ref('')
const sortBy = ref('popular')
const isLoading = ref(false)
const showFilters = ref(false)
const selectedCategory = ref<string | null>(null)
const filters = ref<Filters>({
    system: 'all',
    tags: [],
    difficulty: 'all',
    players: 'all',
})

// Mock data for public campaigns
const publicCampaigns: any[] = [
    {
        id: 'pub1',
        title: 'Waterdeep: Dragon Heist',
        coverImage: 'https://images.unsplash.com/photo-1683660107861-c555be9775b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGZhbnRhc3klMjBjYXN0bGV8ZW58MXx8fHwxNzYxNzk2MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'D&D 5ª Edição',
        privacy: 'public',
        sessionsCount: 45,
        charactersCount: 4,
        lastSession: 'Há 1 dia',
        tags: ['Urban', 'Heist', 'Intrigue'],
        status: 'active',
    },
    {
        id: 'pub2',
        title: 'Icewind Dale: Rime of the Frostmaiden',
        coverImage: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm93JTIwbW91bnRhaW4lMjBmYW50YXN5fGVufDF8fHx8MTc2MTg3NTgyMXww&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'D&D 5ª Edição',
        privacy: 'public',
        sessionsCount: 28,
        charactersCount: 5,
        lastSession: 'Há 3 dias',
        tags: ['Horror', 'Survival', 'Arctic'],
        status: 'active',
    },
    {
        id: 'pub3',
        title: 'Pathfinder: Abomination Vaults',
        coverImage: 'https://images.unsplash.com/photo-1728339097250-bf673536786f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZHVuZ2VvbiUyMGRhcmt8ZW58MXx8fHwxNzYxNzgzNzAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'Pathfinder 2e',
        privacy: 'public',
        sessionsCount: 52,
        charactersCount: 6,
        lastSession: 'Há 2 dias',
        tags: ['Dungeon Crawl', 'Horror', 'Megadungeon', 'Fantasy'],
        status: 'active',
    },
    {
        id: 'pub4',
        title: 'Blades in the Dark: Doskvol Nights',
        coverImage: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2l0eSUyMG5pZ2h0fGVufDF8fHx8MTc2MTg3NTgyMXww&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'Blades in the Dark',
        privacy: 'public',
        sessionsCount: 34,
        charactersCount: 4,
        lastSession: 'Ontem',
        tags: ['Crime', 'Steampunk', 'Heist'],
        status: 'active',
    },
    {
        id: 'pub5',
        title: 'Starfinder: Dead Suns',
        coverImage: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaWZpJTIwcGxhbmV0fGVufDF8fHx8MTc2MTg3NTgyMXww&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'Starfinder',
        privacy: 'public',
        sessionsCount: 19,
        charactersCount: 5,
        lastSession: 'Há 1 semana',
        tags: ['Sci-Fi', 'Space Opera', 'Adventure'],
        status: 'active',
    },
    {
        id: 'pub6',
        title: 'Call of Cthulhu: Masks of Nyarlathotep',
        coverImage: 'https://images.unsplash.com/photo-1509803874385-db7c23652552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwxOTIwcyUyMHZpbnRhZ2UlMjBteXN0ZXJ5fGVufDF8fHx8MTc2MTg3NTgyMXww&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'Call of Cthulhu',
        privacy: 'public',
        sessionsCount: 41,
        charactersCount: 4,
        lastSession: 'Há 5 dias',
        tags: ['Horror', 'Investigation', '1920s', 'Mystery'],
        status: 'active',
    },
    {
        id: 'pub7',
        title: 'Vampire: The Masquerade - Chicago by Night',
        coverImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbmlnaHQlMjBuZW9ufGVufDF8fHx8MTc2MTg3NTgyMXww&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'Vampire: The Masquerade',
        privacy: 'public',
        sessionsCount: 37,
        charactersCount: 5,
        lastSession: 'Há 2 dias',
        tags: ['Gothic', 'Modern', 'Political', 'Urban'],
        status: 'active',
    },
    {
        id: 'pub8',
        title: 'Tales from the Loop: The Cooling Station',
        coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwxOTgwcyUyMHN1YnVyYmFuJTIwbXlzdGVyeXxlbnwxfHx8fDE3NjE4NzU4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'Tales from the Loop',
        privacy: 'public',
        sessionsCount: 16,
        charactersCount: 4,
        lastSession: 'Há 4 dias',
        tags: ['Mystery', '1980s', 'Kids'],
        status: 'active',
    },
    {
        id: 'pub9',
        title: 'Dungeon World: The Shattered Realm',
        coverImage: 'https://images.unsplash.com/photo-1553069350-71209c6757bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZm9yZXN0JTIwbWFnaWNhbHxlbnwxfHx8fDE3NjE4NzU4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        system: 'Dungeon World',
        privacy: 'public',
        sessionsCount: 23,
        charactersCount: 5,
        lastSession: 'Há 6 dias',
        tags: ['Narrative', 'Fantasy', 'Exploration'],
        status: 'active',
    },
]

const categories: Category[] = [
    { id: 'fantasy', name: 'Alta Fantasia', icon: '🏰', campaignCount: 342 },
    { id: 'horror', name: 'Horror', icon: '👻', campaignCount: 156 },
    { id: 'scifi', name: 'Ficção Científica', icon: '🚀', campaignCount: 89 },
    { id: 'mystery', name: 'Mistério', icon: '🔍', campaignCount: 124 },
    { id: 'urban', name: 'Urbano', icon: '🏙️', campaignCount: 98 },
    { id: 'dungeon', name: 'Dungeon Crawl', icon: '⚔️', campaignCount: 201 },
]

// Map categories to relevant tags
const getCategoryTags = (categoryId: string): string[] => {
    const categoryTagMap: Record<string, string[]> = {
        fantasy: ['Alta Fantasia', 'Fantasy', 'Exploration', 'Adventure'],
        horror: ['Horror', 'Gothic', 'Survival'],
        scifi: ['Sci-Fi', 'Space Opera', 'Starfinder'],
        mystery: ['Mystery', 'Investigation', 'Intrigue'],
        urban: ['Urban', 'Crime', 'Modern', 'Political'],
        dungeon: ['Dungeon Crawl', 'Megadungeon'],
    }
    return categoryTagMap[categoryId] || []
}

// Computed properties
const filteredCampaigns = computed(() => {
    let filtered = publicCampaigns

    // Category filter
    if (selectedCategory.value) {
        const categoryTags = getCategoryTags(selectedCategory.value)
        filtered = filtered.filter((campaign) =>
            campaign.tags.some((tag: any) => categoryTags.includes(tag))
        )
    }

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
            (campaign) =>
                campaign.title.toLowerCase().includes(query) ||
                campaign.system.toLowerCase().includes(query) ||
                campaign.tags.some((tag: any) => tag.toLowerCase().includes(query))
        )
    }

    // System filter
    if (filters.value.system !== 'all') {
        filtered = filtered.filter(
            (campaign) => campaign.system === filters.value.system
        )
    }

    // Tags filter
    if (filters.value.tags.length > 0) {
        filtered = filtered.filter((campaign) =>
            filters.value.tags.some((tag) => campaign.tags.includes(tag))
        )
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
        switch (sortBy.value) {
            case 'popular':
                return b.sessionsCount - a.sessionsCount
            case 'recent':
                return 0
            case 'name':
                return a.title.localeCompare(b.title)
            default:
                return 0
        }
    })

    return filtered
})

const featuredCampaigns = computed(() => publicCampaigns.slice(0, 3))

// Methods
const toggleCategory = (categoryId: string) => {
    selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId
}

const clearAllFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = null
    filters.value = {
        system: 'all',
        tags: [],
        difficulty: 'all',
        players: 'all',
    }
}

const handleCampaignClick = (campaign: any) => {
    console.log('Ver campanha:', campaign.title)
    // Navigate to campaign detail page
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