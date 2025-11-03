<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface Props {
    open: boolean
}

export interface CampaignFormData {
    title: string
    system: string
    description: string
    privacy: 'private' | 'public' | 'restricted'
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'createCampaign'])

const formData = ref<CampaignFormData>({
    title: '',
    system: '',
    description: '',
    privacy: 'private',
})

const isSubmitting = ref(false)

const closeModal = () => {
    emit('close')
}

const handleSubmit = async () => {
    if (!formData.value.title || !formData.value.system) {
        alert('Por favor, preencha todos os campos obrigatórios')
        return
    }
    isSubmitting.value = true

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    emit('createCampaign', { ...formData.value })
    // Reset form
    formData.value = {
        title: '',
        system: '',
        description: '',
        privacy: 'private',
    }

    isSubmitting.value = false
    closeModal()
}

// Handle escape key
watch(() => props.open, (isOpen) => {
    if (isOpen) {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        }
        document.addEventListener('keydown', handleEscape)

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }
})
</script>

<template>
    <Teleport to="body">
        <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="open" class="fixed inset-0 z-50 bg-black/50" @click="() => { closeModal(); }">
                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4">
                        <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition-all duration-200" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                            <div v-if="open" class="relative w-full max-w-[600px] bg-parchment-50 border border-medieval-300 rounded-lg shadow-xl" @click.stop="() => { }">
                                <!-- Header -->
                                <div class="p-6 border-b border-medieval-200">
                                    <button type="button" class="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity" @click="() => { closeModal(); }">
                                        <X class="h-4 w-4" />
                                        <span class="sr-only">Fechar</span>
                                    </button>
                                    <h2 class="font-display text-xl font-semibold text-medieval-800">
                                        Nova Campanha
                                    </h2>
                                    <p class="text-sm text-medieval-600 font-ui mt-1">
                                        Preencha os detalhes para criar uma nova campanha de RPG
                                    </p>
                                </div>

                                <!-- Form -->
                                <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
                                    <!-- Title -->
                                    <div class="space-y-2">
                                        <label for="title" class="block text-sm font-medium font-ui text-medieval-800">
                                            Título da Campanha *
                                        </label>
                                        <input id="title" v-model="formData.title" type="text" placeholder="Ex: A Torre do Mago Sombrio" class="w-full px-3 py-2 bg-white border border-medieval-200 rounded-md font-body focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" required />
                                    </div>

                                    <!-- System -->
                                    <div class="space-y-2">
                                        <label for="system" class="block text-sm font-medium font-ui text-medieval-800">
                                            Sistema de Jogo *
                                        </label>
                                        <select id="system" v-model="formData.system" class="w-full px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent" required>
                                            <option value="" disabled>Selecione o sistema</option>
                                            <option value="dnd5e">D&D 5ª Edição</option>
                                            <option value="pathfinder2e">Pathfinder 2e</option>
                                            <option value="callofcthulhu">Call of Cthulhu</option>
                                            <option value="vampiremasquerade">Vampiro: A Máscara</option>
                                            <option value="fate">Fate Core</option>
                                            <option value="pbta">Powered by the Apocalypse</option>
                                            <option value="other">Outro</option>
                                        </select>
                                    </div>

                                    <!-- Privacy -->
                                    <div class="space-y-2">
                                        <label for="privacy" class="block text-sm font-medium font-ui text-medieval-800">
                                            Privacidade
                                        </label>
                                        <select id="privacy" v-model="formData.privacy" class="w-full px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent">
                                            <option value="private">🔒 Privada (Apenas você)</option>
                                            <option value="restricted">🔗 Restrita (Com convite)</option>
                                            <option value="public">🌐 Pública (Todos podem ver)</option>
                                        </select>
                                    </div>

                                    <!-- Description -->
                                    <div class="space-y-2">
                                        <label for="description" class="block text-sm font-medium font-ui text-medieval-800">
                                            Descrição
                                        </label>
                                        <textarea id="description" v-model="formData.description" placeholder="Descreva sua campanha, enredo, cenário..." rows="5" class="w-full px-3 py-2 bg-white border border-medieval-200 rounded-md font-body min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-y" />
                                    </div>

                                    <!-- Actions -->
                                    <div class="flex justify-end gap-3 pt-4 border-t border-medieval-200">
                                        <button type="button" class="px-4 py-2 border border-medieval-300 text-medieval-700 rounded-md font-ui hover:bg-medieval-50 transition-colors" @click="() => { closeModal(); }">
                                            Cancelar
                                        </button>
                                        <button type="submit" :disabled="isSubmitting" class="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-md font-ui transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                            {{ isSubmitting ? 'Criando...' : 'Criar Campanha' }}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
</style>