import { defineConfig } from 'vite';

// Contrato de carga del shell: un único remote.js, módulo ES, con export por defecto { nombre, version }.
// La versión llega desde el workflow de despliegue (VITE_APP_VERSION); en local queda "dev".
export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(process.env.VITE_APP_VERSION || 'dev'),
  },
  build: {
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'remote.js',
    },
  },
});
