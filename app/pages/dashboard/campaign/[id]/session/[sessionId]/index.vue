<template>
    <CampaignHeader :notification-count="5" />
    <NuxtLayout name="dashboard-layout" class="min-h-screen relative">
        <SessionScrollProgress />
        <SessionBackToTop />

        <div class="max-w-[1400px] mx-auto px-4 py-8">
            <!-- Draft Banner -->
            <div v-if="session.status === 'draft'" class="mb-6 bg-parchment-200 border border-parchment-400 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle class="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p class="text-yellow-800 font-ui text-sm">
                    Esta é uma prévia não publicada. Apenas o Mestre pode visualizar.
                </p>
            </div>

            <SessionHeader :session="session" />

            <SessionNavigation :previous-session="{ id: 11, title: 'A Taverna de Greenhollow' }" :next-session="{ id: 13, title: 'O Caminho das Sombras' }" @index-click="handleIndexClick" />

            <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                <!-- Main Content -->
                <div class="max-w-[800px]">
                    <div class="bg-parchment-50 shadow-parchment rounded-lg p-8">
                        <div id="narrative">
                            <SessionNarrativeContent :content="session.narrative" :images="session.images" :use-drop-cap="true" />
                        </div>

                        <div id="events" class="mt-12">
                            <SessionMarkedEvents :events="session.events" />
                        </div>

                        <div id="comments" class="mt-12">
                            <SessionCommentsSection :comments="comments" :characters="session.characters" @add-comment="handleAddComment" @edit-comment="handleEditComment" @delete-comment="handleDeleteComment" @react="handleReact" />
                        </div>
                    </div>
                </div>

                <!-- Sidebar - Desktop -->
                <aside class="hidden lg:block">
                    <div class="sticky top-24">
                        <SessionSidebar :session="session" :related-sessions="relatedSessions" @section-click="handleSectionClick" />
                    </div>
                </aside>
            </div>

            <!-- Sidebar - Mobile (stacked at bottom) -->
            <div class="lg:hidden mt-8">
                <SessionSidebar :session="session" :related-sessions="relatedSessions" @section-click="handleSectionClick" />
            </div>
        </div>

        <!-- Mobile Bottom Navigation -->
        <div class="lg:hidden fixed bottom-0 left-0 right-0 parchment-bg border-t-2 border-medieval-300 p-3 z-40">
            <div class="flex items-center justify-center gap-2 max-w-md mx-auto">
                <SessionNavigation :previous-session="{ id: 11, title: 'A Taverna de Greenhollow' }" :next-session="{ id: 13, title: 'O Caminho das Sombras' }" @index-click="handleIndexClick" />
            </div>
        </div>

        <!-- Add padding for mobile bottom nav -->
        <div class="h-20 lg:hidden" />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { AlertCircle } from 'lucide-vue-next'

// Mock data - replace with actual API calls
const mockSession: any = {
    id: 12,
    campaignId: 'dragons-curse',
    campaignName: 'A Maldição do Dragão Ancestral',
    title: 'O Encontro nas Ruínas de Thornhaven',
    date: new Date('2025-10-28'),
    duration: 240,
    gameMaster: 'Mestre Aldric',
    status: 'published',
    events: [
        {
            id: '1',
            type: 'roleplay',
            title: 'Negociação com a Sacerdotisa',
            description: 'Os heróis convenceram Elara a revelar a localização do artefato',
        },
        {
            id: '2',
            type: 'combat',
            title: 'Emboscada dos Cultistas',
            description: 'Combate épico contra 8 cultistas e um invocador sombrio',
        },
        {
            id: '3',
            type: 'discovery',
            title: 'O Fragmento de Cristal',
            description: 'Descoberta da primeira peça do Coração do Dragão',
        },
        {
            id: '4',
            type: 'death',
            title: 'Sacrifício de Gundrak',
            description: 'O guerreiro anão deu sua vida para proteger o grupo',
        },
    ],
    narrative: `# O Amanhecer Cinzento

A névoa espessa cobria as ruínas de **Thornhaven** quando os heróis finalmente avistaram os arcos quebrados do antigo templo. O silêncio era perturbador - nem mesmo os corvos ousavam pousar naquelas pedras amaldiçoadas.

Elara, a sacerdotisa errante que haviam encontrado na taverna de Greenhollow, finalmente revelou o verdadeiro propósito de sua busca. Com lágrimas nos olhos, ela confessou que o *Coração do Dragão* não era apenas um artefato de poder, mas a única esperança de salvar sua irmã da maldição que a prendia entre a vida e a morte.

## A Escolha de Kael

"*Todos nós carregamos fardos*", disse Kael, o paladino, colocando sua mão no ombro da sacerdotisa. "*Mas juntos, eles pesam menos.*" A decisão foi unânime - ajudariam Elara, mesmo que isso significasse enfrentar os perigos desconhecidos que aguardavam nas profundezas do templo.

Ao adentrarem pelas portas arruinadas, uma presença maligna se fez sentir. Sombras dançavam nas paredes, e sussurros em línguas esquecidas ecoavam pelos corredores. Foi então que os cultistas emergiram das trevas.

## A Batalha nas Sombras

O combate foi brutal. Os cultistas, marcados com runas de sangue, invocaram tentáculos de escuridão que agarravam e sufocavam. O invocador sombrio, uma figura encapuzada que flutuava acima do chão, canalizava energia necromântica com maestria terrível.

Gundrak, o valente anão guerreiro, segurou a linha de frente com sua machado de batalha ancestral. "*Por Moradin e pelos clãs caídos!*" - seu grito de guerra ressoou pelas ruínas enquanto ele derrubava cultista após cultista.

Mas o invocador tinha um último truque. Com um grito gutural, ele começou a canalizar um ritual que faria o teto desabar sobre todos. Gundrak, percebendo o perigo, tomou a decisão final.

## O Sacrifício do Herói

"*Vão! Eu seguro eles!*" - foram suas últimas palavras antes de carregar contra o invocador, seus olhos brilhando com determinação inabalável. A explosão resultante destruiu o invocador, mas também levou Gundrak consigo.

Enquanto o grupo escapava pelas passagens desmoronando, Kael carregou o corpo do anão. Não deixariam seu companheiro para trás.

Nas câmaras mais profundas, entre escombros e esqueletos antigos, encontraram o primeiro fragmento - um cristal pulsante de energia dracônica. A jornada estava apenas começando, mas o custo já havia sido alto demais.

*"Que sua alma encontre paz nos Salões dos Ancestrais, Gundrak Forja-Martelo. Seu sacrifício nunca será esquecido."* - Elara, ao realizar os ritos funerários.`,
    images: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
        'https://images.unsplash.com/photo-1516978101789-720eacb59e79?w=800',
    ],
    characters: [
        {
            id: '1',
            name: 'Kael Luminablade',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kael',
            class: 'Paladino',
        },
        {
            id: '2',
            name: 'Zephyr',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zephyr',
            class: 'Mago',
        },
        {
            id: '3',
            name: 'Lyra Shadowstep',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lyra',
            class: 'Ladina',
        },
        {
            id: '4',
            name: 'Gundrak Forja-Martelo',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gundrak',
            class: 'Guerreiro (†)',
        },
    ],
    views: 1247,
    likes: 89,
    commentCount: 23,
};

const mockComments: any[] = [
    {
        id: '1',
        author: {
            id: '1',
            name: 'Pedro Santos',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
        },
        content: 'Essa sessão foi incrível! A batalha contra o dragão foi épica!',
        timestamp: new Date('2024-10-28T20:30:00'),
        reactions: { '🔥': 3, '⚔️': 2 },
        canEdit: false,
    },
    {
        id: '2',
        author: {
            id: '2',
            name: 'Ana Costa',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
        },
        asCharacter: { id: '2', name: 'Elara Moonwhisper', avatar: 'EM' },
        content: 'Elara não hesitaria em sacrificar tudo por seus companheiros. A Deusa guiou minha mão.',
        timestamp: new Date('2024-10-28T21:00:00'),
        reactions: { '✨': 5, '🙏': 3 },
        canEdit: false,
    },
]

const relatedSessions = [
    { id: 11, title: 'A Taverna de Greenhollow', date: '14 de Outubro, 2024' },
    { id: 10, title: 'O Mapa Ancestral', date: '30 de Setembro, 2024' },
]

// State
const session = ref<any>(mockSession)
const comments = ref<any[]>(mockComments)

// Keyboard shortcuts
const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
        console.log('Navigate to previous session')
        // navigateTo('/campaign/session/11')
    } else if (e.key === 'ArrowRight') {
        console.log('Navigate to next session')
        // navigateTo('/campaign/session/13')
    } else if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// Handlers
const handleAddComment = (content: string, asCharacter?: any) => {
    const newComment: any = {
        id: String(Date.now()),
        author: {
            id: 'current-user',
            name: 'Você',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
        },
        asCharacter,
        content,
        timestamp: new Date(),
        reactions: {},
        canEdit: true,
    }
    comments.value = [newComment, ...comments.value]
}

const handleEditComment = (id: string, content: string) => {
    comments.value = comments.value.map((c: any) =>
        c.id === id ? { ...c, content } : c
    )
}

const handleDeleteComment = (id: string) => {
    comments.value = comments.value.filter(
        (c: any) => c.id !== id && c.parentId !== id
    )
}

const handleReact = (id: string, emoji: string) => {
    comments.value = comments.value.map((c: any) => {
        if (c.id === id) {
            const reactions = { ...c.reactions }
            reactions[emoji] = (reactions[emoji] || 0) + 1
            return { ...c, reactions }
        }
        return c
    })
}

const handleSectionClick = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

const handleIndexClick = () => {
    console.log('Navigate to index')
    // navigateTo('/campaign/sessions')
}

// Lifecycle
onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
.parchment-bg {
    background-color: #FAF7F0;
}

.paper-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>