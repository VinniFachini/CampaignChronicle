<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
                <h2 class="font-display text-medieval-700 text-2xl mb-1">Galeria da Campanha</h2>
                <p class="text-medieval-400 font-ui">{{ galleryImages.length }} imagens • Mapas, personagens, locais e momentos épicos</p>
            </div>
            <button v-if="isGM" class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui shadow-md px-4 py-2 rounded-md flex items-center transition-colors">
                <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                Upload de Imagem
            </button>
        </div>

        <!-- Masonry Grid -->
        <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <div v-for="image in galleryImages" :key="image.id" class="break-inside-avoid parchment-texture border border-gold-400/30 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer group overflow-hidden" @click="openImageModal(image)">
                <div class="relative overflow-hidden">
                    <img :src="image.url" :alt="image.title" class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    <!-- Overlay on hover -->
                    <div class="absolute inset-0 bg-gradient-to-t from-medieval-700/90 via-medieval-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h4 class="font-display text-parchment-100 mb-1">{{ image.title }}</h4>
                        <div class="flex items-center gap-2 text-xs text-parchment-300 font-ui">
                            <Icon name="lucide:calendar" class="w-3 h-3" />
                            {{ image.date }}
                        </div>
                        <span class="bg-gold-400 text-medieval-700 px-3 py-1 rounded-full text-xs font-ui mt-2 w-fit">
                            {{ image.session }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="galleryImages.length === 0" class="parchment-texture border border-gold-400/30 rounded-lg shadow-md">
            <div class="py-16 text-center px-6">
                <Icon name="lucide:image" class="w-20 h-20 text-gold-400 mx-auto mb-4 opacity-50" />
                <h3 class="font-display text-medieval-700 mb-2 text-lg">Nenhuma imagem na galeria</h3>
                <p class="text-medieval-400 font-ui mb-6 max-w-md mx-auto">
                    Comece a adicionar imagens para documentar visualmente sua campanha.
                    Mapas, retratos de personagens, locais e momentos memoráveis.
                </p>
                <button class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui px-4 py-2 rounded-md flex items-center mx-auto transition-colors">
                    <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                    Adicionar Primeira Imagem
                </button>
            </div>
        </div>

        <!-- Image Detail Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="selectedImage" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeImageModal">
                    <div class="max-w-4xl w-full parchment-texture border-2 border-gold-400 rounded-lg shadow-medieval overflow-hidden">
                        <!-- Modal Header -->
                        <div class="p-6 border-b border-gold-400/20">
                            <div class="flex items-start justify-between">
                                <h3 class="font-display text-medieval-700 text-xl font-semibold">
                                    {{ selectedImage.title }}
                                </h3>
                                <button class="text-medieval-400 hover:text-medieval-700 transition-colors" @click="closeImageModal">
                                    <Icon name="lucide:x" class="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <!-- Modal Content -->
                        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <img :src="selectedImage.url" :alt="selectedImage.title" class="w-full h-auto rounded-lg border-2 border-gold-400/30" />

                            <div class="flex flex-wrap gap-3 items-center">
                                <span class="bg-gold-400 text-medieval-700 px-3 py-1 rounded-full text-sm font-ui">
                                    {{ selectedImage.session }}
                                </span>
                                <div class="flex items-center gap-2 text-sm text-medieval-400 font-ui">
                                    <Icon name="lucide:calendar" class="w-4 h-4 text-gold-500" />
                                    {{ selectedImage.date }}
                                </div>
                            </div>

                            <p class="font-body text-medieval-500 leading-relaxed">
                                {{ selectedImage.description }}
                            </p>

                            <div class="flex gap-2 pt-4 border-t border-gold-400/20">
                                <button v-if="isGM" class="border border-gold-400 text-gold-500 hover:bg-gold-400/20 font-ui px-4 py-2 rounded-md transition-colors">
                                    Editar Detalhes
                                </button>
                                <button class="border border-gold-400 text-gold-500 hover:bg-gold-400/20 font-ui px-4 py-2 rounded-md transition-colors">
                                    Baixar Imagem
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
interface GalleryImage {
    id: number
    url: string
    title: string
    date: string
    session: string
    description: string
}

interface GalleryTabProps {
    isGM?: boolean
}

const props = withDefaults(defineProps<GalleryTabProps>(), {
    isGM: false
})

const selectedImage = ref<GalleryImage | null>(null)

const galleryImages: GalleryImage[] = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1618385418700-35dc948cdeec?w=800",
        title: "Mapa da Região de Valthoria",
        date: "15 de Março, 2024",
        session: "Sessão #1",
        description: "Mapa detalhado mostrando os principais reinos e localizações da campanha."
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1610926597998-fc7f2c1b89b0?w=800",
        title: "Infernus, o Dragão Vermelho",
        date: "28 de Outubro, 2024",
        session: "Sessão #12",
        description: "Retrato do temível Dragão Vermelho que guardava a segunda relíquia."
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1485465053475-dd55ed3894b9?w=800",
        title: "Castelo de Ironpeak",
        date: "14 de Outubro, 2024",
        session: "Sessão #11",
        description: "Fortaleza dos Anões nas Montanhas Gélidas."
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1728339097250-bf673536786f?w=800",
        title: "As Masmorras Antigas",
        date: "2 de Setembro, 2024",
        session: "Sessão #8",
        description: "Câmaras subterrâneas onde a primeira relíquia foi encontrada."
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1557524676-fb4323e6bdcb?w=800",
        title: "Armadura do Cavaleiro Caído",
        date: "19 de Agosto, 2024",
        session: "Sessão #7",
        description: "Relíquia encontrada no início da jornada."
    },
    {
        id: 6,
        url: "https://images.unsplash.com/photo-1719620131173-f5c51fe23ed0?w=800",
        title: "A Taverna do Dragão Adormecido",
        date: "19 de Agosto, 2024",
        session: "Sessão #7",
        description: "Local onde o grupo se conheceu pela primeira vez."
    },
    {
        id: 7,
        url: "https://images.unsplash.com/photo-1598610768519-418002c9142e?w=800",
        title: "Ruínas do Templo Antigo",
        date: "5 de Setembro, 2024",
        session: "Sessão #9",
        description: "Local de pistas importantes sobre a profecia."
    },
    {
        id: 8,
        url: "https://images.unsplash.com/photo-1757083840090-17a7bfca08c0?w=800",
        title: "A Espada de Thorne",
        date: "28 de Outubro, 2024",
        session: "Sessão #12",
        description: "Arma lendária forjada nas guerras antigas."
    },
    {
        id: 9,
        url: "https://images.unsplash.com/photo-1632809199725-72a4245e846b?w=800",
        title: "Tesouro do Dragão",
        date: "28 de Outubro, 2024",
        session: "Sessão #12",
        description: "Pilha de ouro e artefatos guardados por Infernus."
    }
]

const openImageModal = (image: GalleryImage) => {
    selectedImage.value = image
    document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
    selectedImage.value = null
    document.body.style.overflow = ''
}

// Cleanup on unmount
onUnmounted(() => {
    document.body.style.overflow = ''
})
</script>

<style scoped>
.parchment-texture {
    background-color: #FAF7F0;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .parchment-texture,
.modal-leave-active .parchment-texture {
    transition: transform 0.3s ease;
}

.modal-enter-from .parchment-texture,
.modal-leave-to .parchment-texture {
    transform: scale(0.9);
}
</style>