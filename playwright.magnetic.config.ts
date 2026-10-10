import base from './playwright.config';
import {defineConfig} from '@playwright/test';
export default defineConfig({...base,testMatch:'magnetic-button-parity.spec.ts',use:{...base.use,baseURL:'http://127.0.0.1:5193'},webServer:{command:'npx vite --host 127.0.0.1 --port 5193 --strictPort',url:'http://127.0.0.1:5193',reuseExistingServer:true}});
