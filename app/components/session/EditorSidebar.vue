<script setup lang="ts">
import { Eye, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
    sessionNumber: number
    title: string
    date: string
    eventsCount: number
}

const props = defineProps<Props>()
const emit = defineEmits(['preview'])

const formattedDate = computed(() => {
    if (!props.date) return 'Sem data'
    return new Date(props.date).toLocaleDateString('pt-BR')
})
</script>

<template>
    <div class="space-y-6">
        <!-- Preview Card -->
        <div class="bg-parchment-100 border border-medieval-300/30 rounded-lg shadow">
            <div class="p-6 border-b border-medieval-300/30">
                <h3 class="text-lg font-semibold flex items-center gap-2">
                    <Eye class="h-5 w-5" />
                    Pré-visualização
                </h3>
            </div>
            <div class="p-6 space-y-4">
                <div class="p-4 bg-white rounded-lg border border-medieval-300/30 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-medieval-500 text-parchment-100 font-ui">
                            Sessão #{{ sessionNumber }}
                        </span>
                        <span class="text-sm text-medieval-600 font-ui">
                            {{ formattedDate }}
                        </span>
                    </div>

                    <h3 class="font-display text-lg line-clamp-2">
                        {{ title || 'Título da sessão' }}
                    </h3>

                    <div class="flex items-center gap-4 text-sm text-medieval-600 font-ui">
                        <span>{{ eventsCount }} {{ eventsCount === 1 ? 'evento' : 'eventos' }}</span>
                    </div>
                </div>

                <button class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 font-ui bg-gold-500 hover:bg-gold-600 text-medieval-700 rounded-md transition-colors" @click="emit('preview')">
                    <Eye class="h-4 w-4" />
                    Preview Completo
                </button>
            </div>
        </div>

        <!-- Tips Card -->
        <div class="bg-parchment-100 border border-medieval-300/30 rounded-lg shadow">
            <div class="p-6 border-b border-medieval-300/30">
                <h3 class="text-lg font-semibold flex items-center gap-2">
                    <Lightbulb class="h-5 w-5 text-warning-500" />
                    Dicas de Documentação
                </h3>
            </div>
            <div class="p-6">
                <ul class="space-y-3 text-sm font-ui">
                    <li class="flex items-start gap-2">
                        <span class="text-gold-400 mt-0.5">•</span>
                        <span>Seja específico nos eventos para facilitar consultas futuras</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-gold-400 mt-0.5">•</span>
                        <span>Use markdown para formatar: **negrito**, *itálico*, # títulos</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-gold-400 mt-0.5">•</span>
                        <span>Adicione imagens de momentos importantes da sessão</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-gold-400 mt-0.5">•</span>
                        <span>Documente decisões importantes dos jogadores</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-gold-400 mt-0.5">•</span>
                        <span>Mantenha um resumo conciso mas informativo</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-gold-400 mt-0.5">•</span>
                        <span>Use notas privadas para lembretes que só o mestre vê</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Related Sessions -->
        <div class="bg-parchment-100 border border-medieval-300/30 rounded-lg shadow">
            <div class="p-6 border-b border-medieval-300/30">
                <h3 class="text-lg font-semibold">
                    Sessões Relacionadas
                </h3>
            </div>
            <div class="p-6 space-y-3">
                <button v-if="sessionNumber > 1" class="w-full inline-flex items-center justify-start gap-2 px-4 py-2 font-ui border border-medieval-300/40 text-medieval-500 hover:bg-medieval-300/10 rounded-md transition-colors">
                    <ChevronLeft class="h-4 w-4" />
                    Sessão #{{ sessionNumber - 1 }}
                </button>
                <p v-else class="text-sm text-medieval-600 text-center font-ui py-2">
                    Esta é a primeira sessão
                </p>

                <button class="w-full inline-flex items-center justify-start gap-2 px-4 py-2 font-ui border border-medieval-300/40 text-medieval-600 opacity-50 cursor-not-allowed rounded-md" disabled>
                    <ChevronRight class="h-4 w-4" />
                    Próxima Sessão
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>