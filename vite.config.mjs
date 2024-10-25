import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
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
        }),
        visualizer({
            filename: './dist/report.html',
            open: true // Open the report after the build
        })
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('vue')) {
                            return 'vue-vendor';
                        }
                        if (id.includes('lodash')) {
                            return 'lodash';
                        }
                        return 'vendor';
                    }
                }
            }
        }
    },

    define: {
        'process.env': process.env // Define process.env to use with Vite
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
