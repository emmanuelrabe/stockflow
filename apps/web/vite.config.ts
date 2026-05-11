import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@layout': path.resolve(__dirname, './src/layout'),
            '@contexts': path.resolve(__dirname, './src/contexts'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
})
