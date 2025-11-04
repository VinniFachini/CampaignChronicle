<template>
    <div class="space-y-8">
        <!-- Narrative -->
        <div class="prose prose-lg max-w-none">
            <div v-html="htmlContent" />
        </div>

        <!-- Image Gallery -->
        <div v-if="images.length > 0" class="mt-8">
            <h2 class="text-2xl text-medieval-800 mb-4 flex font-display items-center gap-2">
                <span class="ornament text-xl text-gold-500">✧</span>
                Galeria
            </h2>
            <div :class="[
                'grid gap-4',
                images.length === 1
                    ? 'grid-cols-1'
                    : images.length === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-2 md:grid-cols-3'
            ]">
                <div v-for="(img, index) in images" :key="index" class="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity paper-shadow" @click="openLightbox(index)">
                    <img :src="img" :alt="`Imagem ${index + 1}`" class="w-full h-full object-cover" @error="handleImageError" />
                </div>
            </div>
        </div>

        <!-- Lightbox -->
        <Teleport to="body">
            <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
                <Button variant="ghost" size="icon" class="absolute top-4 right-4 text-white hover:bg-white/20" @click="closeLightbox">
                    <X class="w-6 h-6" />
                </Button>

                <Button variant="ghost" size="icon" class="absolute top-4 right-16 text-white hover:bg-white/20" @click.stop="openImageInNewTab">
                    <Download class="w-6 h-6" />
                </Button>

                <template v-if="images.length > 1">
                    <Button variant="ghost" size="icon" class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" @click.stop="prevImage">
                        <ChevronLeft class="w-8 h-8" />
                    </Button>

                    <Button variant="ghost" size="icon" class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" @click.stop="nextImage">
                        <ChevronRight class="w-8 h-8" />
                    </Button>
                </template>

                <div class="max-w-5xl max-h-[90vh] cursor-default" @click.stop>
                    <img :src="images[lightboxIndex]" :alt="`Imagem ${lightboxIndex + 1}`" class="max-w-full max-h-[90vh] object-contain rounded-lg">
                    <p v-if="images.length > 1" class="text-white text-center mt-4" style="font-family: Inter, sans-serif">
                        {{ lightboxIndex + 1 }} / {{ images.length }}
                    </p>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-vue-next'

interface Props {
    content: string
    images: string[]
    useDropCap?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    useDropCap: true
})

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

// Processar markdown para HTML
const htmlContent = computed(() => {
    const content = props.content ?? ''
    const lines = content.split('\n')
    const processed: string[] = []
    let paragraphBuffer: string[] = []

    const flushParagraph = () => {
        if (paragraphBuffer.length) {
            const paragraphText = paragraphBuffer.join(' ').trim()
            processed.push(
                `<p class="mb-4 font-body text-medieval-700 leading-relaxed">${processInlineMarkdown(paragraphText)}</p>`
            )
            paragraphBuffer = []
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const raw = lines[i]
        const line = raw?.trim() ?? ''

        if (line === '') {
            flushParagraph()
            continue
        }

        // Headers
        if (line.startsWith('### ')) {
            flushParagraph()
            processed.push(`<h3>${processInlineMarkdown(line.substring(4))}</h3>`)
            continue
        }

        if (line.startsWith('## ')) {
            flushParagraph()
            processed.push(`
                <h2 class="text-2xl font-display text-medieval-600 mt-6 mb-3 flex items-center gap-2">
                    <span class="ornament text-xl text-gold-400">✧</span>
                    ${processInlineMarkdown(line.substring(3))}
                </h2>
            `)
            continue
        }

        if (line.startsWith('# ')) {
            flushParagraph()
            processed.push(`
                <h1 class="text-3xl text-medieval-700 font-display mt-8 mb-4 flex items-center gap-3">
                    <span class="ornament text-2xl text-gold-400">❦</span>
                    ${processInlineMarkdown(line.substring(2))}
                    <span class="ornament text-2xl text-gold-400">❦</span>
                </h1>
            `)
            continue
        }

        // Conteúdo normal (parágrafos)
        paragraphBuffer.push(line)
    }

    // Fechar último parágrafo
    flushParagraph()

    return processed.join('\n')
})


function processInlineMarkdown(text: string): string {
    return text
        // Negrito: **texto**
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-medieval-800">$1</strong>')
        // Itálico: *texto*
        .replace(/(^|[^*])\*(?!\*)(.+?)(?<!\*)\*(?!\*)([^*]|$)/g, '$1<em class="italic text-medieval-700">$2</em>$3')
        // Aspas tipográficas opcionais
        .replace(/"([^"]+)"/g, '“$1”')
        // Hífens longos opcionais
        .replace(/ - /g, ' — ')
}


const openLightbox = (index: number) => {
    lightboxIndex.value = index
    lightboxOpen.value = true
}

const closeLightbox = () => {
    lightboxOpen.value = false
}

const nextImage = () => {
    lightboxIndex.value = (lightboxIndex.value + 1) % props.images.length
}

const prevImage = () => {
    lightboxIndex.value = (lightboxIndex.value - 1 + props.images.length) % props.images.length
}

const openImageInNewTab = () => {
    window.open(props.images[lightboxIndex.value], '_blank')
}

const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement
    img.src = '/placeholder-image.png'
}
</script>

<style scoped>
.lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.paper-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Drop cap style */
.drop-cap :deep(p:first-of-type::first-letter) {
    float: left;
    font-size: 3.5em;
    line-height: 0.9;
    margin: 0.1em 0.1em 0 0;
    font-weight: bold;
    color: var(--medieval-800);
}
</style>