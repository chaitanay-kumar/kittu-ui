import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root:fileURLToPath(new URL('.',import.meta.url)),
  base:'/angular-demo/',publicDir:false,
  resolve:{alias:{'kittu-ui-angular':fileURLToPath(new URL('../angular/dist/fesm2022/kittu-ui-angular.mjs',import.meta.url))}},
  build:{outDir:fileURLToPath(new URL('../../public/angular-demo',import.meta.url)),emptyOutDir:true},
});
