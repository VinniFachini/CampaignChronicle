<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FileTextIcon, ClockIcon, HeartCrackIcon } from 'lucide-vue-next'

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

const problems = [
    {
        icon: FileTextIcon,
        emoji: '📝',
        title: 'Anotações dispersas',
        description: 'Cadernos perdidos, notas no celular, mensagens esquecidas no Discord...'
    },
    {
        icon: ClockIcon,
        emoji: '⏰',
        title: 'Detalhes esquecidos',
        description: '"Qual era o nome daquele NPC mesmo?" - Momentos importantes se perdem com o tempo'
    },
    {
        icon: HeartCrackIcon,
        emoji: '💔',
        title: 'Campanhas perdidas',
        description: 'Anos de aventuras sem registro adequado, memórias que merecem ser preservadas'
    }
]
</script>

<template>
    <section ref="sectionRef" class="py-24 transition-opacity duration-700 bg-parchment-100" :class="{ 'opacity-100 translate-y-0': isInView, 'opacity-0 translate-y-8': !isInView }">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 transition-all duration-700">
                <h2 class="font-display text-4xl sm:text-5xl mb-4 text-medieval-700">
                    Suas aventuras épicas merecem mais
                </h2>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div v-for="(problem, index) in problems" :key="index" class="p-8 py-16 text-center h-full border-2 flex flex-col items-center justify-start rounded-xl transition-all duration-300 hover:shadow-lg bg-white border-parchment-400">
                    <div class="text-5xl mb-8">{{ problem.emoji }}</div>
                    <h3 class="font-display text-xl mb-2 text-medieval-700">
                        {{ problem.title }}
                    </h3>
                    <p class="font-body text-medieval-500">
                        {{ problem.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
