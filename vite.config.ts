/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import type {} from 'vite-react-ssg/node'
import { SITE_URL } from './src/data/siteUrl'

/** Genera robots.txt y sitemap.xml a partir de SITE_URL (src/data/siteUrl.ts). */
function seoFiles(): Plugin {
  return {
    name: 'clb-seo-files',
    apply: 'build',
    generateBundle() {
      if (this.environment.config.build.ssr) return
      const home = new URL('/', SITE_URL).toString()
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', SITE_URL)}\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${home}</loc></url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
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
