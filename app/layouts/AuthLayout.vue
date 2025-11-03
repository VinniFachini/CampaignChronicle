<template>
    <div class="min-h-screen bg-parchment-50 parchment-texture flex flex-col">
        <AuthHeader />
        <slot />
        <AuthFooter />
    </div>
</template>

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