import { SEO_CONFIG } from './config';
import type { PageSEOMeta } from './helpers';

const JSONLD_SCRIPT_ID = 'kittu-ui-seo-jsonld';

/**
 * Sets or updates a <meta> tag in document.head.
 */
function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
  if (typeof document === 'undefined') return;

  let meta = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attributeName, attributeValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Sets or updates a <link> tag in document.head.
 */
function setLinkTag(rel: string, href: string): void {
  if (typeof document === 'undefined') return;

  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Sets or updates the JSON-LD script tag in document.head.
 */
function setJsonLd(data?: Record<string, any> | Array<Record<string, any>>): void {
  if (typeof document === 'undefined') return;

  let script = document.getElementById(JSONLD_SCRIPT_ID) as HTMLScriptElement | null;

  if (!data) {
    if (script) {
      script.remove();
    }
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = JSONLD_SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data, null, 2);
}

/**
 * Applies a full set of SEO metadata to the active document.
 */
export function updatePageMetadata(seo: PageSEOMeta): void {
  if (typeof document === 'undefined') return;

  // Title
  document.title = seo.title || SEO_CONFIG.defaultTitle;

  // Description
  const description = seo.description || SEO_CONFIG.defaultDescription;
  setMetaTag('name', 'description', description);

  // Canonical
  const canonical = seo.canonical || SEO_CONFIG.siteUrl;
  setLinkTag('canonical', canonical);

  // Robots
  const robotsContent = (seo.noindex || !SEO_CONFIG.robots.index)
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  setMetaTag('name', 'robots', robotsContent);

  // Keywords
  if (seo.keywords && seo.keywords.length > 0) {
    setMetaTag('name', 'keywords', seo.keywords.join(', '));
  }

  // Open Graph
  const ogTitle = seo.ogTitle || seo.title || SEO_CONFIG.defaultTitle;
  const ogDesc = seo.ogDescription || description;
  const ogImg = seo.ogImage || SEO_CONFIG.ogImage;
  const ogType = seo.ogType || 'website';

  setMetaTag('property', 'og:site_name', SEO_CONFIG.siteName);
  setMetaTag('property', 'og:title', ogTitle);
  setMetaTag('property', 'og:description', ogDesc);
  setMetaTag('property', 'og:url', canonical);
  setMetaTag('property', 'og:image', ogImg);
  setMetaTag('property', 'og:image:secure_url', ogImg);
  setMetaTag('property', 'og:image:type', SEO_CONFIG.ogImageType);
  setMetaTag('property', 'og:image:width', String(SEO_CONFIG.ogImageWidth));
  setMetaTag('property', 'og:image:height', String(SEO_CONFIG.ogImageHeight));
  setMetaTag('property', 'og:image:alt', ogTitle);
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:locale', SEO_CONFIG.locale);

  // Twitter / X
  setMetaTag('name', 'twitter:card', SEO_CONFIG.twitterCard);
  if (SEO_CONFIG.twitterHandle) setMetaTag('name', 'twitter:site', SEO_CONFIG.twitterHandle);
  setMetaTag('name', 'twitter:title', ogTitle);
  setMetaTag('name', 'twitter:description', ogDesc);
  setMetaTag('name', 'twitter:image', ogImg);
  setMetaTag('name', 'twitter:image:alt', ogTitle);

  // JSON-LD Structured Data
  if (seo.structuredData) {
    setJsonLd(seo.structuredData);
  }
}
