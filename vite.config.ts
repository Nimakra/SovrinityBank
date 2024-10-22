/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist', // ../dist'
    emptyOutDir: true,
  },
  publicDir: 'assets',
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment('all'),
  ],
  /*test: {
    environment: 'jsdom',
    setupFiles: 'setupTests.ts',
    cache: { dir: '../node_modules/.vitest' },
  }, */
});