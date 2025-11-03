<script setup lang="ts">
import { Scroll, Calendar, Users, Clock, Image, UserCircle, Archive } from 'lucide-vue-next'

const activeTab = ref('overview')
const isGM = ref(true) // Set to false to see player view
const isArchived = ref(false) // Set to true to see archived banner

// Handler para navegação de tabs
const handleTabNavigation = (tabName: string) => {
    activeTab.value = tabName
}
</script>

<template>
    <CampaignHeader :notification-count="5" />
    <NuxtLayout name="dashboard-layout" class="min-h-screen relative">
        <!-- Main Container -->
        <div class="container mx-auto relative z-10">
            <!-- Archived Banner -->
            <div v-if="isArchived" class="mb-6 border border-warning-500 bg-warning-500/10 rounded-lg p-4 flex items-start gap-3">
                <Archive class="h-4 w-4 text-warning-500 mt-0.5 flex-shrink-0" />
                <p class="font-ui text-sm text-medieval-500">
                    Esta campanha está arquivada. Você ainda pode visualizar todo o conteúdo, mas não pode fazer alterações.
                </p>
            </div>

            <!-- Hero Section -->
            <CampaignHeroSection :is-g-m="isGM" />

            <!-- Navigation Tabs -->
            <div class="w-full">
                <!-- Tab List - Medieval Style -->
                <div class="mb-6 overflow-x-auto">
                    <div class="w-full inline-flex bg-white border-b-2 border-gold-400/30 p-0 h-auto">
                        <button type="button" :class="[
                            'relative px-6 py-4 border-b-2 border-transparent transition-all duration-200 font-display whitespace-nowrap',
                            activeTab === 'overview'
                                ? 'border-gold-400 bg-gold-400/10 text-medieval-700'
                                : 'text-medieval-500 hover:text-medieval-700 hover:bg-parchment-200/30'
                        ]" @click="activeTab = 'overview'">
                            <Scroll class="w-4 h-4 mr-2 inline-block" />
                            Visão Geral
                        </button>

                        <button type="button" :class="[
                            'relative px-6 py-4 border-b-2 border-transparent transition-all duration-200 font-display whitespace-nowrap',
                            activeTab === 'sessions'
                                ? 'border-gold-400 bg-gold-400/10 text-medieval-700'
                                : 'text-medieval-500 hover:text-medieval-700 hover:bg-parchment-200/30'
                        ]" @click="activeTab = 'sessions'">
                            <Calendar class="w-4 h-4 mr-2 inline-block" />
                            Sessões
                        </button>

                        <button type="button" :class="[
                            'relative px-6 py-4 border-b-2 border-transparent transition-all duration-200 font-display whitespace-nowrap',
                            activeTab === 'characters'
                                ? 'border-gold-400 bg-gold-400/10 text-medieval-700'
                                : 'text-medieval-500 hover:text-medieval-700 hover:bg-parchment-200/30'
                        ]" @click="activeTab = 'characters'">
                            <Users class="w-4 h-4 mr-2 inline-block" />
                            Personagens
                        </button>

                        <button type="button" :class="[
                            'relative px-6 py-4 border-b-2 border-transparent transition-all duration-200 font-display whitespace-nowrap',
                            activeTab === 'timeline'
                                ? 'border-gold-400 bg-gold-400/10 text-medieval-700'
                                : 'text-medieval-500 hover:text-medieval-700 hover:bg-parchment-200/30'
                        ]" @click="activeTab = 'timeline'">
                            <Clock class="w-4 h-4 mr-2 inline-block" />
                            Timeline
                        </button>

                        <button type="button" :class="[
                            'relative px-6 py-4 border-b-2 border-transparent transition-all duration-200 font-display whitespace-nowrap',
                            activeTab === 'gallery'
                                ? 'border-gold-400 bg-gold-400/10 text-medieval-700'
                                : 'text-medieval-500 hover:text-medieval-700 hover:bg-parchment-200/30'
                        ]" @click="activeTab = 'gallery'">
                            <Image class="w-4 h-4 mr-2 inline-block" />
                            Galeria
                        </button>

                        <button type="button" :class="[
                            'relative px-6 py-4 border-b-2 border-transparent transition-all duration-200 font-display whitespace-nowrap',
                            activeTab === 'members'
                                ? 'border-gold-400 bg-gold-400/10 text-medieval-700'
                                : 'text-medieval-500 hover:text-medieval-700 hover:bg-parchment-200/30'
                        ]" @click="activeTab = 'members'">
                            <UserCircle class="w-4 h-4 mr-2 inline-block" />
                            Membros
                        </button>
                    </div>
                </div>

                <!-- Tab Contents -->
                <div class="mt-0">
                    <CampaignOverviewTab v-if="activeTab === 'overview'" @navigate-to-tab="handleTabNavigation" />
                    <CampaignSessionsTab v-if="activeTab === 'sessions'" :is-g-m="isGM" />
                    <CampaignCharactersTab v-if="activeTab === 'characters'" :is-g-m="isGM" />
                    <CampaignTimelineTab v-if="activeTab === 'timeline'" />
                    <CampaignGalleryTab v-if="activeTab === 'gallery'" :is-g-m="isGM" />
                    <CampaignMembersTab v-if="activeTab === 'members'" :is-g-m="isGM" />
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped>
.gold-divider {
    width: 100px;
    height: 2px;
    background: linear-gradient(to right, transparent, #D4AF37, transparent);
    margin: 0 auto;
}
</style>