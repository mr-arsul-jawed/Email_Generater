import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':"https://email-generater-backend.onrender.com",
    },
  },
  build:{
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup.html'),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
    outDir: 'dist',
    emptyOutDir: true
  }
})
