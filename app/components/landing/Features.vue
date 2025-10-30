<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Book, Map, ImageIcon } from 'lucide-vue-next'

const sectionRef = ref<HTMLElement | null>(null)
const isInView = ref(false)

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries: any) => {
            if (entries[0].isIntersecting) {
                isInView.value = true
                observer.disconnect()
            }
        },
        { threshold: 0.2 }
    )

    if (sectionRef.value) observer.observe(sectionRef.value)
})

const features = [
    {
        icon: Book,
        emoji: '📖',
        title: 'Documente Cada Aventura',
        description: 'Editor rico em recursos para registrar cada sessão, eventos marcantes e decisões importantes que moldaram sua história',
        highlights: ['Markdown suportado', 'Tags e categorias', 'Busca avançada']
    },
    {
        icon: Map,
        emoji: '🗺️',
        title: 'Visualize Sua Jornada',
        description: 'Timeline cronológica que mostra a evolução da sua campanha, revelando conexões e marcos importantes',
        highlights: ['Timeline interativa', 'Filtros personalizados', 'Visualização de arcos']
    },
    {
        icon: ImageIcon,
        emoji: '🖼️',
        title: 'Preserve os Momentos',
        description: 'Galeria integrada para mapas, ilustrações de personagens e capturas de tela memoráveis da sua mesa',
        highlights: ['Upload ilimitado', 'Organização inteligente', 'Compartilhamento fácil']
    }
]
</script>

<template>
    <section ref="sectionRef" id="funcionalidades" class="py-24 transition-all bg-white duration-700" :class="{ 'opacity-100 translate-y-0': isInView, 'opacity-0 translate-y-8': !isInView }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Título -->
            <div class="text-center mb-16 transition-all duration-700">
                <h2 class="font-display text-4xl sm:text-5xl mb-4 text-medieval-700">
                    Ferramentas para Mestres e Jogadores
                </h2>
                <p class="font-body text-xl max-w-2xl mx-auto text-medieval-500">
                    Tudo que você precisa para documentar e celebrar suas aventuras épicas
                </p>
            </div>

            <!-- Cards -->
            <div class="grid md:grid-cols-3 gap-8">
                <div v-for="(feature, index) in features" :key="index" class="p-8 h-full border-2 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group border-parchment-400 bg-white">
                    <!-- Ícone dinâmico -->
                    <div class="text-5xl mb-8">{{ feature.emoji }}</div>

                    <h3 class="font-display text-2xl mb-4 text-medieval-700">
                        {{ feature.title }}
                    </h3>

                    <p class="font-body mb-6 text-medieval-500">
                        {{ feature.description }}
                    </p>

                    <ul class="space-y-2">
                        <li v-for="(highlight, i) in feature.highlights" :key="i" class="font-ui text-sm flex items-center gap-2 text-medieval-500">
                            <span class="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                            {{ highlight }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
