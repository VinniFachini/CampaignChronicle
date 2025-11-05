<template>
    <div class="bg-parchment-100 border border-medieval-300 rounded-lg shadow-sm">
        <div class="p-6 border-b border-medieval-200">
            <h3 class="text-lg font-display font-semibold text-medieval-800">
                Galeria de Imagens e Mapas
            </h3>
        </div>
        <div class="p-6 space-y-4">
            <!-- Upload Area -->
            <div @drop.prevent="handleDrop" @dragover.prevent="handleDragOver" @dragleave="handleDragLeave" @click="triggerFileInput" :class="[
                'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                isDragging
                    ? 'border-gold-500 bg-gold-50'
                    : 'border-medieval-300 hover:border-gold-500 hover:bg-parchment-50'
            ]">
                <input ref="fileInputRef" type="file" accept="image/jpeg,image/png,image/webp" multiple @change="handleFileChange" class="hidden" />
                <Upload class="h-12 w-12 mx-auto mb-4 text-medieval-600" />
                <p class="font-ui mb-2 text-medieval-800">
                    Arraste imagens aqui ou clique para selecionar
                </p>
                <p class="text-sm text-medieval-500 font-ui">
                    JPG, PNG, WEBP • Máximo 5MB por imagem • Até 10 imagens
                </p>
            </div>

            <!-- Image Grid -->
            <div v-if="images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="(image, index) in images" :key="image.id" class="relative group bg-white rounded-lg border border-medieval-300 overflow-hidden">
                    <!-- Order Badge -->
                    <div class="absolute top-2 left-2 z-10 bg-medieval-800/80 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-ui">
                        {{ index + 1 }}
                    </div>

                    <!-- Remove Button -->
                    <button @click="removeImage(image.id)" class="absolute top-2 right-2 z-10 h-6 w-6 flex items-center justify-center bg-red-500/90 hover:bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        <X class="h-4 w-4" />
                    </button>

                    <!-- Image -->
                    <div class="aspect-square bg-parchment-50 flex items-center justify-center">
                        <img :src="image.url" :alt="image.caption || `Image ${index + 1}`" class="w-full h-full object-cover" />
                    </div>

                    <!-- Caption -->
                    <div class="p-2">
                        <input :value="image.caption || ''" @input="updateCaption(image.id, ($event.target as HTMLInputElement).value)" placeholder="Legenda (opcional)" class="w-full text-sm h-8 px-2 bg-parchment-50 border border-medieval-300 rounded font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" />
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-4">
                <ImageIcon class="h-12 w-12 mx-auto mb-2 text-medieval-400" />
                <p class="text-sm text-medieval-500 font-ui">
                    Nenhuma imagem adicionada
                </p>
            </div>

            <!-- Info -->
            <p class="text-sm text-medieval-500 font-ui">
                {{ images.length }} / 10 imagens
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload, X, ImageIcon } from 'lucide-vue-next'

export interface ImageItem {
    id: string
    url: string
    caption?: string
    file?: File
}

interface Props {
    images: ImageItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:images': [images: ImageItem[]]
}>()

const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const validFiles = Array.from(files).filter((file) => {
        const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
        const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB

        if (!isValidType) {
            console.warn(`Arquivo ${file.name} não é um tipo válido`)
        }
        if (!isValidSize) {
            console.warn(`Arquivo ${file.name} excede 5MB`)
        }

        return isValidType && isValidSize
    })

    if (props.images.length + validFiles.length > 10) {
        alert('Máximo de 10 imagens permitido')
        return
    }

    const newImages: ImageItem[] = validFiles.map((file) => ({
        id: `img-${Date.now()}-${Math.random()}`,
        url: URL.createObjectURL(file),
        caption: '',
        file,
    }))

    emit('update:images', [...props.images, ...newImages])
}

const handleDrop = (e: DragEvent) => {
    isDragging.value = false
    handleFileSelect(e.dataTransfer?.files || null)
}

const handleDragOver = () => {
    isDragging.value = true
}

const handleDragLeave = () => {
    isDragging.value = false
}

const triggerFileInput = () => {
    fileInputRef.value?.click()
}

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    handleFileSelect(target.files)
}

const removeImage = (id: string) => {
    const image = props.images.find((img) => img.id === id)
    if (image?.url) {
        URL.revokeObjectURL(image.url)
    }
    emit('update:images', props.images.filter((img) => img.id !== id))
}

const updateCaption = (id: string, caption: string) => {
    emit(
        'update:images',
        props.images.map((img) => (img.id === id ? { ...img, caption } : img))
    )
}
</script>

<style scoped>
.aspect-square {
    aspect-ratio: 1 / 1;
}
</style>