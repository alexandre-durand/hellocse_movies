import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'), // points to project root
        },
    },
    test: {
        // other test options
        globals: true,
    },
})