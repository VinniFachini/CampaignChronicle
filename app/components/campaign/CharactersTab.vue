<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
                <h2 class="font-display text-medieval-700 text-2xl mb-1">Personagens da Campanha</h2>
                <p class="text-medieval-400 font-ui">
                    {{ activeCount }} ativos, {{ retiredCount }} aposentados
                </p>
            </div>
            <div class="flex gap-2">
                <select v-model="filterStatus" class="w-[180px] px-4 py-2 bg-white border border-gold-400/30 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-400">
                    <option value="all">Todos</option>
                    <option value="active">Ativos</option>
                    <option value="retired">Aposentados</option>
                    <option value="deceased">Falecidos</option>
                </select>
                <button v-if="!isGM" class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui shadow-md px-4 py-2 rounded-md flex items-center transition-colors">
                    <Icon name="lucide:plus" class="w-4 h-4 mr-2" />
                    Novo Personagem
                </button>
            </div>
        </div>

        <!-- Characters Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="character in filteredCharacters" :key="character.id" class="parchment-texture border border-gold-400/30 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer group" @click="openCharacterModal(character)">
                <!-- Card Header -->
                <div class="text-center p-6 pb-3">
                    <div class="w-24 h-24 mx-auto mb-3 rounded-full border-4 border-gold-500 group-hover:border-gold-400 transition-colors bg-gold-400 flex items-center justify-center text-medieval-700 font-display text-2xl font-semibold">
                        {{ character.avatar }}
                    </div>
                    <h3 class="font-display text-medieval-700 text-lg font-semibold">
                        {{ character.name }}
                    </h3>
                    <div class="flex items-center justify-center gap-2 text-sm text-medieval-400 font-ui mt-1">
                        <span>{{ character.race }}</span>
                        <span>•</span>
                        <span>{{ character.class }}</span>
                    </div>
                </div>

                <!-- Card Content -->
                <div class="p-6 pt-3 space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="border border-gold-500 text-gold-500 px-3 py-1 rounded-full text-xs font-ui">
                            Nível {{ character.level }}
                        </span>
                        <span :class="[
                            'px-3 py-1 rounded-full text-xs font-ui',
                            character.status === 'active'
                                ? 'bg-success-500 text-white'
                                : 'bg-medieval-400 text-white'
                        ]">
                            {{ character.status === 'active' ? 'Ativo' : 'Aposentado' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-medieval-400 font-ui">
                        <Icon name="lucide:user" class="w-4 h-4 text-gold-500" />
                        <span>Jogador: {{ character.player }}</span>
                    </div>
                    <p class="text-sm text-medieval-500 font-body line-clamp-2">
                        {{ character.background }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Character Detail Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="selectedCharacter" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeCharacterModal">
                    <div class="max-w-2xl w-full max-h-[80vh] overflow-y-auto parchment-texture border-2 border-gold-400 rounded-lg shadow-medieval">
                        <!-- Modal Header -->
                        <div class="p-6 border-b border-gold-400/20">
                            <div class="flex items-start gap-4 mb-4">
                                <div class="w-20 h-20 rounded-full border-4 border-gold-500 bg-gold-400 flex items-center justify-center text-medieval-700 font-display text-xl font-semibold flex-shrink-0">
                                    {{ selectedCharacter.avatar }}
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-start justify-between">
                                        <h3 class="font-display text-medieval-700 text-xl font-semibold mb-2">
                                            {{ selectedCharacter.name }}
                                        </h3>
                                        <button class="text-medieval-400 hover:text-medieval-700 transition-colors" @click="closeCharacterModal">
                                            <Icon name="lucide:x" class="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="border border-gold-500 text-gold-500 px-3 py-1 rounded-full text-xs font-ui">
                                            {{ selectedCharacter.race }} {{ selectedCharacter.class }}
                                        </span>
                                        <span class="border border-gold-500 text-gold-500 px-3 py-1 rounded-full text-xs font-ui">
                                            Nível {{ selectedCharacter.level }}
                                        </span>
                                        <span :class="[
                                            'px-3 py-1 rounded-full text-xs font-ui',
                                            selectedCharacter.status === 'active'
                                                ? 'bg-success-500 text-white'
                                                : 'bg-medieval-400 text-white'
                                        ]">
                                            {{ selectedCharacter.status === 'active' ? 'Ativo' : 'Aposentado' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Content -->
                        <div class="p-6 space-y-6">
                            <!-- Background -->
                            <div>
                                <h4 class="font-display text-medieval-700 mb-2 flex items-center gap-2">
                                    <Icon name="lucide:swords" class="w-4 h-4 text-gold-500" />
                                    Antecedentes
                                </h4>
                                <p class="text-medieval-400 font-ui">{{ selectedCharacter.background }}</p>
                            </div>

                            <!-- Story -->
                            <div>
                                <h4 class="font-display text-medieval-700 mb-2">História</h4>
                                <p class="text-medieval-500 font-body leading-relaxed">{{ selectedCharacter.story }}</p>
                            </div>

                            <!-- Player -->
                            <div>
                                <h4 class="font-display text-medieval-700 mb-2 flex items-center gap-2">
                                    <Icon name="lucide:user" class="w-4 h-4 text-gold-500" />
                                    Jogador
                                </h4>
                                <p class="text-medieval-400 font-ui">{{ selectedCharacter.player }}</p>
                            </div>

                            <!-- Relationships -->
                            <div v-if="selectedCharacter.relationships.length > 0">
                                <h4 class="font-display text-medieval-700 mb-3">Relacionamentos</h4>
                                <div class="space-y-2">
                                    <div v-for="(rel, idx) in selectedCharacter.relationships" :key="idx" class="flex items-center justify-between p-3 bg-parchment-200/40 rounded-lg">
                                        <span class="font-display text-medieval-700">{{ rel.name }}</span>
                                        <span class="border border-gold-400 text-medieval-400 px-3 py-1 rounded-full text-xs font-ui">
                                            {{ rel.type }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div v-if="isGM" class="flex gap-2 pt-4 border-t border-gold-400/20">
                                <button class="bg-gold-400 hover:bg-gold-500 text-medieval-700 font-ui px-4 py-2 rounded-md flex items-center transition-colors">
                                    <Icon name="lucide:edit" class="w-4 h-4 mr-2" />
                                    Editar Personagem
                                </button>
                                <button v-if="selectedCharacter.status === 'active'" class="border border-gold-400 text-gold-500 hover:bg-gold-400/20 font-ui px-4 py-2 rounded-md flex items-center transition-colors">
                                    <Icon name="lucide:archive" class="w-4 h-4 mr-2" />
                                    Aposentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
interface Character {
    id: number
    name: string
    player: string
    race: string
    class: string
    level: number
    status: string
    avatar: string
    background: string
    story: string
    relationships: Array<{ name: string; type: string }>
}

interface CharactersTabProps {
    isGM?: boolean
}

const props = withDefaults(defineProps<CharactersTabProps>(), {
    isGM: false,
})

const filterStatus = ref('all')
const selectedCharacter = ref<Character | null>(null)

const characters: Character[] = [
    {
        id: 1,
        name: "Thorne Ironfist",
        player: "Pedro Santos",
        race: "Anão",
        class: "Guerreiro",
        level: 8,
        status: "active",
        avatar: "TI",
        background: "Soldado veterano das Guerras do Norte",
        story: "Thorne lutou por décadas nas Guerras do Norte, defendendo seu clã contra invasores. Após perder sua família em um ataque traiçoeiro, jurou vingança e partiu em busca dos responsáveis. Sua jornada o levou a cruzar caminhos com o grupo atual.",
        relationships: [
            { name: "Elara", type: "Aliado de confiança" },
            { name: "Kael", type: "Rivalidade amigável" }
        ]
    },
    {
        id: 2,
        name: "Elara Moonwhisper",
        player: "Ana Costa",
        race: "Elfa",
        class: "Clérigo",
        level: 8,
        status: "active",
        avatar: "EM",
        background: "Sacerdotisa da Deusa da Lua",
        story: "Elara nasceu sob um eclipse lunar, considerado um presságio em sua ordem. Treinada desde jovem nos mistérios da Deusa da Lua, ela recebeu visões proféticas sobre a ameaça que se aproxima e deixou seu templo para impedi-la.",
        relationships: [
            { name: "Thorne", type: "Protegido" },
            { name: "Zephyr", type: "Mentor espiritual" }
        ]
    },
    {
        id: 3,
        name: "Kael Shadowstep",
        player: "Julia Lima",
        race: "Meio-Elfo",
        class: "Ladino",
        level: 7,
        status: "active",
        avatar: "KS",
        background: "Ex-membro de guilda de ladrões",
        story: "Cresceu nas ruas de Silverhaven, sobrevivendo através de pequenos furtos e truques. Foi recrutado pela Guilda das Sombras ainda jovem, mas eventualmente descobriu que a guilda estava envolvida em conspirações mais sombrias do que imaginava.",
        relationships: [
            { name: "Thorne", type: "Respeito mútuo" },
            { name: "Zephyr", type: "Parceiro de estratégia" }
        ]
    },
    {
        id: 4,
        name: "Zephyr Stormcaller",
        player: "Carlos Oliveira",
        race: "Humano",
        class: "Mago",
        level: 8,
        status: "active",
        avatar: "ZS",
        background: "Estudioso da Academia Arcana",
        story: "Zephyr sempre foi fascinado pelos mistérios do cosmos e pela natureza da magia. Seus estudos na Academia Arcana o levaram a descobrir referências antigas sobre os Cinco Dragões, iniciando sua busca pela verdade por trás das lendas.",
        relationships: [
            { name: "Elara", type: "Aprendiz" },
            { name: "Kael", type: "Aliado tático" }
        ]
    },
    {
        id: 5,
        name: "Grimnar Bloodaxe",
        player: "Ana Costa",
        race: "Meio-Orc",
        class: "Bárbaro",
        level: 6,
        status: "retired",
        avatar: "GB",
        background: "Guerreiro tribal",
        story: "Grimnar serviu o grupo nas primeiras missões, mas decidiu retornar para sua tribo quando seu líder faleceu, assumindo o manto de chefe tribal.",
        relationships: []
    }
]

const filteredCharacters = computed(() => {
    if (filterStatus.value === 'all') return characters
    return characters.filter(char => char.status === filterStatus.value)
})

const activeCount = computed(() => characters.filter(c => c.status === 'active').length)
const retiredCount = computed(() => characters.filter(c => c.status === 'retired').length)

const openCharacterModal = (character: Character) => {
    selectedCharacter.value = character
    document.body.style.overflow = 'hidden'
}

const closeCharacterModal = () => {
    selectedCharacter.value = null
    document.body.style.overflow = ''
}

// Cleanup on unmount
onUnmounted(() => {
    document.body.style.overflow = ''
})
</script>

<style scoped>
.parchment-texture {
    @apply bg-parchment-50
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .parchment-texture,
.modal-leave-active .parchment-texture {
    transition: transform 0.3s ease;
}

.modal-enter-from .parchment-texture,
.modal-leave-to .parchment-texture {
    transform: scale(0.9);
}
</style>