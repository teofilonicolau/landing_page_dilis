import { defineConfig } from 'vite';

export default defineConfig({
  // Configuração padrão para build estático
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096, // Inline assets menores que 4kb
  }
});
