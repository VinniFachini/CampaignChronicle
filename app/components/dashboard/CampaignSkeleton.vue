<template>
    <div class="bg-white rounded-lg border border-medieval-200 overflow-hidden shadow-sm">
        <!-- Image Skeleton with 16:9 aspect ratio -->
        <div class="relative w-full pb-[56.25%] bg-medieval-100 animate-pulse">
            <div class="absolute inset-0 bg-gradient-to-r from-medieval-100 via-medieval-200 to-medieval-100 animate-shimmer" />
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">
            <!-- Title and System -->
            <div class="space-y-2">
                <div class="h-6 w-3/4 bg-medieval-100 rounded animate-pulse" />
                <div class="h-4 w-1/2 bg-medieval-100 rounded animate-pulse" />
            </div>

            <!-- Stats -->
            <div class="flex gap-4">
                <div class="h-4 w-16 bg-medieval-100 rounded animate-pulse" />
                <div class="h-4 w-16 bg-medieval-100 rounded animate-pulse" />
                <div class="h-4 w-20 bg-medieval-100 rounded animate-pulse" />
            </div>

            <!-- Last Session -->
            <div class="h-4 w-full bg-medieval-100 rounded animate-pulse" />

            <!-- Tags -->
            <div class="flex gap-2">
                <div class="h-6 w-16 bg-medieval-100 rounded-full animate-pulse" />
                <div class="h-6 w-20 bg-medieval-100 rounded-full animate-pulse" />
                <div class="h-6 w-16 bg-medieval-100 rounded-full animate-pulse" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>

<style scoped>
@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }

    100% {
        background-position: 1000px 0;
    }
}

.animate-shimmer {
    animation: shimmer 2s infinite linear;
    background-size: 1000px 100%;
}
</style>