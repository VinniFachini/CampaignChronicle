<template>
    <div class="bg-white rounded-lg border border-medieval-200 p-6 animate-fade-in">
        <div class="flex items-center justify-between mb-6">
            <h3 class="font-display text-medieval-800">Filtros Avançados</h3>
            <button v-if="hasActiveFilters" @click="clearFilters" class="text-sm text-medieval-600 hover:text-medieval-800 font-ui transition-colors px-2 py-1">
                Limpar Tudo
            </button>
        </div>

        <div class="space-y-6">
            <!-- System Filter -->
            <div>
                <label class="block mb-2 font-ui text-sm text-medieval-700">
                    Sistema de RPG
                </label>
                <select :value="filters.system" @change="updateSystem" class="w-full px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500">
                    <option v-for="system in systems" :key="system.value" :value="system.value">
                        {{ system.label }}
                    </option>
                </select>
            </div>

            <!-- Tags Filter -->
            <div>
                <label class="block mb-2 font-ui text-sm text-medieval-700">
                    Tags ({{ filters.tags.length }} selecionadas)
                </label>
                <div class="flex flex-wrap gap-2">
                    <span v-for="tag in availableTags" :key="tag" @click="toggleTag(tag)" :class="[
                        'inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md cursor-pointer transition-colors font-ui border',
                        filters.tags.includes(tag)
                            ? 'bg-gold-500 text-white hover:bg-gold-600 border-gold-500'
                            : 'bg-white text-medieval-700 hover:bg-parchment-100 border-medieval-300'
                    ]">
                        {{ tag }}
                        <X v-if="filters.tags.includes(tag)" class="h-3 w-3" />
                    </span>
                </div>
            </div>

            <!-- Difficulty Filter -->
            <div>
                <label class="block mb-2 font-ui text-sm text-medieval-700">
                    Nível de Dificuldade
                </label>
                <select :value="filters.difficulty" @change="updateDifficulty" class="w-full px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500">
                    <option value="all">Todos os Níveis</option>
                    <option value="beginner">Iniciante</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                    <option value="expert">Expert</option>
                </select>
            </div>

            <!-- Players Filter -->
            <div>
                <label class="block mb-2 font-ui text-sm text-medieval-700">
                    Número de Jogadores
                </label>
                <select :value="filters.players" @change="updatePlayers" class="w-full px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500">
                    <option value="all">Qualquer Quantidade</option>
                    <option value="1-3">1-3 Jogadores</option>
                    <option value="4-5">4-5 Jogadores</option>
                    <option value="6+">6+ Jogadores</option>
                </select>
            </div>
        </div>

        <!-- Active Filters Summary -->
        <div v-if="hasActiveFilters" class="mt-6 pt-6 border-t border-medieval-200">
            <p class="text-sm text-medieval-600 font-ui mb-2">
                Filtros ativos:
            </p>
            <div class="flex flex-wrap gap-2">
                <span v-if="filters.system !== 'all'" class="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-medieval-100 text-medieval-800 border border-medieval-300 font-ui">
                    Sistema: {{ filters.system }}
                    <X class="h-3 w-3 cursor-pointer hover:text-medieval-900" @click="removeSystemFilter" />
                </span>
                <span v-if="filters.difficulty !== 'all'" class="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-medieval-100 text-medieval-800 border border-medieval-300 font-ui">
                    Dificuldade: {{ filters.difficulty }}
                    <X class="h-3 w-3 cursor-pointer hover:text-medieval-900" @click="removeDifficultyFilter" />
                </span>
                <span v-if="filters.players !== 'all'" class="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-medieval-100 text-medieval-800 border border-medieval-300 font-ui">
                    Jogadores: {{ filters.players }}
                    <X class="h-3 w-3 cursor-pointer hover:text-medieval-900" @click="removePlayersFilter" />
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

interface Filters {
    system: string
    tags: string[]
    difficulty: string
    players: string
}

interface Props {
    filters: Filters
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:filters': [filters: Filters]
}>()

const availableTags = [
    'Alta Fantasia',
    'Horror',
    'Dungeon Crawl',
    'Urban',
    'Heist',
    'Mystery',
    'Sci-Fi',
    'Gothic',
    'Investigation',
    'Political',
    'Survival',
    'Exploration',
    'Narrative',
]

const systems = [
    { value: 'all', label: 'Todos os Sistemas' },
    { value: 'D&D 5ª Edição', label: 'D&D 5ª Edição' },
    { value: 'Pathfinder 2e', label: 'Pathfinder 2e' },
    { value: 'Call of Cthulhu', label: 'Call of Cthulhu' },
    { value: 'Vampire: The Masquerade', label: 'Vampire: The Masquerade' },
    { value: 'Blades in the Dark', label: 'Blades in the Dark' },
    { value: 'Starfinder', label: 'Starfinder' },
    { value: 'Tales from the Loop', label: 'Tales from the Loop' },
    { value: 'Dungeon World', label: 'Dungeon World' },
]

const hasActiveFilters = computed(() => {
    return (
        props.filters.system !== 'all' ||
        props.filters.tags.length > 0 ||
        props.filters.difficulty !== 'all' ||
        props.filters.players !== 'all'
    )
})

const toggleTag = (tag: string) => {
    const newTags = props.filters.tags.includes(tag)
        ? props.filters.tags.filter((t) => t !== tag)
        : [...props.filters.tags, tag]

    emit('update:filters', { ...props.filters, tags: newTags })
}

const updateSystem = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    emit('update:filters', { ...props.filters, system: value })
}

const updateDifficulty = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    emit('update:filters', { ...props.filters, difficulty: value })
}

const updatePlayers = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    emit('update:filters', { ...props.filters, players: value })
}

const clearFilters = () => {
    emit('update:filters', {
        system: 'all',
        tags: [],
        difficulty: 'all',
        players: 'all',
    })
}

const removeSystemFilter = () => {
    emit('update:filters', { ...props.filters, system: 'all' })
}

const removeDifficultyFilter = () => {
    emit('update:filters', { ...props.filters, difficulty: 'all' })
}

const removePlayersFilter = () => {
    emit('update:filters', { ...props.filters, players: 'all' })
}
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.2s ease-out;
}
</style>