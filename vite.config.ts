import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// The build produces a single self-contained index.html in the project root
// that works when opened straight from disk (file://). The editable template
// is dev.html; images are loaded from ./images next to index.html.

// Run the inlined bundle as a classic script at the end of <body> so it works in
// every browser context, including file:// pages.
function classicScriptAtEnd(): Plugin {
  return {
    name: 'classic-script-at-end',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== 'asset' || !file.fileName.endsWith('.html')) continue;
        let html = String(file.source);
        const scripts: string[] = [];
        html = html.replace(/<script type="module"[^>]*>([\s\S]*?)<\/script>/g, (_m, code) => {
          scripts.push(`<script>${code}</script>`);
          return '';
        });
        file.source = html.replace('</body>', `${scripts.join('\n')}\n</body>`);
        file.fileName = 'index.html';
      }
    },
  };
}

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [react(), viteSingleFile(), classicScriptAtEnd()],
  server: { open: '/dev.html' },
  build: {
    outDir: '.',
    emptyOutDir: false,
    rollupOptions: {
      input: 'dev.html',
      output: { format: 'iife' },
    },
  },
});
