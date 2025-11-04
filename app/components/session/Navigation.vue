<template>
    <div class="sticky top-4 z-40 mb-6">
        <div class="shadow-parchment bg-parchment-50 rounded-lg p-3 flex items-center justify-center gap-2">
            <!-- Previous Button -->
            <div class="relative group">
                <button :disabled="!previousSession" class="border border-gold-400 text-medieval-700 hover:bg-gold-400/10 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md text-sm font-ui flex items-center gap-2 transition-colors" @click="$emit('previous')">
                    <Icon name="lucide:chevron-left" class="w-4 h-4" />
                    Anterior
                </button>
                <Transition name="tooltip">
                    <div v-if="previousSession && showPreviousTooltip" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-medieval-800 text-parchment-50 text-sm rounded-md whitespace-nowrap pointer-events-none shadow-lg">
                        {{ previousSession.title }}
                        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-medieval-800"></div>
                    </div>
                </Transition>
            </div>

            <!-- Index Button -->
            <div class="relative group">
                <button class="text-medieval-700 hover:bg-gold-400/10 px-4 py-2 rounded-md text-sm font-ui flex items-center gap-2 transition-colors" @click="$emit('index-click')" @mouseenter="showIndexTooltip = true" @mouseleave="showIndexTooltip = false">
                    <Icon name="lucide:list" class="w-4 h-4" />
                    Índice
                </button>
                <Transition name="tooltip">
                    <div v-if="showIndexTooltip" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-medieval-800 text-parchment-50 text-sm rounded-md whitespace-nowrap pointer-events-none shadow-lg">
                        Ver todas as sessões
                        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-medieval-800"></div>
                    </div>
                </Transition>
            </div>

            <!-- Next Button -->
            <div class="relative group">
                <button :disabled="!nextSession" class="border border-gold-400 text-medieval-700 hover:bg-gold-400/10 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md text-sm font-ui flex items-center gap-2 transition-colors" @click="$emit('next')" @mouseenter="showNextTooltip = true" @mouseleave="showNextTooltip = false">
                    Próxima
                    <Icon name="lucide:chevron-right" class="w-4 h-4" />
                </button>
                <Transition name="tooltip">
                    <div v-if="nextSession && showNextTooltip" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-medieval-800 text-parchment-50 text-sm rounded-md whitespace-nowrap pointer-events-none shadow-lg">
                        {{ nextSession.title }}
                        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-medieval-800"></div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Session {
    id: number
    title: string
}

interface SessionNavigationProps {
    previousSession?: Session
    nextSession?: Session
}

defineProps<SessionNavigationProps>()

defineEmits<{
    'previous': []
    'next': []
    'index-click': []
}>()

const showPreviousTooltip = ref(false)
const showNextTooltip = ref(false)
const showIndexTooltip = ref(false)
</script>

<style scoped>
.parchment-texture {
    background-color: #FAF7F0;
}

/* Tooltip transition */
.tooltip-enter-active,
.tooltip-leave-active {
    transition: opacity 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
    opacity: 0;
}
</style>