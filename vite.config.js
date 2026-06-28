import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/admin-panel/', 
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',  // Build output folder
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'react-icons'],
          charts: ['recharts'],
          forms: ['react-hook-form', 'zod', '@hookform/resolvers']
        }
      }
    }
  }
})