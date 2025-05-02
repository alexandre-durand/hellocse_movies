import { initTMDBClient } from "@/services/TMDBSingleton"

export default defineNuxtPlugin(() => {
    console.log("Initializing TMDB client...")
    const config = useRuntimeConfig()
    const tmdbApiKey = config.public.tmdbApiKey
    initTMDBClient(tmdbApiKey)
})