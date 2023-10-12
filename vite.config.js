import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'examples/index.html'),
        basic: resolve(__dirname, 'examples/basic/index.html'),
        nominatim: resolve(__dirname, 'examples/nominatim/index.html'),
        'use-geographic': resolve(__dirname, 'examples/use-geographic/index.html'),
        vector: resolve(__dirname, 'examples/vector/index.html')
      }
    }
  },
  base: './'
});
