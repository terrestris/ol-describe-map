import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'examples/index.html'),
        basic: resolve(__dirname, 'examples/basic.html'),
        nominatim: resolve(__dirname, 'examples/nominatim.html'),
        'use-geographic': resolve(__dirname, 'examples/use-geographic.html'),
        vector: resolve(__dirname, 'examples/vector.html'),
        wms: resolve(__dirname, 'examples/wms.html'),
        'wms-verbose': resolve(__dirname, 'examples/wms-verbose.html')
      }
    }
  },
  base: './'
});
