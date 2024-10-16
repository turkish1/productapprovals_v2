import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        noDiscovery: true
    },
    plugins: [
        vue(),
        viteCommonjs(),
        Components({
            resolvers: [PrimeVueResolver()]
        })
    ],
    define: {
        'process.env': process.env // Define process.env to use with Vite
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
