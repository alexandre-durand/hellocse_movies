import { TMDBSingleton } from "~/services/TMDBSingleton"

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const tmdbApiKey = config.public.tmdbApiKey
    TMDBSingleton.getInstance(tmdbApiKey)
})