<template>
    <div class="scroll-progress" :style="{ width: `${progress}%` }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const updateProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progress.value = scrollPercent
}

onMounted(() => {
    window.addEventListener('scroll', updateProgress)
    updateProgress()
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #D4AF37, #F4D03F);
    z-index: 9999;
    transition: width 0.1s ease-out;
}
</style>