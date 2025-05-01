// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "vuetify-nuxt-module",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt"
  ],
  vuetify: {
    vuetifyOptions: './vuetify.config.ts',
  },
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY,
    },
  }
});