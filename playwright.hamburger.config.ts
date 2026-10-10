import base from './playwright.config';
import {defineConfig} from '@playwright/test';
export default defineConfig({...base,testMatch:'hamburger-menu-parity.spec.ts',use:{...base.use,baseURL:'http://127.0.0.1:5209'},webServer:{command:'npx vite --host 127.0.0.1 --port 5209 --strictPort',url:'http://127.0.0.1:5209',reuseExistingServer:true}});
