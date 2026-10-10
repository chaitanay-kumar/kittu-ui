import base from './playwright.config';
import {defineConfig} from '@playwright/test';
export default defineConfig({...base,testMatch:'reveal-card-parity.spec.ts',use:{...base.use,baseURL:'http://127.0.0.1:5215'},webServer:{command:'npx vite --host 127.0.0.1 --port 5215 --strictPort',url:'http://127.0.0.1:5215',reuseExistingServer:true}});
