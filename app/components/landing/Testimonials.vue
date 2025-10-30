<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Título -->
      <div class="text-center mb-16">
        <h2 class="font-display text-4xl sm:text-5xl mb-4 text-medieval-700">
          O Que Dizem Nossos Mestres
        </h2>
      </div>

      <!-- Depoimentos -->
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="p-8 h-full border-2 border-parchment-200 bg-white transition-all duration-300 hover:shadow-lg rounded-2xl">
          <!-- Estrelas -->
          <div class="flex gap-1 mb-4">
            <Star v-for="i in 5" :key="i" :class="i <= testimonial.rating
              ? 'w-5 h-5 text-gold-400 fill-gold-400'
              : 'w-5 h-5 text-gold-400 fill-none'" />
          </div>

          <!-- Citação -->
          <blockquote class="font-body text-lg italic my-10 text-medieval-700">
            “{{ testimonial.quote }}”
          </blockquote>

          <!-- Autor -->
          <div class="flex items-center gap-3 pt-4 border-t border-parchment-200">
            <!-- Avatar -->
            <div class="w-10 h-10 rounded-full font-display flex items-center justify-center text-white bg-gold-400">
              {{ testimonial.avatar }}
            </div>

            <div>
              <div class="font-display text-medieval-700">
                {{ testimonial.author }}
              </div>
              <div class="font-ui text-medieval-500 text-sm">
                {{ testimonial.role }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next';

const testimonials = [
  {
    quote: "Finalmente consigo manter registro de tudo que acontece nas minhas 3 campanhas simultâneas. A timeline é perfeita!",
    author: "Rafael Silva",
    role: "Mestre há 8 anos",
    avatar: "RS",
    rating: 4
  },
  {
    quote: "Como jogadora, adoro poder voltar e relembrar momentos épicos. É emocionante ver a evolução do meu personagem ao longo dos meses.",
    author: "Marina Costa",
    role: "Jogadora de D&D",
    avatar: "MC",
    rating: 5
  },
  {
    quote: "Nossa mesa toda usa agora. Cada um adiciona suas perspectivas e temos uma crônica incrível da campanha. Melhor que qualquer Wiki!",
    author: "Lucas Ferreira",
    role: "Mestre e Jogador",
    avatar: "LF",
    rating: 5
  }
];
</script>

<style scoped>
:root {
  --brown-dark: #4b2e05;
  --brown-medium: #7a5523;
  --parchment: #f5ecd8;
  --parchment-dark: #d9c7a3;
  --gold: #d4af37;
}
</style>
