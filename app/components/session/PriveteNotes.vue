<template>
    <div class="bg-parchment-100 border border-medieval-300 rounded-lg shadow-sm">
        <div @click="isOpen = !isOpen" class="p-6 border-b border-medieval-200 cursor-pointer hover:bg-medieval-50 transition-colors">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-display font-semibold text-medieval-800 flex items-center gap-2">
                    <Lock class="h-5 w-5 text-yellow-600" />
                    Notas Privadas do Mestre
                </h3>
                <div class="flex items-center gap-3">
                    <span v-if="notes" class="text-sm text-medieval-500 font-ui">
                        {{ wordCount }} {{ wordCount === 1 ? 'palavra' : 'palavras' }}
                    </span>
                    <ChevronDown :class="[
                        'h-5 w-5 text-medieval-600 transition-transform',
                        isOpen && 'rotate-180'
                    ]" />
                </div>
            </div>
        </div>

        <Transition name="collapse">
            <div v-if="isOpen" class="p-6 space-y-3">
                <div class="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-300 rounded-md">
                    <Lock class="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p class="text-sm text-yellow-800 font-ui">
                        Estas notas são visíveis apenas para o Mestre e não aparecem para os jogadores. Use formatação markdown: **negrito**, *itálico*, # títulos, - listas.
                    </p>
                </div>

                <!-- Tabs -->
                <div>
                    <div class="flex items-center gap-2 mb-2 bg-white rounded-md p-1 border border-medieval-300 w-fit">
                        <button @click="activeTab = 'edit'" :class="[
                            'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded font-ui transition-colors',
                            activeTab === 'edit'
                                ? 'bg-gold-500 text-white'
                                : 'text-medieval-600 hover:bg-medieval-50'
                        ]">
                            <Edit3 class="h-3.5 w-3.5" />
                            Editar
                        </button>
                        <button @click="activeTab = 'preview'" :class="[
                            'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded font-ui transition-colors',
                            activeTab === 'preview'
                                ? 'bg-gold-500 text-white'
                                : 'text-medieval-600 hover:bg-medieval-50'
                        ]">
                            <Eye class="h-3.5 w-3.5" />
                            Preview
                        </button>
                    </div>

                    <!-- Edit Tab -->
                    <div v-if="activeTab === 'edit'">
                        <textarea :value="notes" @input="$emit('update:notes', ($event.target as HTMLTextAreaElement).value)" placeholder="Adicione suas notas privadas aqui... 

Exemplos de formatação:
# Título Principal
## Subtítulo
**Texto em negrito**
*Texto em itálico*
- Item de lista
- Outro item" class="w-full min-h-[200px] p-4 bg-white border border-medieval-300 rounded-md resize-y font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold-500" />
                    </div>

                    <!-- Preview Tab -->
                    <div v-else class="min-h-[200px] p-4 bg-white border border-medieval-300 rounded-md">
                        <div v-if="notes" class="prose prose-medieval max-w-none" v-html="renderedMarkdown" />
                        <p v-else class="text-medieval-500 text-sm font-ui">
                            Nenhuma nota adicionada ainda. Use a aba "Editar" para começar.
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown, Lock, Eye, Edit3 } from 'lucide-vue-next'

interface Props {
    notes: string
}

const props = defineProps<Props>()

defineEmits<{
    'update:notes': [notes: string]
}>()

const isOpen = ref(false)
const activeTab = ref<'edit' | 'preview'>('edit')

const wordCount = computed(() => {
    return props.notes.split(/\s+/).filter(Boolean).length
})

const renderMarkdown = (text: string) => {
    if (!text) return ''

    let html = text

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="font-display text-xl mt-3 mb-2 text-medieval-800">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="font-display text-2xl mt-4 mb-2 text-medieval-800">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="font-display text-3xl mt-4 mb-3 text-medieval-800">$1</h1>')

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')

    // Italic
    html = html.replace(/\*([^\*]+?)\*/g, '<em class="italic">$1</em>')

    // Underline
    html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')

    // Links
    html = html.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" class="text-gold-600 hover:text-gold-700 underline" target="_blank" rel="noopener noreferrer">$1</a>'
    )

    // Bullet lists
    const lines = html.split('\n')
    let inList = false
    const processedLines = lines.map((line) => {
        if (line.trim().startsWith('- ')) {
            if (!inList) {
                inList = true
                return '<ul class="list-disc list-inside my-2 space-y-1">\n<li>' + line.trim().substring(2) + '</li>'
            }
            return '<li>' + line.trim().substring(2) + '</li>'
        } else if (inList) {
            inList = false
            return '</ul>\n' + line
        }
        return line
    })

    if (inList) {
        processedLines.push('</ul>')
    }

    html = processedLines.join('\n')

    // Numbered lists
    html = html.replace(/^\d+\.\s+(.*$)/gim, '<li class="ml-4">$1</li>')

    // Paragraphs
    html = html.replace(/\n\n+/g, '</p><p class="mb-3 text-medieval-700 leading-relaxed">')
    html = '<p class="mb-3 text-medieval-700 leading-relaxed">' + html + '</p>'

    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-3 text-medieval-700 leading-relaxed"><\/p>/g, '')
    html = html.replace(/<p class="mb-3 text-medieval-700 leading-relaxed">\s*<\/p>/g, '')

    return html
}

const renderedMarkdown = computed(() => renderMarkdown(props.notes))
</script>

<style scoped>
/* Collapse transition */
.collapse-enter-active,
.collapse-leave-active {
    transition: all 0.3s ease;
    max-height: 1000px;
    overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>