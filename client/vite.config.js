import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    nodePolyfills(), // necessary to avoid "process is no defined" issue
    react()],
    test: {
      globals: true,
      environment: 'jsdom',
      css: true,
      setupFiles: './tests/setup.js',
    }
})
