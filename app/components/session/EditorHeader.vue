<template>
    <header class="border-b border-medieval-200 bg-white sticky top-0 z-10 shadow-sm">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between gap-4 flex-wrap">
                <!-- Breadcrumb -->
                <div class="flex items-center gap-4 flex-1 min-w-0">
                    <nav class="flex items-center gap-2 font-ui text-sm">
                        <NuxtLink to="/dashboard/campaign" class="text-medieval-500 hover:text-medieval-700 transition-colors">
                            Campanha
                        </NuxtLink>
                        <ChevronRight class="h-4 w-4 text-medieval-400" />
                        <NuxtLink to="/dashboard/campaign/sessions" class="text-medieval-500 hover:text-medieval-700 transition-colors">
                            Sessões
                        </NuxtLink>
                        <ChevronRight class="h-4 w-4 text-medieval-400" />
                        <span class="text-medieval-800 font-medium">
                            {{ sessionNumber ? `Editar Sessão #${sessionNumber}` : 'Nova Sessão' }}
                        </span>
                    </nav>

                    <span :class="[
                        'inline-flex items-center px-2.5 py-0.5 text-xs rounded-full border font-ui',
                        status === 'published'
                            ? 'bg-green-50 text-green-700 border-green-300'
                            : 'bg-medieval-100 text-medieval-700 border-medieval-300'
                    ]">
                        {{ status === 'published' ? 'Publicada' : 'Rascunho' }}
                    </span>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-3">
                    <!-- Auto-save indicator -->
                    <div class="flex items-center gap-2 text-sm text-medieval-500 font-ui">
                        <template v-if="autoSaveStatus === 'saving'">
                            <Save class="h-4 w-4 animate-pulse" />
                            <span>Salvando...</span>
                        </template>
                        <template v-else-if="autoSaveStatus === 'saved'">
                            <CheckCircle2 class="h-4 w-4 text-green-600" />
                            <span>{{ timeSinceLastSave }}</span>
                        </template>
                    </div>

                    <button @click="$emit('cancel')" class="px-4 py-2 border border-medieval-300 text-medieval-700 hover:bg-medieval-50 rounded-md font-ui transition-colors">
                        Cancelar
                    </button>

                    <button @click="$emit('save-draft')" :disabled="isPublishing" class="inline-flex items-center gap-2 px-4 py-2 bg-medieval-600 hover:bg-medieval-700 text-white rounded-md font-ui transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <Save class="h-4 w-4" />
                        Salvar Rascunho
                    </button>

                    <button @click="$emit('publish')" :disabled="isPublishing" class="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-md font-ui transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <template v-if="isPublishing">
                            <Save class="h-4 w-4 animate-pulse" />
                            Publicando...
                        </template>
                        <template v-else>
                            <Send class="h-4 w-4" />
                            Publicar
                        </template>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight, Save, CheckCircle2, Send } from 'lucide-vue-next'

interface Props {
    sessionNumber: number | null
    status: 'draft' | 'published'
    autoSaveStatus: 'saved' | 'saving' | 'unsaved'
    lastSaved: Date | null
    isPublishing: boolean
}

const props = defineProps<Props>()

defineEmits<{
    cancel: []
    'save-draft': []
    publish: []
}>()

const timeSinceLastSave = computed(() => {
    if (!props.lastSaved) return ''

    const seconds = Math.floor((new Date().getTime() - props.lastSaved.getTime()) / 1000)

    if (seconds < 60) return 'Salvo agora mesmo'

    const minutes = Math.floor(seconds / 60)
    if (minutes === 1) return 'Salvo há 1 min'
    if (minutes < 60) return `Salvo há ${minutes} min`

    const hours = Math.floor(minutes / 60)
    return `Salvo há ${hours}h`
})
</script>

<style scoped>
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>