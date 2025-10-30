<!-- pages/index.vue -->
<template>
    <NuxtLayout name="landing-layout">
        <LandingHero />
        <LandingProblem />
        <LandingFeatures />
        <LandingMockup />
        <LandingDifferentials />
        <LandingTarget />
        <LandingTestimonials />
        <LandingMainCTA />
        <LandingFAQ />
        <LandingFinalCTA />
    </NuxtLayout>
</template>

<script setup lang="ts">
// Configuração de SEO para a página inicial
useHead({
    title: 'CampaignChronicle - Transforme sua campanha em uma crônica viva',
    meta: [
        {
            name: 'description',
            content: 'Plataforma completa para documentar e compartilhar suas campanhas de RPG. Crie uma crônica épica das suas aventuras de D&D, Pathfinder e muito mais.'
        },
        {
            name: 'keywords',
            content: 'RPG, D&D, Dungeons and Dragons, campanha, sessão, mestre, jogador, crônica, documentação, Pathfinder, sistema, aventura'
        },
        { property: 'og:title', content: 'CampaignChronicle - Preserve Suas Aventuras Épicas' },
        { property: 'og:description', content: 'Documente suas sessões de RPG, crie personagens memoráveis e preserve suas histórias para sempre.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://campaignchronicle.com' },
        { property: 'og:image', content: 'https://campaignchronicle.com/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'CampaignChronicle - Preserve Suas Aventuras Épicas' },
        { name: 'twitter:description', content: 'Documente suas sessões de RPG e crie uma crônica épica' },
        { name: 'twitter:image', content: 'https://campaignchronicle.com/twitter-image.jpg' }
    ],
    link: [
        { rel: 'canonical', href: 'https://campaignchronicle.com' }
    ],
})

// Define a transição da página
definePageMeta({
    pageTransition: {
        name: 'page',
        mode: 'out-in'
    }
})

// Analytics (opcional - descomente quando configurar)
// onMounted(() => {
//   if (process.client) {
//     // Google Analytics
//     window.gtag?.('event', 'page_view', {
//       page_title: 'Home',
//       page_location: window.location.href,
//       page_path: '/'
//     })
//   }
// })
</script>

<style scoped>
/* Transição de página */
.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
}
</style>