<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
                <h2 class="font-display text-medieval-700 text-2xl mb-1">Membros da Campanha</h2>
                <p class="text-medieval-400 font-ui">
                    {{ members.length }} membros • 1 Mestre e {{ playerCount }} Jogadores
                </p>
            </div>
            <button v-if="isGM" class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui shadow-md px-4 py-2 rounded-md flex items-center transition-colors">
                <Icon name="lucide:user-plus" class="w-4 h-4 mr-2" />
                Convidar Membro
            </button>
        </div>

        <!-- Members List -->
        <div class="space-y-4">
            <div v-for="member in members" :key="member.id" class="parchment-texture border border-gold-400/30 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div class="p-6">
                    <div class="flex flex-col md:flex-row gap-6 items-start">
                        <!-- Avatar and Basic Info -->
                        <div class="flex items-center gap-4 flex-1 min-w-0">
                            <div class="w-16 h-16 rounded-full border-2 border-gold-500 bg-gold-400 flex items-center justify-center text-medieval-700 font-display text-xl font-semibold flex-shrink-0">
                                {{ member.avatar }}
                            </div>

                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-2 flex-wrap">
                                    <h3 class="font-display text-medieval-700 text-lg">{{ member.name }}</h3>
                                    <span :class="[
                                        'px-3 py-1 rounded-full text-xs font-ui flex items-center gap-1',
                                        member.role === 'gm'
                                            ? 'bg-gold-500 text-parchment-50'
                                            : 'bg-medieval-300 text-parchment-50'
                                    ]">
                                        <Icon :name="member.role === 'gm' ? 'lucide:crown' : 'lucide:user'" class="w-3 h-3" />
                                        {{ member.roleLabel }}
                                    </span>
                                </div>

                                <div class="flex items-center gap-2 text-sm text-medieval-400 font-ui mb-2">
                                    <Icon name="lucide:calendar" class="w-4 h-4 text-gold-500" />
                                    <span>Membro desde {{ member.joinDate }}</span>
                                </div>

                                <!-- Characters -->
                                <div v-if="member.characters.length > 0" class="flex items-start gap-2">
                                    <Icon name="lucide:users" class="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                                    <div class="flex-1">
                                        <p class="text-sm text-medieval-400 font-ui">
                                            <span class="font-medium">Personagens: </span>
                                            {{ member.characters.join(', ') }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Actions - Only GM -->
                        <div v-if="isGM && member.role !== 'gm'" class="flex items-center gap-2">
                            <select :value="member.role" class="w-[140px] px-3 py-2 bg-parchment-50 border border-gold-400/30 rounded-md font-ui text-sm focus:outline-none focus:ring-2 focus:ring-gold-400">
                                <option value="player">Jogador</option>
                                <option value="co-gm">Co-Mestre</option>
                                <option value="observer">Observador</option>
                            </select>

                            <div class="relative">
                                <button class="text-gold-500 hover:text-gold-400 hover:bg-parchment-200/30 p-2 rounded-md transition-colors" @click="toggleDropdown(member.id)">
                                    <Icon name="lucide:more-vertical" class="w-5 h-5" />
                                </button>

                                <!-- Dropdown Menu -->
                                <Transition name="dropdown">
                                    <div v-if="openDropdown === member.id" class="absolute right-0 mt-2 w-48 parchment-texture border border-gold-400/30 rounded-md shadow-lg z-10" @click.stop>
                                        <button class="w-full text-left px-4 py-2 text-sm font-ui text-medieval-700 hover:bg-parchment-200/50 transition-colors rounded-t-md" @click="closeDropdown">
                                            Ver Perfil
                                        </button>
                                        <button class="w-full text-left px-4 py-2 text-sm font-ui text-medieval-700 hover:bg-parchment-200/50 transition-colors" @click="closeDropdown">
                                            Enviar Mensagem
                                        </button>
                                        <button class="w-full text-left px-4 py-2 text-sm font-ui text-error-500 hover:bg-parchment-200/50 transition-colors rounded-b-md" @click="closeDropdown">
                                            Remover da Campanha
                                        </button>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- GM Info Card -->
        <div v-if="!isGM" class="parchment-texture border border-gold-400/30 rounded-lg shadow-md bg-parchment-200/20">
            <div class="p-6 text-center">
                <Icon name="lucide:crown" class="w-12 h-12 text-gold-500 mx-auto mb-3" />
                <h3 class="font-display text-medieval-700 mb-2 text-lg">Informações do Mestre</h3>
                <p class="text-medieval-400 font-ui mb-4">
                    Apenas o Mestre da campanha pode adicionar, remover ou alterar papéis dos membros.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Member {
    id: number
    name: string
    avatar: string
    role: string
    roleLabel: string
    joinDate: string
    characters: string[]
    status: string
}

interface MembersTabProps {
    isGM?: boolean
}

const props = withDefaults(defineProps<MembersTabProps>(), {
    isGM: true
})

const openDropdown = ref<number | null>(null)

const members: Member[] = [
    {
        id: 1,
        name: "Marcus Silva",
        avatar: "MS",
        role: "gm",
        roleLabel: "Mestre",
        joinDate: "15 de Março, 2024",
        characters: [],
        status: "active"
    },
    {
        id: 2,
        name: "Ana Costa",
        avatar: "AC",
        role: "player",
        roleLabel: "Jogador",
        joinDate: "15 de Março, 2024",
        characters: ["Elara Moonwhisper", "Grimnar Bloodaxe (aposentado)"],
        status: "active"
    },
    {
        id: 3,
        name: "Pedro Santos",
        avatar: "PS",
        role: "player",
        roleLabel: "Jogador",
        joinDate: "15 de Março, 2024",
        characters: ["Thorne Ironfist"],
        status: "active"
    },
    {
        id: 4,
        name: "Julia Lima",
        avatar: "JL",
        role: "player",
        roleLabel: "Jogador",
        joinDate: "15 de Março, 2024",
        characters: ["Kael Shadowstep"],
        status: "active"
    },
    {
        id: 5,
        name: "Carlos Oliveira",
        avatar: "CO",
        role: "player",
        roleLabel: "Jogador",
        joinDate: "15 de Março, 2024",
        characters: ["Zephyr Stormcaller"],
        status: "active"
    }
]

const playerCount = computed(() => members.filter(m => m.role === 'player').length)

const toggleDropdown = (id: number) => {
    openDropdown.value = openDropdown.value === id ? null : id
}

const closeDropdown = () => {
    openDropdown.value = null
}

// Close dropdown when clicking outside
onMounted(() => {
    document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.parchment-texture {
    @apply bg-parchment-50
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>