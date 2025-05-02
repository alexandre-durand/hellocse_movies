import { initTMDBClient } from "@/services/TMDBSingleton"

export default defineNuxtPlugin(() => {
    console.log("Initializing TMDB client...")
    const config = useRuntimeConfig()
    const tmdbApiKey = config.public.tmdbApiKey

    if (!tmdbApiKey) {
        throw new Error("TMDB API key is not set in the runtime config.")
    }
    initTMDBClient(tmdbApiKey)
})