import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src/client',
  publicDir: 'public',
  build: {
    outDir: '../../dist/client',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@client': path.resolve(__dirname, './src/client/src'),
      '@server': path.resolve(__dirname, './src/server'),
    },
  },
});
