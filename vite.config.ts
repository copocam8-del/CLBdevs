/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type {} from 'vite-react-ssg/node'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    entry: 'src/main.tsx',
    script: 'async',
    dirStyle: 'flat',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
