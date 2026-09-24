import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Inline all JS/CSS into dist/index.html and use relative paths so the built
// site works when index.html is opened straight from disk (file://).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
});
