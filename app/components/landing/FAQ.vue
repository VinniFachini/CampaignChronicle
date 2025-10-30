<script setup lang="ts">
import { ChevronDownIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const faqs = [
    {
        question: 'CampaignChronicle é realmente gratuito?',
        answer:
            'Sim! Nossa versão Beta é 100% gratuita e inclui todas as funcionalidades principais. Planejamos oferecer planos premium no futuro com recursos avançados, mas sempre manteremos uma versão gratuita robusta.'
    },
    {
        question: 'Preciso ter conhecimento técnico para usar?',
        answer:
            'Absolutamente não! A plataforma foi projetada para ser intuitiva. Se você consegue escrever um email, consegue documentar sua campanha. Oferecemos tutoriais e suporte para ajudar você a começar.'
    },
    {
        question: 'Funciona com qualquer sistema de RPG?',
        answer:
            'Sim! CampaignChronicle é agnóstico de sistema. Funciona perfeitamente com D&D, Pathfinder, Call of Cthulhu, sistemas nacionais e qualquer outro RPG de mesa que você jogue.'
    },
    {
        question: 'Minhas campanhas são privadas?',
        answer:
            'Suas campanhas são privadas por padrão. Você decide se quer compartilhar com sua mesa, tornar pública para inspirar outros mestres, ou manter completamente privada. Seus dados são seus.'
    },
    {
        question: 'Posso exportar meus dados?',
        answer:
            'Sim! Você pode exportar suas campanhas em PDF a qualquer momento. Estamos trabalhando em mais formatos de exportação (Markdown, JSON) para garantir que você nunca fique "preso" na plataforma.'
    },
    {
        question: 'Existe limite de campanhas ou sessões?',
        answer:
            'Na versão Beta atual, oferecemos campanhas ilimitadas e 500MB de armazenamento (suficiente para MUITAS sessões e imagens). Nosso foco é ajudar você a documentar sem limites artificiais.'
    }
];

const openIndex = ref<number | null>(null);

const toggleFaq = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
    <section class="py-24 bg-parchment-100">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 class="font-display text-4xl sm:text-5xl mb-4 text-medieval-700">
                Perguntas Frequentes
            </h2>
            <p class="font-body text-xl text-medieval-500">
                Tudo que você precisa saber
            </p>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" class="border-2 rounded-lg bg-white overflow-hidden transition-all border-parchment-200" :class="{ 'border-gold-400': openIndex === index }">
                <button @click="toggleFaq(index)" class="font-display w-full cursor-pointer text-left px-6 py-4 flex font-bold justify-between items-center text-medieval-700 hover:bg-parchment-200 transition-colors" :class="{ 'border-b border-parchment-300': openIndex === index }">
                    {{ faq.question }}
                    <span class="transition-transform duration-500" :class="{ 'rotate-180': openIndex === index }">
                        <ChevronDownIcon class="w-4 h-4 text-medieval-500" />
                    </span>
                </button>

                <div class="overflow-hidden transition-all duration-500 ease-in-out" :class="openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'">
                    <div class="font-body text-base leading-relaxed px-6 py-4 text-left text-medieval-500">
                        {{ faq.answer }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>