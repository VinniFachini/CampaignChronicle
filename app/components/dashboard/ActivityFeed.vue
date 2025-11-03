<script setup lang="ts">
import { MessageCircle, UserPlus, BookOpen, ArrowRight } from 'lucide-vue-next'

export interface Activity {
    id: string
    user: {
        name: string
        avatar?: string
        initials: string
    }
    action: string
    campaign: string
    time: string
    type: 'comment' | 'character' | 'session'
}

interface Props {
    activities: Activity[]
}

defineProps<Props>()

const activityIcons = {
    comment: MessageCircle,
    character: UserPlus,
    session: BookOpen,
}

const activityColors = {
    comment: 'text-info-500',
    character: 'text-success-500',
    session: 'text-gold-500',
}
</script>

<template>
    <div class="bg-white border border-medieval-200 rounded-lg shadow">
        <!-- Card Header -->
        <div class="border-b border-medieval-100 p-6">
            <h3 class="font-display text-xl font-semibold text-medieval-800">
                Atividade Recente
            </h3>
        </div>

        <!-- Card Content -->
        <div class="p-0">
            <div class="divide-y divide-medieval-100">
                <div v-for="activity in activities" :key="activity.id" class="flex items-start gap-3 p-4 hover:bg-parchment-50 transition-colors cursor-pointer">
                    <!-- Avatar -->
                    <div class="relative h-10 w-10 flex-shrink-0">
                        <img v-if="activity.user.avatar" :src="activity.user.avatar" :alt="activity.user.name" class="h-full w-full rounded-full object-cover" />
                        <div v-else class="h-full w-full rounded-full bg-gold-400 text-white font-ui flex items-center justify-center text-sm font-medium">
                            {{ activity.user.initials }}
                        </div>
                    </div>

                    <!-- Activity Content -->
                    <div class="flex-1 min-w-0">
                        <p class="font-body text-medieval-800">
                            <span class="text-medieval-800">
                                {{ activity.user.name }}
                            </span>
                            <span class="text-medieval-600"> {{ activity.action }} em</span>
                            <span class="text-gold-600"> '{{ activity.campaign }}'</span>
                        </p>
                        <p class="text-sm text-medieval-500 font-ui">
                            {{ activity.time }}
                        </p>
                    </div>

                    <!-- Activity Icon -->
                    <component :is="activityIcons[activity.type]" :class="['h-5 w-5 flex-shrink-0', activityColors[activity.type]]" />
                </div>
            </div>

            <!-- Footer Button -->
            <div class="p-4 border-t border-medieval-100">
                <button class="w-full flex items-center justify-center gap-2 px-4 py-2 text-gold-600 hover:text-gold-700 hover:bg-gold-50 font-ui rounded-md transition-colors">
                    Ver todas as atividades
                    <ArrowRight class="h-4 w-4" />
                </button>
            </div>
        </div>
    </div>
</template>