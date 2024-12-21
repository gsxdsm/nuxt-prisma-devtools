export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      exclude: ['@nuxt/kit'],
    },
  },
  prismaDevtools: {},
})
