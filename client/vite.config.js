import react from '@vitejs/plugin-react-swc'

import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            app: '/src/app',
            features: '/src/features',
            pages: '/src/pages',
            shared: '/src/shared',
            store: '/src/store',
        },
    },
})
