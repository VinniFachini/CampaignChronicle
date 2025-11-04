<template>
    <div class="space-y-4 font-ui">
        <!-- Session Info -->
        <div class="parchment-bg paper-shadow border border-medieval-300 rounded-lg">
            <div class="p-4 border-b border-medieval-200">
                <h3 class="text-lg text-medieval-800 font-display font-semibold">
                    Informações da Sessão
                </h3>
            </div>
            <div class="p-4 space-y-3 text-sm">
                <div class="flex items-center gap-2 text-medieval-700">
                    <Calendar class="w-4 h-4 text-gold-500" />
                    <span>{{ formattedDate }}</span>
                </div>
                <div class="flex items-center gap-2 text-medieval-700">
                    <Clock class="w-4 h-4 text-gold-500" />
                    <span>{{ duration }}</span>
                </div>
                <div class="flex items-center gap-2 text-medieval-700">
                    <User class="w-4 h-4 text-gold-500" />
                    <span>{{ session.gameMaster }}</span>
                </div>
            </div>
        </div>

        <!-- Characters -->
        <div class="parchment-bg paper-shadow border border-medieval-300 rounded-lg">
            <div class="p-4 border-b border-medieval-200">
                <h3 class="text-lg text-medieval-800 font-display font-semibold">Personagens</h3>
            </div>
            <div class="p-4">
                <div class="flex flex-wrap gap-2">
                    <div v-for="char in session.characters" :key="char.id" class="relative group" @mouseenter="hoveredCharacter = char.id" @mouseleave="hoveredCharacter = null">
                        <div class="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-medieval-700 font-display font-semibold cursor-pointer hover:ring-2 ring-gold-500 transition-all">
                            {{ char.name.charAt(0) }}
                        </div>
                        <!-- Tooltip -->
                        <Transition name="tooltip">
                            <div v-if="hoveredCharacter === char.id" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-medieval-800 text-white text-sm rounded whitespace-nowrap z-10">
                                <div class="text-center">
                                    <p>{{ char.name }}</p>
                                    <p v-if="char.class" class="text-xs text-medieval-300">{{ char.class }}</p>
                                </div>
                                <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                    <div class="border-4 border-transparent border-t-medieval-800"></div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Navigation -->
        <div class="parchment-bg paper-shadow border border-medieval-300 rounded-lg">
            <div class="p-4 border-b border-medieval-200">
                <h3 class="text-lg text-medieval-800 font-display font-semibold">Navegação Rápida</h3>
            </div>
            <div class="p-4 space-y-2">
                <button @click="$emit('section-click', 'narrative')" class="w-full text-left text-sm text-medieval-700 hover:text-gold-600 transition-colors py-1">
                    Resumo Narrativo
                </button>
                <button @click="$emit('section-click', 'events')" class="w-full text-left text-sm text-medieval-700 hover:text-gold-600 transition-colors py-1">
                    Eventos Marcantes
                </button>
                <button v-if="session.images && session.images.length > 0" @click="$emit('section-click', 'gallery')" class="w-full text-left text-sm text-medieval-700 hover:text-gold-600 transition-colors py-1">
                    Galeria
                </button>
                <button @click="$emit('section-click', 'comments')" class="w-full text-left text-sm text-medieval-700 hover:text-gold-600 transition-colors py-1">
                    Comentários
                </button>
            </div>
        </div>

        <!-- Statistics -->
        <div class="parchment-bg paper-shadow border border-medieval-300 rounded-lg">
            <div class="p-4 border-b border-medieval-200">
                <h3 class="text-lg text-medieval-800 font-display font-semibold">Estatísticas</h3>
            </div>
            <div class="p-4 space-y-3 text-sm">
                <div class="flex items-center justify-between text-medieval-700">
                    <div class="flex items-center gap-2">
                        <Eye class="w-4 h-4 text-gold-500" />
                        <span>Visualizações</span>
                    </div>
                    <span>{{ session.views?.toLocaleString() || 0 }}</span>
                </div>
                <div class="flex items-center justify-between text-medieval-700">
                    <div class="flex items-center gap-2">
                        <Heart class="w-4 h-4 text-gold-500" />
                        <span>Curtidas</span>
                    </div>
                    <span>{{ session.likes || 0 }}</span>
                </div>
                <div class="flex items-center justify-between text-medieval-700">
                    <div class="flex items-center gap-2">
                        <MessageSquare class="w-4 h-4 text-gold-500" />
                        <span>Comentários</span>
                    </div>
                    <span>{{ session.commentCount || 0 }}</span>
                </div>
            </div>
        </div>

        <!-- Share -->
        <div class="parchment-bg paper-shadow border border-medieval-300 rounded-lg">
            <div class="p-4 border-b border-medieval-200">
                <h3 class="text-lg text-medieval-800 font-display font-semibold">Compartilhar</h3>
            </div>
            <div class="p-4 space-y-2">
                <button class="w-full flex items-center gap-2 px-3 py-2 text-sm border border-medieval-300 text-medieval-700 hover:bg-medieval-50 rounded-md transition-colors">
                    <Share2 class="w-4 h-4" />
                    Redes Sociais
                </button>
                <button @click="copyLink" class="w-full flex items-center gap-2 px-3 py-2 text-sm border border-medieval-300 text-medieval-700 hover:bg-medieval-50 rounded-md transition-colors">
                    <Link2 class="w-4 h-4" />
                    Copiar Link
                </button>
            </div>
        </div>

        <!-- Related Sessions -->
        <div class="parchment-bg paper-shadow border border-medieval-300 rounded-lg">
            <div class="p-4 border-b border-medieval-200">
                <h3 class="text-lg text-medieval-800 font-display font-semibold flex items-center gap-2">
                    <Scroll class="w-5 h-5 text-gold-500" />
                    Sessões Relacionadas
                </h3>
            </div>
            <div class="p-4 space-y-3">
                <button v-for="rs in relatedSessions" :key="rs.id" class="w-full text-left hover:opacity-80 transition-opacity">
                    <div class="flex gap-3">
                        <div class="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-medieval-200">
                            <img v-if="rs.thumbnail" :src="rs.thumbnail" :alt="rs.title" class="w-full h-full object-cover" @error="handleImageError" />
                            <div v-else class="w-full h-full flex items-center justify-center text-medieval-400">
                                <Scroll class="w-6 h-6" />
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-medieval-800 line-clamp-2 mb-1">
                                {{ rs.title }}
                            </p>
                            <p class="text-xs text-medieval-500">
                                {{ formatDate(rs.date) }}
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    Calendar,
    Clock,
    User,
    Eye,
    Heart,
    MessageSquare,
    Share2,
    Link2,
    Scroll,
} from 'lucide-vue-next'

const hoveredCharacter = ref<string | null>(null)

interface Character {
    id: string
    name: string
    avatar?: string
    class?: string
}

interface Session {
    date: Date | string
    duration: number // in minutes
    gameMaster: string
    characters: Character[]
    images?: string[]
    views?: number
    likes?: number
    commentCount?: number
}

interface RelatedSession {
    id: number
    title: string
    date: Date | string
    thumbnail?: string
}

interface Props {
    session: Session
    relatedSessions: RelatedSession[]
}

const props = defineProps<Props>()

defineEmits<{
    'section-click': [section: string]
}>()

const formattedDate = computed(() => {
    const date = typeof props.session.date === 'string'
        ? new Date(props.session.date)
        : props.session.date

    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
})

const duration = computed(() => {
    const hours = Math.floor(props.session.duration / 60)
    const minutes = props.session.duration % 60
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`
})

const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('pt-BR')
}

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copiado!')
    } catch (err) {
        console.error('Erro ao copiar link:', err)
    }
}

const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.style.display = 'none'
}
</script>

<style scoped>
.parchment-bg {
    background-color: #FAF7F0;
}

.paper-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Tooltip transitions */
.tooltip-enter-active,
.tooltip-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
    opacity: 0;
    transform: translate(-50%, 4px);
}

.tooltip-enter-to,
.tooltip-leave-from {
    opacity: 1;
    transform: translate(-50%, 0);
}
</style>