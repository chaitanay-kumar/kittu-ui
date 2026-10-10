import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [{
    name: 'bundle-demo-fonts',
    enforce: 'pre',
    transform(code, id) {
      if (id.replaceAll('\\', '/').endsWith('/src/styles/fonts.css')) {
        return code.replaceAll("'/fonts/", "'../../public/fonts/");
      }
    },
  }],
  root:fileURLToPath(new URL('.',import.meta.url)),
  base:(process.env.VITE_BASE_PATH || '/') + 'angular-demo/',publicDir:false,
  resolve:{alias:{'kit-ui-angular':fileURLToPath(new URL('../angular/dist/fesm2022/kit-ui-angular.mjs',import.meta.url))}},
  build:{outDir:fileURLToPath(new URL('../../public/angular-demo',import.meta.url)),emptyOutDir:true},
});
