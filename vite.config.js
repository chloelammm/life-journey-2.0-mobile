import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/life-journey-2.0-mobile/',      
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
