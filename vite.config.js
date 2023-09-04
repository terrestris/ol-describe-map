import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'examples/index.html'),
        basic: resolve(__dirname, 'examples/basic/index.html'),
        nominatim: resolve(__dirname, 'examples/nominatim/index.html')
      }
    }
  }
});
