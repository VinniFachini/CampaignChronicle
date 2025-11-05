<template>
    <div class="bg-parchment-100 border border-medieval-300 rounded-lg shadow-sm">
        <div class="p-6 border-b border-medieval-200">
            <h3 class="text-lg font-display font-semibold text-medieval-800">
                Informações Básicas
            </h3>
        </div>
        <div class="p-6 space-y-4">
            <!-- Session Number -->
            <div class="flex items-center gap-2">
                <label class="font-ui text-sm text-medieval-700">Número da Sessão:</label>
                <span class="inline-flex items-center px-2.5 py-0.5 text-xs rounded-full bg-medieval-600 text-white font-ui">
                    #{{ sessionNumber }}
                </span>
                <span class="text-sm text-medieval-500">(gerado automaticamente)</span>
            </div>

            <!-- Title -->
            <div class="space-y-2">
                <label for="title" class="block text-sm font-ui text-medieval-700">
                    Título *
                </label>
                <input id="title" :value="title" @input="$emit('update:title', ($event.target as HTMLInputElement).value)" placeholder="Ex: A Traição no Castelo" class="w-full px-3 py-2 bg-white border border-medieval-300 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" />
                <p v-if="title.length > 0 && title.length < 3" class="text-sm text-red-600">
                    Mínimo de 3 caracteres
                </p>
            </div>

            <!-- Date and Duration -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label for="date" class="block text-sm font-ui text-medieval-700">
                        Data *
                    </label>
                    <div class="relative">
                        <input id="date" type="date" :value="date" @input="$emit('update:date', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 bg-white border border-medieval-300 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" />
                        <Calendar class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-medieval-400 pointer-events-none" />
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-sm font-ui text-medieval-700">Duração</label>
                    <div class="flex gap-2 items-center">
                        <div class="flex-1 relative">
                            <input id="duration-hours" type="number" min="0" max="12" :value="durationHours" @input="handleHoursChange" class="w-full px-3 py-2 pr-8 bg-white border border-medieval-300 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="0" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-medieval-500 pointer-events-none">
                                h
                            </span>
                        </div>
                        <div class="flex-1 relative">
                            <input id="duration-minutes" type="number" min="0" max="59" step="5" :value="durationMinutes" @input="handleMinutesChange" class="w-full px-3 py-2 pr-10 bg-white border border-medieval-300 rounded-md font-ui focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="0" />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-medieval-500 pointer-events-none">
                                min
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status -->
            <div class="space-y-3">
                <label class="block text-sm font-ui text-medieval-700">Status da Sessão</label>
                <div class="flex gap-2 flex-wrap">
                    <button v-for="(config, key) in statusConfig" :key="key" type="button" @click="$emit('update:session-status', key)" :class="[
                        'flex items-center gap-2 px-4 py-2 rounded-md border transition-all font-ui',
                        sessionStatus === key
                            ? config.className
                            : 'bg-white text-medieval-600 border-medieval-300 hover:border-medieval-400'
                    ]">
                        <component :is="config.icon" class="h-4 w-4" />
                        {{ config.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Calendar, Clock, CheckCircle2, PlayCircle } from 'lucide-vue-next'

interface Props {
    sessionNumber: number
    title: string
    date: string
    durationHours: number
    durationMinutes: number
    sessionStatus: 'planned' | 'in-progress' | 'completed'
}

defineProps<Props>()

const emit = defineEmits<{
    'update:title': [value: string]
    'update:date': [value: string]
    'update:duration-hours': [value: number]
    'update:duration-minutes': [value: number]
    'update:session-status': [value: 'planned' | 'in-progress' | 'completed']
}>()

const statusConfig = {
    planned: {
        label: 'Planejada',
        icon: Calendar,
        className: 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100',
    },
    'in-progress': {
        label: 'Em Andamento',
        icon: PlayCircle,
        className: 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100',
    },
    completed: {
        label: 'Concluída',
        icon: CheckCircle2,
        className: 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100',
    },
}

const handleHoursChange = (event: Event) => {
    const value = parseInt((event.target as HTMLInputElement).value) || 0
    emit('update:duration-hours', Math.min(12, Math.max(0, value)))
}

const handleMinutesChange = (event: Event) => {
    const value = parseInt((event.target as HTMLInputElement).value) || 0
    emit('update:duration-minutes', Math.min(59, Math.max(0, value)))
}
</script>

<style scoped>
/* Remove spinner from number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>