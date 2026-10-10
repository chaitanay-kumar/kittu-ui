import { withBasePath } from '../../lib/base-path';
import React from 'react';
import { Container } from './Container';
import { KitFox } from './KitFox';
import { GITHUB_URL } from '../../lib/constants';

export interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateComponents?: () => void;
  onNavigateDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateComponents,
  onNavigateDocs,
}) => {
  const handleInternalNavigation =
    (callback?: () => void) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        e.button === 0 &&
        callback
      ) {
        e.preventDefault();
        callback();
      }
    };

  return (
    <>
      <style>{`
        .kit-ui-footer-track { position: relative; height: 1px; }
        .kit-ui-footer-fox { position: absolute; top: -35px; left: 0; width: 36px; height: 36px; color: var(--text-primary); }
        .kit-ui-footer-fox svg { display: block; width: 100%; height: 100%; }
        .kit-ui-footer-nav { display: flex; flex-wrap: wrap; align-items: center; column-gap: 22px; row-gap: 12px; font-family: 'Geist', sans-serif; }
        .kit-ui-footer-sponsor { font-family: 'Geist', sans-serif; }
      `}</style>

      <footer className="relative border-t border-border-subtle bg-background text-text-muted">
        <div className="pointer-events-none absolute inset-x-0 top-0" aria-hidden="true">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="kit-ui-footer-track">
              <div className="kit-ui-footer-fox"><KitFox size={36} /></div>
            </div>
          </div>
        </div>
        <Container size="xl">
          <div className="pt-12 pb-20 sm:py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-start gap-2">
                <a
                  href={withBasePath('/')}
                  aria-label="Kit UI home"
                  onClick={handleInternalNavigation(onNavigateHome)}
                  className="group inline-flex items-center gap-2.5 rounded focus-ring"
                >
                  <img
                    src={withBasePath('/logo.png')}
                    alt=""
                    width="24"
                    height="24"
                    className="h-6 w-6 object-contain invert dark:invert-0 transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="font-mono text-sm font-medium tracking-tight text-text-primary transition-colors group-hover:text-text-secondary">
                    Kit UI
                  </span>
                </a>
                <p className="max-w-xs text-sm leading-5 text-text-muted">
                  Open-source, thoughtful components
                  <br className="sm:hidden" /> for React and Angular interfaces
                </p>
              </div>

              <nav
                className="kit-ui-footer-nav text-sm"
                aria-label="Footer navigation"
              >
                <a href={withBasePath('/components')} onClick={handleInternalNavigation(onNavigateComponents)} className="whitespace-nowrap rounded text-text-secondary transition-colors hover:text-text-primary focus-ring">Components</a>
                <a href={withBasePath('/docs/introduction')} onClick={handleInternalNavigation(onNavigateDocs)} className="whitespace-nowrap rounded text-text-secondary transition-colors hover:text-text-primary focus-ring">Docs</a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap rounded text-text-secondary transition-colors hover:text-text-primary focus-ring">GitHub</a>
                <a href={withBasePath('/llms.txt')} className="whitespace-nowrap rounded text-text-secondary transition-colors hover:text-text-primary focus-ring">LLMs</a>
              </nav>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-border-subtle pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
              <span>Independent, open-source design.</span>

              <p className="text-text-muted sm:text-right">
                © {new Date().getFullYear()} Kit UI <span className="px-1.5 text-text-subtle">·</span> Built by{' '}
                <a href="https://github.com/chaitanay-kumar/kit-ui" target="_blank" rel="noopener noreferrer" className="text-text-secondary transition-colors hover:text-text-primary">Kit UI contributors</a>
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
