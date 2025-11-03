<template>
    <div class="min-h-screen bg-parchment-50 parchment-texture flex flex-col">
        <div class="">
            <main class="container mx-auto px-4 py-8">
                <slot />
            </main>
        </div>
    </div>
    <DashboardFooter />
</template>

<script setup lang="ts">
</script>

<style scoped>
.parchment-texture {
    background-image:
        repeating-linear-gradient(0deg,
            rgba(93, 64, 55, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(93, 64, 55, 0.03) 3px),
        repeating-linear-gradient(90deg,
            rgba(93, 64, 55, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(93, 64, 55, 0.03) 3px);
}
</style>