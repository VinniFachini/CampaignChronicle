<template>
    <SessionEditorHeader :session-number="sessionData.sessionNumber" :status="sessionData.status" :auto-save-status="autoSaveStatus" :last-saved="lastSaved" @cancel="handleCancel" @save-draft="handleSaveDraft" @publish="handlePublish" :is-publishing="isPublishing" />
    <NuxtLayout name="dashboard-layout" class="min-h-screen">

        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-6">
                    <SessionBasicInfoSection :session-number="sessionData.sessionNumber" :title="sessionData.title" :date="sessionData.date" :duration-hours="sessionData.durationHours" :duration-minutes="sessionData.durationMinutes" :session-status="sessionData.sessionStatus" @update:title="updateSessionData('title', $event)" @update:date="updateSessionData('date', $event)" @update:duration-hours="updateSessionData('durationHours', $event)" @update:duration-minutes="updateSessionData('durationMinutes', $event)" @update:session-status="updateSessionData('sessionStatus', $event)" />

                    <SessionRichTextEditor :content="sessionData.content" @update:content="updateSessionData('content', $event)" />

                    <SessionEventsList :events="sessionData.events" @update:events="updateSessionData('events', $event)" />

                    <SessionImageGallery :images="sessionData.images" @update:images="updateSessionData('images', $event)" />

                    <SessionPriveteNotes :notes="sessionData.privateNotes" @update:notes="updateSessionData('privateNotes', $event)" />
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <div class="sticky top-24">
                        <SessionEditorSidebar :session-number="sessionData.sessionNumber" :title="sessionData.title" :date="sessionData.date" :events-count="sessionData.events.length" @preview="handlePreview" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Preview Modal -->
        <SessionPreviewModal v-model:open="showPreview" :session-number="sessionData.sessionNumber" :title="sessionData.title" :date="sessionData.date" :duration-hours="sessionData.durationHours" :duration-minutes="sessionData.durationMinutes" :content="sessionData.content" :events="sessionData.events" :images="sessionData.images" />

        <!-- Cancel Confirmation Dialog -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="showCancelDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="showCancelDialog = false">
                    <div class="max-w-md w-full bg-parchment-100 rounded-lg shadow-xl p-6">
                        <h3 class="font-display text-xl text-medieval-800 mb-2">
                            Descartar alterações?
                        </h3>
                        <p class="font-ui text-medieval-600 mb-6">
                            Você tem alterações não salvas. Tem certeza que deseja sair sem salvar?
                        </p>
                        <div class="flex gap-3 justify-end">
                            <button @click="showCancelDialog = false" class="px-4 py-2 border border-medieval-300 text-medieval-700 hover:bg-medieval-100 rounded-md font-ui transition-colors">
                                Continuar editando
                            </button>
                            <button @click="handleDiscardChanges" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-ui transition-colors">
                                Descartar
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>

        <!-- Toast Notifications -->
        <div v-if="toast.show" class="fixed bottom-4 right-4 z-50 max-w-sm">
            <Transition name="toast">
                <div :class="[
                    'px-4 py-3 rounded-lg shadow-lg font-ui',
                    toast.type === 'success' && 'bg-green-500 text-white',
                    toast.type === 'error' && 'bg-red-500 text-white',
                    toast.type === 'warning' && 'bg-yellow-500 text-white',
                    toast.type === 'info' && 'bg-blue-500 text-white'
                ]">
                    {{ toast.message }}
                </div>
            </Transition>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface SessionEvent {
    id: string
    type: 'combat' | 'death' | 'treasure' | 'roleplay' | 'twist' | 'location' | 'npc' | 'discovery' | 'decision'
    description: string
    title?: string
}

interface ImageItem {
    id: string
    url: string
    caption?: string
}

interface SessionData {
    sessionNumber: number
    title: string
    date: string
    durationHours: number
    durationMinutes: number
    sessionStatus: 'planned' | 'in-progress' | 'completed'
    content: string
    events: SessionEvent[]
    images: ImageItem[]
    privateNotes: string
    status: 'draft' | 'published'
}

interface Toast {
    show: boolean
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
}

const STORAGE_KEY = 'campaignchronicle_session_draft'

// State
const hasUnsavedChanges = ref(false)
const showCancelDialog = ref(false)
const autoSaveStatus = ref<'saved' | 'saving' | 'unsaved'>('saved')
const lastSaved = ref<Date | null>(null)
const isPublishing = ref(false)
const showPreview = ref(false)
const toast = ref<Toast>({ show: false, message: '', type: 'info' })

// Load initial data from localStorage
const loadFromStorage = (): SessionData => {
    if (import.meta.client) {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                return {
                    ...parsed,
                    images: [], // Don't persist images in localStorage
                }
            } catch {
                // If parsing fails, use default
            }
        }
    }

    return {
        sessionNumber: 1,
        title: '',
        date: new Date().toISOString().split('T')[0] || '',
        durationHours: 4,
        durationMinutes: 0,
        sessionStatus: 'planned',
        content: '',
        events: [],
        images: [],
        privateNotes: '',
        status: 'draft',
    }
}

const sessionData = ref<SessionData>(loadFromStorage())

// Toast helper
const showToast = (message: string, type: Toast['type'] = 'info') => {
    toast.value = { show: true, message, type }
    setTimeout(() => {
        toast.value.show = false
    }, 3000)
}

// Auto-save functionality
const saveToLocalStorage = () => {
    if (!import.meta.client) return

    autoSaveStatus.value = 'saving'
    const dataToSave = {
        ...sessionData.value,
        images: [], // Don't save image blobs
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))

    setTimeout(() => {
        autoSaveStatus.value = 'saved'
        lastSaved.value = new Date()
        hasUnsavedChanges.value = false
    }, 500)
}

// Auto-save timer
let autoSaveTimer: ReturnType<typeof setTimeout> | null = null

watch(() => sessionData.value, () => {
    hasUnsavedChanges.value = true
    autoSaveStatus.value = 'unsaved'

    // Clear existing timer
    if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
    }

    // Set new timer for 30 seconds
    autoSaveTimer = setTimeout(() => {
        saveToLocalStorage()
    }, 30000)
}, { deep: true })

// Warn before leaving with unsaved changes
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (hasUnsavedChanges.value && autoSaveStatus.value !== 'saved') {
        e.preventDefault()
        e.returnValue = ''
    }
}

onMounted(() => {
    if (import.meta.client) {
        window.addEventListener('beforeunload', handleBeforeUnload)
    }
})

onUnmounted(() => {
    if (import.meta.client) {
        window.removeEventListener('beforeunload', handleBeforeUnload)
    }
    if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
    }
})

// Update session data
const updateSessionData = <K extends keyof SessionData>(
    key: K,
    value: SessionData[K]
) => {
    sessionData.value = { ...sessionData.value, [key]: value }
}

// Handlers
const handleCancel = () => {
    if (hasUnsavedChanges.value && autoSaveStatus.value !== 'saved') {
        showCancelDialog.value = true
    } else {
        showToast('Edição cancelada', 'info')
    }
}

const handleDiscardChanges = () => {
    if (import.meta.client) {
        localStorage.removeItem(STORAGE_KEY)
    }
    showToast('Alterações descartadas', 'info')
    showCancelDialog.value = false
    // In a real app, navigate away here
    // navigateTo('/campaign/sessions')
}

const handleSaveDraft = () => {
    saveToLocalStorage()
    showToast('Rascunho salvo com sucesso!', 'success')
}

const validateSession = (): boolean => {
    if (!sessionData.value.title || sessionData.value.title.length < 3) {
        showToast('O título deve ter pelo menos 3 caracteres', 'error')
        return false
    }

    if (!sessionData.value.date) {
        showToast('A data é obrigatória', 'error')
        return false
    }

    if (sessionData.value.content.length < 50) {
        showToast('Sugestão: adicione um resumo mais detalhado (mínimo de 50 caracteres)', 'warning')
    }

    if (sessionData.value.events.length === 0) {
        showToast('Sugestão: adicione pelo menos um evento marcante', 'warning')
    }

    return true
}

const handlePublish = async () => {
    if (!validateSession()) return

    isPublishing.value = true

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    sessionData.value.status = 'published'
    hasUnsavedChanges.value = false
    autoSaveStatus.value = 'saved'
    lastSaved.value = new Date()

    // Clear localStorage after publishing
    if (import.meta.client) {
        localStorage.removeItem(STORAGE_KEY)
    }

    isPublishing.value = false
    showToast('Sessão publicada com sucesso!', 'success')

    // In a real app, redirect to the session view
    setTimeout(() => {
        showToast('Redirecionando para a sessão...', 'info')
        // navigateTo(`/campaign/session/${sessionData.value.sessionNumber}`)
    }, 1000)
}

const handlePreview = () => {
    showPreview.value = true
}
</script>

<style scoped>
/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

/* Toast transitions */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>