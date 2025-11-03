<template>
    <footer class="border-t border-medieval-200 bg-white">
        <div class="container mx-auto px-4 py-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <!-- Logo and Copyright -->
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <BookOpen class="h-6 w-6 text-gold-500" :stroke-width="2" />
                        <div class="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-medieval-700 flex items-center justify-center">
                            <div class="h-1.5 w-1.5 rounded-full bg-gold-400" />
                        </div>
                    </div>
                    <div>
                        <p class="font-display text-medieval-800">
                            CampaignChronicle
                        </p>
                        <p class="text-medieval-600 font-ui">
                            © {{ currentYear }} Todos os direitos reservados
                        </p>
                    </div>
                </div>

                <!-- Links -->
                <div class="flex items-center gap-6 font-ui text-medieval-600">
                    <a href="#" class="hover:text-gold-600 transition-colors">
                        Sobre
                    </a>
                    <a href="#" class="hover:text-gold-600 transition-colors">
                        Ajuda
                    </a>
                    <a href="#" class="hover:text-gold-600 transition-colors">
                        Termos
                    </a>
                    <a href="#" class="hover:text-gold-600 transition-colors">
                        Privacidade
                    </a>
                </div>

                <!-- Made with Love -->
                <div class="flex items-center gap-2 text-medieval-600 font-ui">
                    <span>Feito com</span>
                    <Heart class="h-4 w-4 text-error fill-error" />
                    <span>para mestres e jogadores</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BookOpen, Heart } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>