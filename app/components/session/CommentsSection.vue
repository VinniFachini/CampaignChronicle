<template>
    <div class="mt-8">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl text-medieval-800 font-display flex items-center gap-2 m-0">
                <MessageSquare class="w-6 h-6 text-gold-500" />
                Comentários ({{ comments.length }})
            </h2>
            <select v-model="sortBy" class="w-[180px] px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500">
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
            </select>
        </div>

        <!-- New Comment Form -->
        <div class="parchment-bg paper-shadow rounded-lg p-4 mb-6">
            <div class="flex gap-3">
                <div class="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-medieval-700 font-display font-semibold flex-shrink-0">
                    U
                </div>
                <div class="flex-1 space-y-3">
                    <textarea v-model="newComment" placeholder="Adicione um comentário..." class="w-full min-h-[100px] px-3 py-2 border border-medieval-200 rounded-md font-body focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none" />

                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <input id="as-character" v-model="asCharacter" type="checkbox" class="w-4 h-4 text-gold-500 border-medieval-300 rounded focus:ring-gold-500" />
                                <label for="as-character" class="font-ui text-sm text-medieval-700 cursor-pointer">
                                    Comentar como personagem
                                </label>
                            </div>

                            <select v-if="asCharacter" v-model="selectedCharacterId" class="w-[200px] px-3 py-2 bg-white border border-medieval-200 rounded-md font-ui text-sm focus:outline-none focus:ring-2 focus:ring-gold-500">
                                <option value="">Selecione...</option>
                                <option v-for="char in characters" :key="char.id" :value="char.id">
                                    {{ char.name }}
                                </option>
                            </select>
                        </div>

                        <button @click="handleSubmit" class="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-md font-ui transition-colors">
                            <Send class="w-4 h-4" />
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Comments List -->
        <div class="space-y-4">
            <div v-if="sortedComments.length === 0" class="text-center py-12 parchment-bg paper-shadow rounded-lg">
                <MessageSquare class="w-12 h-12 text-medieval-300 mx-auto mb-3" />
                <p class="text-medieval-600 font-ui">
                    Seja o primeiro a comentar!
                </p>
            </div>

            <template v-else>
                <SessionCommentItem v-for="comment in sortedComments" :key="comment.id" :comment="comment" :replies="getReplies(comment.id)" :editing-id="editingId" :edit-content="editContent" @edit="handleEdit" @save-edit="handleSaveEdit" @cancel-edit="handleCancelEdit" @delete="handleDelete" @react="(emoji: any) => $emit('react', comment.id, emoji)" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MessageSquare, Send } from 'lucide-vue-next'

interface Props {
    comments: any[]
    characters: any[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'add-comment': [content: string, asCharacter?: any]
    'edit-comment': [id: string, content: string]
    'delete-comment': [id: string]
    react: [id: string, emoji: string]
}>()

const newComment = ref('')
const asCharacter = ref(false)
const selectedCharacterId = ref('')
const editingId = ref<string | null>(null)
const editContent = ref('')
const sortBy = ref<'newest' | 'oldest'>('newest')

const topLevelComments = computed(() => props.comments.filter(c => !c.parentId))

const sortedComments = computed(() => {
    return [...topLevelComments.value].sort((a, b) => {
        return sortBy.value === 'newest'
            ? b.timestamp.getTime() - a.timestamp.getTime()
            : a.timestamp.getTime() - b.timestamp.getTime()
    })
})

const selectedCharacter = computed(() => {
    return props.characters.find(c => c.id === selectedCharacterId.value)
})

const getReplies = (commentId: string) => {
    return props.comments.filter(c => c.parentId === commentId)
}

const handleSubmit = () => {
    if (newComment.value.trim()) {
        emit(
            'add-comment',
            newComment.value,
            asCharacter.value && selectedCharacter.value ? selectedCharacter.value : undefined
        )
        newComment.value = ''
        selectedCharacterId.value = ''
        asCharacter.value = false
    }
}

const handleEdit = (comment: any) => {
    editingId.value = comment.id
    editContent.value = comment.content
}

const handleSaveEdit = (id: string) => {
    if (editContent.value.trim()) {
        emit('edit-comment', id, editContent.value)
        editingId.value = null
        editContent.value = ''
    }
}

const handleCancelEdit = () => {
    editingId.value = null
    editContent.value = ''
}

const handleDelete = (id: string) => {
    if (confirm('Deseja excluir este comentário?')) {
        emit('delete-comment', id)
    }
}
</script>

<style scoped>
.parchment-bg {
    background-color: #FAF7F0;
}

.paper-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>