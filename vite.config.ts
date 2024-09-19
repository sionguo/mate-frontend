import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'MATE_',
  plugins: [million.vite({ auto: true }), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8000,
    strictPort: true,
    host: true,
    proxy: {
      '^/api/': {
        target: 'http://localhost:18090',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
