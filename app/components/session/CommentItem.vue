<template>
    <div :class="['mb-4', isReply && 'ml-12 mt-3']">
        <div class="flex gap-3">
            <div class="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-medieval-700 font-display font-semibold flex-shrink-0">
                {{ (comment.asCharacter?.name || comment.author.name).charAt(0) }}
            </div>

            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <span class="text-medieval-800 font-ui font-medium">
                        {{ comment.asCharacter?.name || comment.author.name }}
                    </span>
                    <span v-if="comment.asCharacter" class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md border border-medieval-300 bg-white font-ui">
                        🎭 Roleplay
                    </span>
                    <span class="text-xs text-medieval-500 font-ui">
                        {{ timeAgo }}
                    </span>
                </div>

                <!-- Editing Mode -->
                <div v-if="isEditing" class="space-y-2">
                    <textarea :value="editContent" @input="$emit('update:editContent', ($event.target as HTMLTextAreaElement).value)" class="w-full min-h-[80px] px-3 py-2 border border-medieval-200 rounded-md font-body focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none" />
                    <div class="flex gap-2">
                        <button @click="$emit('save-edit', comment.id)" class="px-3 py-1.5 bg-gold-500 hover:bg-gold-600 text-white rounded-md font-ui text-sm transition-colors">
                            Salvar
                        </button>
                        <button @click="$emit('cancel-edit')" class="px-3 py-1.5 border border-medieval-300 text-medieval-700 hover:bg-medieval-100 rounded-md font-ui text-sm transition-colors">
                            Cancelar
                        </button>
                    </div>
                </div>

                <!-- Display Mode -->
                <template v-else>
                    <p class="text-medieval-700 font-body mb-2">{{ comment.content }}</p>

                    <div class="flex items-center gap-3 flex-wrap">
                        <!-- Reactions -->
                        <button v-for="[emoji, count] in Object.entries(comment.reactions)" :key="emoji" @click="$emit('react', emoji)" class="flex items-center gap-1 text-sm hover:bg-parchment-100 rounded px-2 py-1 transition-colors font-ui">
                            <span>{{ emoji }}</span>
                            <span class="text-medieval-600">{{ count }}</span>
                        </button>

                        <!-- Reply Button (only for top-level comments) -->
                        <button v-if="!isReply" class="text-sm text-medieval-600 hover:text-gold-600 transition-colors font-ui">
                            Responder
                        </button>

                        <!-- Actions Menu -->
                        <div v-if="comment.canEdit" class="relative" ref="dropdownRef">
                            <button @click="toggleDropdown" class="p-1 hover:bg-medieval-100 rounded transition-colors">
                                <MoreVertical class="w-4 h-4 text-medieval-600" />
                            </button>

                            <Transition name="dropdown">
                                <div v-if="showDropdown" class="absolute right-0 mt-1 w-40 bg-white border border-medieval-200 rounded-md shadow-lg z-10" @click.stop>
                                    <button @click="handleEditClick" class="w-full flex items-center gap-2 px-4 py-2 text-sm text-medieval-700 hover:bg-medieval-50 transition-colors font-ui">
                                        <Edit2 class="w-4 h-4" />
                                        Editar
                                    </button>
                                    <button @click="handleDeleteClick" class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-ui">
                                        <Trash2 class="w-4 h-4" />
                                        Excluir
                                    </button>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </template>

                <!-- Replies -->
                <div v-if="replies.length > 0 && !isReply" class="mt-3">
                    <CommentItem v-for="reply in replies" :key="reply.id" :comment="reply" :replies="[]" :editing-id="editingId" :edit-content="editContent" :is-reply="true" @edit="$emit('edit', $event)" @save-edit="$emit('save-edit', $event)" @cancel-edit="$emit('cancel-edit')" @delete="$emit('delete', $event)" @react="$emit('react', $event)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { MoreVertical, Edit2, Trash2 } from 'lucide-vue-next'

interface Props {
    comment: any
    replies: any[]
    editingId: string | null
    editContent: string
    isReply?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isReply: false
})

const emit = defineEmits<{
    edit: [comment: Comment]
    'save-edit': [id: string]
    'cancel-edit': []
    delete: [id: string]
    react: [emoji: string]
    'update:editContent': [content: string]
}>()

const showDropdown = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const isEditing = computed(() => props.editingId === props.comment.id)

// Function to format time ago without date-fns
const formatTimeAgo = (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
        return 'agora mesmo'
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
        return `há ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
        return `há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
        return `há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`
    }

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) {
        return `há ${diffInWeeks} ${diffInWeeks === 1 ? 'semana' : 'semanas'}`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
        return `há ${diffInMonths} ${diffInMonths === 1 ? 'mês' : 'meses'}`
    }

    const diffInYears = Math.floor(diffInDays / 365)
    return `há ${diffInYears} ${diffInYears === 1 ? 'ano' : 'anos'}`
}

const timeAgo = computed(() => {
    return formatTimeAgo(props.comment.timestamp)
})

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const handleEditClick = () => {
    emit('edit', props.comment)
    showDropdown.value = false
}

const handleDeleteClick = () => {
    emit('delete', props.comment.id)
    showDropdown.value = false
}

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        showDropdown.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>