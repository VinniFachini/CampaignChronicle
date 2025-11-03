<script setup lang="ts">
import { Lightbulb } from 'lucide-vue-next'

interface Tip {
    icon: string
    text: string
}

const tips: Tip[] = [
    {
        icon: '💡',
        text: 'Use tags para organizar suas campanhas e facilitar a busca. Adicione tags como \'Horror\', \'Comédia\' ou \'Sandbox\'!',
    },
    {
        icon: '📝',
        text: 'Registre suas sessões logo após jogar para não esquecer detalhes importantes da história!',
    },
    {
        icon: '🎭',
        text: 'Mantenha perfis detalhados dos personagens para acompanhar o desenvolvimento ao longo da campanha.',
    },
    {
        icon: '🗺️',
        text: 'Crie mapas e use imagens para tornar suas anotações mais visuais e memoráveis.',
    },
    {
        icon: '👥',
        text: 'Compartilhe campanhas públicas com a comunidade para inspirar outros mestres!',
    },
    {
        icon: '📖',
        text: 'Faça backup regular das suas anotações exportando suas campanhas.',
    },
    {
        icon: '⚔️',
        text: 'Use a seção de combate para registrar encontros épicos e estatísticas de batalha.',
    },
]

const currentTip = ref(0)

// Change tip every 10 seconds
let interval: number | null = 10000

onMounted(() => {
    interval = setInterval(() => {
        currentTip.value = (currentTip.value + 1) % tips.length
    }, 10000)
})

onUnmounted(() => {
    if (interval) {
        clearInterval(interval)
    }
})

const tip = computed(() => tips[currentTip.value])
</script>

<template>
    <div class="bg-white border border-gold-200 rounded-lg p-4 animate-fade-in">
        <div class="flex items-start gap-3">
            <!-- Icon Container -->
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
                <Lightbulb class="h-4 w-4 text-gold-600" />
            </div>

            <!-- Tip Content -->
            <div class="flex-1">
                <h4 class="font-display text-medieval-800 mb-2">
                    {{ tip!.icon }} Dica Rápida
                </h4>
                <p class="text-sm text-medieval-700 font-body">
                    {{ tip!.text }}
                </p>
            </div>
        </div>

        <!-- Progress Indicators -->
        <div class="flex gap-1 mt-3 justify-center">
            <div v-for="(_, index) in tips" :key="index" :class="[
                'h-1 w-6 rounded-full transition-colors',
                index === currentTip ? 'bg-gold-500' : 'bg-gold-200'
            ]" />
        </div>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}
</style>