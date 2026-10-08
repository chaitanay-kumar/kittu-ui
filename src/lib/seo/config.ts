import { SITE_URL, IS_PUBLIC_SITE } from '../site-url';
/**
 * Kittu UI — Global SEO Configuration
 * Central single source of truth for site metadata, Open Graph, Twitter/X, and indexing policies.
 */

export const SEO_CONFIG = {
  siteName: 'Kittu UI',
  titleTemplate: '%s — Kittu UI',
  defaultTitle: 'Kittu UI — Small details. Lasting impressions.',
  defaultDescription:
    'Production-ready animated UI components built with React, Tailwind CSS, and Framer Motion for modern web apps.',
  siteUrl: SITE_URL,
  ogImage: `${SITE_URL}/og-image.webp`,
  ogImageType: 'image/webp',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Kittu UI — Small details. Lasting impressions.',
  twitterCard: 'summary_large_image',
  twitterHandle: '',
  author: 'Kittu UI contributors',
  repository: 'https://github.com/chaitanay-kumar/kittu-ui',
  locale: 'en_US',
  themeColor: '#050505',
  keywords: [
    'React components',
    'UI library',
    'Framer Motion',
    'Tailwind CSS',
    'Accessible UI',
    'Design System',
    'Animation components',
    'shadcn/ui compatible',
    'Modern React UI',
    'Interactive components',
    'Kittu UI'
  ],
  robots: {
    index: IS_PUBLIC_SITE,
    follow: true,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
  routes: {
    home: '/',
    components: '/components',
    docs: '/docs',
    docsIntro: '/docs/introduction',
    docsQuickStart: '/docs/quick-start',
    docsArchitecture: '/docs/architecture',
    docsMotion: '/docs/motion-system',
    docsCollaboration: '/docs/collaboration',
    docsSEO: '/docs/seo',
  }
} as const;

export type SEOConfig = typeof SEO_CONFIG;
