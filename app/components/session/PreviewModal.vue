<script setup lang="ts">
import { Calendar, Clock, Swords, Skull, Gem, Theater, Shuffle, Map, Users } from 'lucide-vue-next'

interface Event {
    id: string
    type: 'combat' | 'death' | 'treasure' | 'roleplay' | 'twist' | 'location' | 'npc' | 'discovery' | 'decision'
    description: string
    title?: string
}

interface ImageItem {
    id: string
    url: string
    caption?: string
}

interface Props {
    open: boolean
    sessionNumber: number
    title: string
    date: string
    durationHours: number
    durationMinutes: number
    content: string
    events: Event[]
    images: ImageItem[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update:open'])

const eventIcons = {
    combat: Swords,
    death: Skull,
    treasure: Gem,
    roleplay: Theater,
    twist: Shuffle,
    location: Map,
    npc: Users,
    discovery: Gem,
    decision: Shuffle,
}

const eventLabels = {
    combat: 'Combate',
    death: 'Morte de personagem',
    treasure: 'Tesouro/descoberta',
    roleplay: 'Momento roleplay',
    twist: 'Reviravolta',
    location: 'Nova localização',
    npc: 'NPC importante',
    discovery: 'Descoberta',
    decision: 'Decisão importante',
}

const formattedDate = computed(() => {
    if (!props.date) return 'Sem data'
    return new Date(props.date).toLocaleDateString('pt-BR')
})

const formattedDuration = computed(() => {
    const hours = props.durationHours
    const minutes = props.durationMinutes

    if (hours === 0 && minutes === 0) return 'Sem duração'

    let result = ''
    if (hours > 0) result += `${hours}h`
    if (hours > 0 && minutes > 0) result += ' '
    if (minutes > 0) result += `${minutes}min`

    return result
})

const renderMarkdown = (text: string) => {
    if (!text) return '<p class="text-medieval-600 text-sm">Nenhum conteúdo adicionado.</p>'

    let html = text

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="font-display text-lg mt-3 mb-2">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="font-display text-xl mt-4 mb-2">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="font-display text-2xl mt-4 mb-3">$1</h1>')

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Italic
    html = html.replace(/(?<!\*)\*(?!\*)([^\*]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')

    // Underline
    html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-gold-400 hover:text-gold-600 underline" target="_blank">$1</a>')

    // Process lists
    const lines = html.split('\n')
    let inUnorderedList = false
    let inOrderedList = false
    const processedLines: string[] = []

    lines.forEach((line) => {
        const trimmedLine = line.trim()

        if (trimmedLine.startsWith('- ')) {
            if (!inUnorderedList) {
                inUnorderedList = true
                processedLines.push('<ul class="list-disc list-inside my-2 space-y-1 ml-4">')
            }
            processedLines.push('<li>' + trimmedLine.substring(2) + '</li>')
        } else if (/^\d+\.\s+/.test(trimmedLine)) {
            if (!inOrderedList) {
                inOrderedList = true
                processedLines.push('<ol class="list-decimal list-inside my-2 space-y-1 ml-4">')
            }
            processedLines.push('<li>' + trimmedLine.replace(/^\d+\.\s+/, '') + '</li>')
        } else {
            if (inUnorderedList) {
                inUnorderedList = false
                processedLines.push('</ul>')
            }
            if (inOrderedList) {
                inOrderedList = false
                processedLines.push('</ol>')
            }
            processedLines.push(line)
        }
    })

    if (inUnorderedList) processedLines.push('</ul>')
    if (inOrderedList) processedLines.push('</ol>')

    html = processedLines.join('\n')

    // Paragraphs
    const paragraphs = html.split('\n\n')
    html = paragraphs.map(para => {
        if (para.trim().startsWith('<')) return para
        if (para.trim() === '') return ''
        return '<p class="mb-3">' + para.trim() + '</p>'
    }).join('\n')

    html = html.replace(/<p class="mb-3">\s*<\/p>/g, '')

    return html
}

const renderedContent = computed(() => renderMarkdown(props.content))

const closeModal = () => {
    emit('update:open', false)
}
</script>

<template>
    <Teleport to="body">
        <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="open" class="fixed inset-0 z-50 bg-black/50" @click="() => { console.log('Backdrop clicked'); closeModal(); }">
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4">
                        <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition-all duration-200" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                            <div v-if="open" class="relative w-full max-w-4xl max-h-[90vh] bg-parchment-100 rounded-lg shadow-xl overflow-hidden" @click.stop>
                                <!-- Header -->
                                <div class="p-6 border-b border-medieval-300/30">
                                    <h2 class="font-display text-xl">Preview da Sessão</h2>
                                </div>

                                <!-- Scrollable Content -->
                                <div class="overflow-y-auto max-h-[calc(90vh-8rem)] p-6">
                                    <div class="space-y-6">
                                        <!-- Session Header -->
                                        <div class="space-y-2">
                                            <div class="flex items-center gap-3">
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-medieval-500 text-parchment-100 font-ui">
                                                    Sessão #{{ sessionNumber }}
                                                </span>
                                                <h2 class="font-display text-2xl flex-1">{{ title || 'Título da sessão' }}</h2>
                                            </div>

                                            <div class="flex items-center gap-4 text-sm text-medieval-600 font-ui">
                                                <div class="flex items-center gap-1">
                                                    <Calendar class="h-4 w-4" />
                                                    {{ formattedDate }}
                                                </div>
                                                <div class="flex items-center gap-1">
                                                    <Clock class="h-4 w-4" />
                                                    {{ formattedDuration }}
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Content -->
                                        <div v-if="content" class="bg-white p-6 rounded-lg border border-medieval-300/30">
                                            <h3 class="font-display text-lg mb-4">Resumo</h3>
                                            <div class="prose prose-medieval max-w-none" v-html="renderedContent" />
                                        </div>

                                        <!-- Events -->
                                        <div v-if="events.length > 0" class="bg-white p-6 rounded-lg border border-medieval-300/30">
                                            <h3 class="font-display text-lg mb-4">Eventos Marcantes</h3>
                                            <div class="space-y-3">
                                                <div v-for="event in events" :key="event.id" class="flex items-start gap-3 p-3 bg-parchment-50 rounded-md">
                                                    <div class="flex-shrink-0">
                                                        <component :is="eventIcons[event.type]" class="h-5 w-5 text-medieval-500" />
                                                    </div>
                                                    <div class="flex-1">
                                                        <p class="text-sm text-medieval-600 font-ui mb-1">
                                                            {{ eventLabels[event.type] }}
                                                        </p>
                                                        <p class="text-medieval-800">{{ event.description || 'Sem descrição' }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Images -->
                                        <div v-if="images.length > 0" class="bg-white p-6 rounded-lg border border-medieval-300/30">
                                            <h3 class="font-display text-lg mb-4">Galeria de Imagens</h3>
                                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                <div v-for="image in images" :key="image.id" class="space-y-2">
                                                    <div class="aspect-video bg-parchment-50 rounded-md overflow-hidden border border-medieval-300/30">
                                                        <img :src="image.url" :alt="image.caption || 'Imagem da sessão'" class="w-full h-full object-cover" />
                                                    </div>
                                                    <p v-if="image.caption" class="text-sm text-medieval-600 font-ui">
                                                        {{ image.caption }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Empty state -->
                                        <div v-if="!content && events.length === 0 && images.length === 0" class="text-center py-12 text-medieval-600">
                                            <p class="font-ui">Nenhum conteúdo para visualizar ainda.</p>
                                            <p class="text-sm mt-1">Preencha os campos do editor para ver o preview.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.prose {
    color: #2C1810;
}

.prose strong {
    font-weight: 600;
}

.prose em {
    font-style: italic;
}

.prose h1,
.prose h2,
.prose h3 {
    font-weight: 600;
    color: #3E2723;
}

.prose a {
    text-decoration: underline;
}

.prose ul,
.prose ol {
    padding-left: 1.5rem;
}

.prose li {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
</style>