module.exports = {
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#F5F1E8',
          200: '#E8DCC4',
          300: '#DCC8A0',
          400: '#D0B47C',
          500: '#C4A058',
        },
        medieval: {
          50: '#F5F3F0',
          100: '#E8E1D8',
          200: '#D4C4B0',
          300: '#B5A088',
          400: '#8D6E63',
          500: '#5D4037',
          600: '#4E342E',
          700: '#3E2723',
          800: '#2C1810',
          900: '#1A0F0A',
        },
        gold: {
          100: '#FFF8DC',
          200: '#FFEAA7',
          300: '#FFD93D',
          400: '#D4AF37',
          500: '#B8860B',
          600: '#9A7D0A',
        }
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'],
        'title': ['IM Fell English', 'serif'],
        'body': ['Lora', 'serif'],
        'ui': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'parchment-texture': "url('/assets/textures/parchment.png')",
        'leather-texture': "url('/assets/textures/leather.png')",
      },
      boxShadow: {
        'parchment': '0 4px 6px -1px rgba(44, 24, 16, 0.1), 0 2px 4px -1px rgba(44, 24, 16, 0.06)',
        'medieval': '0 10px 15px -3px rgba(44, 24, 16, 0.3), 0 4px 6px -2px rgba(44, 24, 16, 0.2)',
      }
    }
  }
}