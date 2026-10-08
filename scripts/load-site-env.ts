import { loadEnv } from 'vite';

// Match Vite's production environment loading for Node-side generation tools.
// Explicit shell variables take precedence over .env and .env.production.
const configuredSiteUrl = loadEnv('production', process.cwd(), 'VITE_').VITE_SITE_URL;
if (!process.env.VITE_SITE_URL && configuredSiteUrl) process.env.VITE_SITE_URL = configuredSiteUrl;
