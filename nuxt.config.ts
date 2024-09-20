import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
  ],
  primevue: {
    options: {
        ripple: true,
        inputVariant: 'filled',
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                cssLayer: false
            }
        }
    }
  },
  css: ['primeicons/primeicons.css'],
})