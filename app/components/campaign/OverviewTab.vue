<template>
    <div class="space-y-6">
        <!-- Sobre a Campanha -->
        <div class="bg-parchment-50 border border-gold-400/30 shadow-md rounded-lg">
            <div class="p-6 border-b border-gold-400/20">
                <h3 class="font-display text-medieval-700 text-lg font-semibold flex items-center gap-2">
                    <Scroll class="w-5 h-5 text-gold-500" />
                    Sobre a Campanha
                </h3>
            </div>
            <div class="p-6 space-y-4">
                <div>
                    <p class="font-body text-medieval-500 leading-relaxed">
                        {{ isDescriptionOpen
                            ? "O reino de Valthoria está à beira do colapso. A antiga profecia dos Cinco Dragões começa a se manifestar enquanto forças das trevas se mobilizam nas fronteiras. Um grupo improvável de heróis deve encontrar as relíquias perdidas e reunir os reinos divididos antes que seja tarde demais. Em meio a intrigas políticas, batalhas épicas e escolhas morais impossíveis, o destino de todo o mundo conhecido repousa sobre seus ombros."
                            : "O reino de Valthoria está à beira do colapso. A antiga profecia dos Cinco Dragões começa a se manifestar enquanto forças das trevas se mobilizam nas fronteiras..."
                        }}
                    </p>
                    <button class="mt-2 p-0 h-auto text-gold-500 hover:text-gold-400 bg-transparent font-ui flex items-center" @click="isDescriptionOpen = !isDescriptionOpen">
                        {{ isDescriptionOpen ? 'Ver menos' : 'Ver mais' }}
                        <ChevronDown v-if="!isDescriptionOpen" class="w-4 h-4 ml-1" />
                        <ChevronUp v-else class="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gold-400/20">
                    <div class="flex items-center gap-2 text-medieval-500 font-ui">
                        <Calendar class="w-4 h-4 text-gold-500" />
                        <span>Início: 15 de Março, 2024</span>
                    </div>
                    <div class="flex items-center gap-2 text-medieval-500 font-ui">
                        <Swords class="w-4 h-4 text-gold-500" />
                        <span>Status: Em Andamento</span>
                    </div>
                    <div class="flex items-center gap-2 text-medieval-500 font-ui">
                        <Crown class="w-4 h-4 text-gold-500" />
                        <span>Mestre: Marcus Silva</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Última Sessão -->
        <div class="bg-parchment-50 border border-gold-400/30 shadow-md rounded-lg">
            <div class="p-6 border-b border-gold-400/20">
                <div class="flex items-center justify-between">
                    <h3 class="font-display text-medieval-700 text-lg font-semibold">Última Sessão</h3>
                    <span class="bg-success-500 text-white px-3 py-1 rounded-full text-sm font-ui">Concluída</span>
                </div>
                <p class="font-ui text-sm text-gray-500 mt-1">
                    Sessão #12 - O Covil do Dragão Vermelho
                </p>
            </div>
            <div class="p-6 space-y-4">
                <div class="flex flex-wrap gap-4 text-sm text-medieval-500 font-ui">
                    <div class="flex items-center gap-2">
                        <Calendar class="w-4 h-4 text-gold-500" />
                        28 de Outubro, 2024
                    </div>
                    <div class="flex items-center gap-2">
                        <Clock class="w-4 h-4 text-gold-500" />
                        4h 30min
                    </div>
                </div>

                <p class="font-body text-medieval-500 leading-relaxed">
                    Após semanas de preparação, o grupo finalmente adentrou o covil de Infernus, o Dragão Vermelho.
                    A batalha foi épica e devastadora. Thorne quase caiu em combate, mas foi salvo pelo sacrifício
                    heroico de Elara. No final, conseguiram derrotar a criatura ancestral e recuperar a segunda
                    relíquia: o Cetro de Chamas Eternas.
                </p>

                <div class="flex flex-wrap gap-2 pt-2">
                    <button class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui px-4 py-2 rounded-md flex items-center transition-colors">
                        Ver Detalhes Completos
                        <ArrowRight class="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Personagens Ativos -->
            <div class="bg-parchment-50 border border-gold-400/30 shadow-md rounded-lg">
                <div class="p-6 border-b border-gold-400/20">
                    <h3 class="font-display text-medieval-700 text-lg font-semibold flex items-center gap-2">
                        <Users class="w-5 h-5 text-gold-500" />
                        Personagens Ativos
                    </h3>
                </div>
                <div class="p-6">
                    <div class="space-y-3">
                        <div v-for="(char, idx) in characters" :key="idx" class="flex items-center gap-3 p-2 rounded-lg hover:bg-parchment-200/30 transition-colors cursor-pointer">
                            <div class="w-10 h-10 rounded-full bg-gold-400 border-2 border-gold-500 flex items-center justify-center text-medieval-700 font-display font-semibold">
                                {{ char.avatar }}
                            </div>
                            <div class="flex-1">
                                <p class="font-display text-medieval-700">{{ char.name }}</p>
                                <p class="text-sm text-medieval-500 font-ui">{{ char.class }} • Nível {{ char.level }}</p>
                            </div>
                            <span class="border border-success-500 text-success-500 px-3 py-1 rounded-full text-xs font-ui">
                                Ativo
                            </span>
                        </div>
                    </div>

                    <button @click="$emit('navigate-to-tab', 'characters')" class="w-full mt-4 text-gold-500 hover:text-gold-400 hover:bg-parchment-200/30 font-ui py-2 rounded-md flex items-center justify-center transition-colors">
                        Ver Todos os Personagens
                        <ArrowRight class="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>

            <!-- Estatísticas -->
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-parchment-50 border border-gold-400/30 shadow-md rounded-lg">
                        <div class="p-6 text-center">
                            <Scroll class="w-8 h-8 text-gold-500 mx-auto mb-2" />
                            <p class="text-3xl font-display text-medieval-700">12</p>
                            <p class="text-sm text-medieval-500 font-ui">Sessões</p>
                        </div>
                    </div>
                    <div class="bg-parchment-50 border border-gold-400/30 shadow-md rounded-lg">
                        <div class="p-6 text-center">
                            <Hourglass class="w-8 h-8 text-gold-500 mx-auto mb-2" />
                            <p class="text-3xl font-display text-medieval-700">48</p>
                            <p class="text-sm text-medieval-500 font-ui">Horas Jogadas</p>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-parchment-50 border border-gold-400/30 shadow-md rounded-lg">
                        <div class="p-6 text-center">
                            <Users class="w-8 h-8 text-gold-500 mx-auto mb-2" />
                            <p class="text-3xl font-display text-medieval-700">5</p>
                            <p class="text-sm text-medieval-500 font-ui">Jogadores</p>
                        </div>
                    </div>
                    <div class="bg-parchment-50 border border-gold-400/30 shadow-md rounded-lg">
                        <div class="p-6 text-center">
                            <Calendar class="w-8 h-8 text-gold-500 mx-auto mb-2" />
                            <p class="text-3xl font-display text-medieval-700">232</p>
                            <p class="text-sm text-medieval-500 font-ui">Dias Ativos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Membros -->
        <div class="bg-parchment-50 border border-gold-400/30 shadow-md rounded-lg">
            <div class="p-6 border-b border-gold-400/20">
                <h3 class="font-display text-medieval-700 text-lg font-semibold flex items-center gap-2">
                    <User class="w-5 h-5 text-gold-500" />
                    Membros da Campanha
                </h3>
            </div>
            <div class="p-6">
                <div class="flex flex-wrap gap-3">
                    <div v-for="(member, idx) in members" :key="idx" class="flex items-center gap-2 bg-parchment-200/40 rounded-lg px-3 py-2">
                        <div class="w-8 h-8 rounded-full bg-gold-400 border border-gold-500 flex items-center justify-center text-medieval-700 text-sm font-display font-semibold">
                            {{ member.avatar }}
                        </div>
                        <div>
                            <p class="text-sm font-display text-medieval-700">{{ member.name }}</p>
                            <p class="text-xs text-medieval-500 font-ui">{{ member.role }}</p>
                        </div>
                    </div>
                </div>

                <button @click="$emit('navigate-to-tab', 'members')" class="w-full mt-4 text-gold-500 hover:text-gold-400 hover:bg-parchment-200/30 font-ui py-2 rounded-md flex items-center justify-center transition-colors">
                    Ver Todos os Membros
                    <ArrowRight class="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    Scroll,
    Calendar,
    Swords,
    Crown,
    Clock,
    ArrowRight,
    Users,
    User,
    Hourglass,
    ChevronDown,
    ChevronUp
} from 'lucide-vue-next'

defineEmits<{
    'navigate-to-tab': [tabName: string]
}>()

const isDescriptionOpen = ref(false)

const characters = [
    { name: "Thorne Ironfist", class: "Guerreiro", level: 8, avatar: "TI", status: "active" },
    { name: "Elara Moonwhisper", class: "Clérigo", level: 8, avatar: "EM", status: "active" },
    { name: "Kael Shadowstep", class: "Ladino", level: 7, avatar: "KS", status: "active" },
    { name: "Zephyr Stormcaller", class: "Mago", level: 8, avatar: "ZS", status: "active" },
]

const members = [
    { name: "Marcus Silva", role: "Mestre", avatar: "MS" },
    { name: "Ana Costa", role: "Jogador", avatar: "AC" },
    { name: "Pedro Santos", role: "Jogador", avatar: "PS" },
    { name: "Julia Lima", role: "Jogador", avatar: "JL" },
    { name: "Carlos Oliveira", role: "Jogador", avatar: "CO" },
]
</script>
