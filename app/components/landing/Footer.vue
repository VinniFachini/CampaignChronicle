<script setup lang="ts">
import { Book, Twitter, Instagram, Youtube, Mail } from 'lucide-vue-next';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const footerSections: FooterSection[] = [
    {
        title: 'Produto',
        links: [
            { label: 'Funcionalidades', href: '#features' },
            { label: 'Preços', href: '#pricing' },
            { label: 'Atualizações', href: '#updates' },
            { label: 'Roadmap', href: '#roadmap' }
        ]
    },
    {
        title: 'Recursos',
        links: [
            { label: 'Blog', href: '/blog' },
            { label: 'Guias', href: '/guides' },
            { label: 'Templates', href: '/templates' },
            { label: 'Comunidade', href: '/community' }
        ]
    },
    {
        title: 'Empresa',
        links: [
            { label: 'Sobre', href: '/about' },
            { label: 'Contato', href: '/contact' },
            { label: 'Privacidade', href: '/privacy' },
            { label: 'Termos', href: '/terms' }
        ]
    }
];

const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Mail, href: 'mailto:contact@campaignchronicle.com', label: 'Email' }
];
</script>

<template>
    <footer class="py-16 bg-medieval-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-5 gap-12 mb-12">
                <!-- Logo and description -->
                <div class="md:col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-10 h-10 rounded-lg bg-gold-400 flex items-center justify-center">
                            <Book class="w-6 h-6 text-white" />
                        </div>
                        <span class="font-display text-xl text-parchment-100">
                            CampaignChronicle
                        </span>
                    </div>

                    <p class="font-body mb-6 text-parchment-100/70">
                        Transforme suas campanhas de RPG em crônicas vivas que vão durar para sempre.
                    </p>

                    <div class="flex gap-4">
                        <a v-for="(social, index) in socialLinks" :key="index" :href="social.href" :aria-label="social.label" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg bg-parchment-100/10 text-parchment-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gold-400">
                            <component :is="social.icon" class="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <!-- Footer links -->
                <div v-for="(section, index) in footerSections" :key="index">
                    <h4 class="font-display mb-4 text-parchment-100">
                        {{ section.title }}
                    </h4>
                    <ul class="space-y-3">
                        <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
                            <NuxtLink :to="link.href" class="font-ui text-parchment-100/70 transition-colors hover:text-gold-400">
                                {{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Copyright -->
            <div class="pt-8 border-t border-parchment-100/10 text-center">
                <p class="font-ui text-sm text-parchment-100/50">
                    © 2025 CampaignChronicle. Todos os direitos reservados. Feito com ❤️ para a comunidade RPG.
                </p>
            </div>
        </div>
    </footer>
</template>