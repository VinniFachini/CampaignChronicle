<template>
    <div class="bg-parchment-100 border border-medieval-300 rounded-lg shadow-sm">
        <div class="p-6 border-b border-medieval-200">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-display font-semibold text-medieval-800">
                    Resumo Narrativo
                </h3>
                <button @click="isPreview = !isPreview" class="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-medieval-400 text-medieval-700 hover:bg-medieval-50 rounded-md font-ui transition-colors">
                    <template v-if="isPreview">
                        <Edit3 class="h-4 w-4" />
                        Editar
                    </template>
                    <template v-else>
                        <Eye class="h-4 w-4" />
                        Preview
                    </template>
                </button>
            </div>
        </div>
        <div class="p-6 space-y-4">
            <template v-if="!isPreview">
                <!-- Toolbar -->
                <div class="flex items-center gap-1 p-2 bg-white rounded-md border border-medieval-300 flex-wrap">
                    <button @click="handleBold" class="h-8 w-8 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors" title="Bold (Ctrl+B)">
                        <Bold class="h-4 w-4 text-medieval-700" />
                    </button>
                    <button @click="handleItalic" class="h-8 w-8 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors" title="Italic (Ctrl+I)">
                        <Italic class="h-4 w-4 text-medieval-700" />
                    </button>
                    <button @click="handleUnderline" class="h-8 w-8 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors" title="Underline">
                        <Underline class="h-4 w-4 text-medieval-700" />
                    </button>

                    <div class="w-px h-6 bg-medieval-300 mx-1" />

                    <button @click="handleH1" class="h-8 px-2 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors font-ui text-sm text-medieval-700">
                        H1
                    </button>
                    <button @click="handleH2" class="h-8 px-2 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors font-ui text-sm text-medieval-700">
                        H2
                    </button>
                    <button @click="handleH3" class="h-8 px-2 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors font-ui text-sm text-medieval-700">
                        H3
                    </button>

                    <div class="w-px h-6 bg-medieval-300 mx-1" />

                    <button @click="handleBulletList" class="h-8 w-8 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors" title="Bullet List">
                        <List class="h-4 w-4 text-medieval-700" />
                    </button>
                    <button @click="handleNumberedList" class="h-8 w-8 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors" title="Numbered List">
                        <ListOrdered class="h-4 w-4 text-medieval-700" />
                    </button>

                    <div class="w-px h-6 bg-medieval-300 mx-1" />

                    <button @click="handleLink" class="h-8 w-8 flex items-center justify-center hover:bg-medieval-50 rounded transition-colors" title="Insert Link">
                        <LinkIcon class="h-4 w-4 text-medieval-700" />
                    </button>
                </div>

                <!-- Editor -->
                <textarea id="editor-textarea" ref="textareaRef" :value="content" @input="$emit('update:content', ($event.target as HTMLTextAreaElement).value)" class="w-full min-h-[300px] p-4 bg-white border border-medieval-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 resize-y font-body" placeholder="Descreva o que aconteceu nesta sessão...

Dica: Use markdown para formatar:
**negrito** *itálico* [link](url)
# Título 1
## Título 2
- Lista com marcadores
1. Lista numerada" />

                <!-- Footer -->
                <div class="flex items-center justify-between text-sm text-medieval-500 font-ui">
                    <span>{{ wordCount }} palavras</span>
                    <span v-if="content.length < 50 && content.length > 0" class="text-yellow-600">
                        Sugestão: adicione pelo menos 50 caracteres
                    </span>
                </div>
            </template>

            <!-- Preview -->
            <div v-else class="min-h-[300px] p-4 bg-white border border-medieval-300 rounded-md prose prose-medieval max-w-none" v-html="renderedMarkdown" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    LinkIcon,
    Eye,
    Edit3,
} from 'lucide-vue-next'

interface Props {
    content: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:content': [value: string]
}>()

const isPreview = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const wordCount = computed(() => {
    return props.content.split(/\s+/).filter(Boolean).length
})

const wrapSelection = (before: string, after: string) => {
    const textarea = textareaRef.value
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = props.content.substring(start, end)
    const newContent =
        props.content.substring(0, start) +
        before +
        selectedText +
        after +
        props.content.substring(end)

    emit('update:content', newContent)

    setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
}

const insertAtCursor = (text: string) => {
    const textarea = textareaRef.value
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newContent =
        props.content.substring(0, start) + text + props.content.substring(end)

    emit('update:content', newContent)

    setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
}

const handleBold = () => wrapSelection('**', '**')
const handleItalic = () => wrapSelection('*', '*')
const handleUnderline = () => wrapSelection('<u>', '</u>')
const handleH1 = () => insertAtCursor('\n# ')
const handleH2 = () => insertAtCursor('\n## ')
const handleH3 = () => insertAtCursor('\n### ')
const handleBulletList = () => insertAtCursor('\n- ')
const handleNumberedList = () => insertAtCursor('\n1. ')
const handleLink = () => wrapSelection('[', '](url)')

const renderMarkdown = (text: string) => {
    if (!text) {
        return '<p class="text-medieval-500 text-sm font-ui">Nenhum conteúdo ainda. Use a aba "Editar" para começar.</p>'
    }

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

    // Process lists line by line
    const lines = html.split('\n')
    let inUnorderedList = false
    let inOrderedList = false
    const processedLines: string[] = []

    lines.forEach((line) => {
        const trimmedLine = line.trim()

        // Unordered list
        if (trimmedLine.startsWith('- ')) {
            if (!inUnorderedList) {
                inUnorderedList = true
                processedLines.push('<ul class="list-disc list-inside my-2 space-y-1 ml-4">')
            }
            processedLines.push('<li>' + trimmedLine.substring(2) + '</li>')
        }
        // Ordered list
        else if (/^\d+\.\s+/.test(trimmedLine)) {
            if (!inOrderedList) {
                inOrderedList = true
                processedLines.push('<ol class="list-decimal list-inside my-2 space-y-1 ml-4">')
            }
            processedLines.push('<li>' + trimmedLine.replace(/^\d+\.\s+/, '') + '</li>')
        }
        // Regular line
        else {
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

    // Close any open lists
    if (inUnorderedList) processedLines.push('</ul>')
    if (inOrderedList) processedLines.push('</ol>')

    html = processedLines.join('\n')

    // Paragraphs - split by double newlines
    const paragraphs = html.split('\n\n')
    html = paragraphs
        .map((para) => {
            // Don't wrap if it's already wrapped in a tag
            if (para.trim().startsWith('<')) return para
            if (para.trim() === '') return ''
            return '<p class="mb-3 text-medieval-700 leading-relaxed">' + para.trim() + '</p>'
        })
        .join('\n')

    // Clean up
    html = html.replace(/<p class="mb-3 text-medieval-700 leading-relaxed">\s*<\/p>/g, '')
    html = html.replace(/\n{3,}/g, '\n\n')

    return html
}

const renderedMarkdown = computed(() => renderMarkdown(props.content))
</script>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
    width: 8px;
}

textarea::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>