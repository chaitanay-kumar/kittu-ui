import { withBasePath } from '../../lib/base-path';
import React from 'react';
import { Container } from './Container';
import { KittuAnt } from './KittuAnt';
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
        .kittu-ui-footer-track {
          position: relative;
          height: 1px;
          container-type: inline-size;
        }

        .kittu-ui-footer-ant {
          position: absolute;
          top: -35px;
          left: 0;
          width: 36px;
          height: 36px;
          color: var(--text-primary);
          animation: kittu-ui-footer-travel 60s ease-in-out infinite;
          will-change: transform;
        }

        .kittu-ui-footer-ant .kittu-ui-ant-mark {
          display: block;
          width: 100%;
          height: 100%;
          animation: kittu-ui-footer-turn 60s steps(1, end) infinite;
        }

        .kittu-ui-footer-ant .kittu-ui-ant-pupil {
          transform-box: fill-box;
          transform-origin: center;
          animation: kittu-ui-footer-look 4s ease-in-out infinite;
        }

        .kittu-ui-footer-ant .kittu-ui-ant-pupil-right {
          animation-delay: 80ms;
        }

        .kittu-ui-footer-nav {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          column-gap: 22px;
          row-gap: 12px;
          font-family: 'Geist', sans-serif;
        }

        .kittu-ui-footer-sponsor {
          font-family: 'Geist', sans-serif;
        }

        @keyframes kittu-ui-footer-travel {
          0%, 4% { transform: translateX(0); }
          46%, 54% { transform: translateX(calc(100cqi - 36px)); }
          96%, 100% { transform: translateX(0); }
        }

        @keyframes kittu-ui-footer-turn {
          0%, 49.9% { transform: scaleX(1); }
          50%, 100% { transform: scaleX(-1); }
        }

        @keyframes kittu-ui-footer-look {
          0%, 100% { transform: translateX(0); }
          45%, 55% { transform: translateX(2px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .kittu-ui-footer-ant,
          .kittu-ui-footer-ant .kittu-ui-ant-mark,
          .kittu-ui-footer-ant .kittu-ui-ant-pupil {
            animation: none;
          }
          .kittu-ui-footer-ant { left: 0; }
        }
      `}</style>

      <footer className="relative border-t border-border-subtle bg-background text-text-muted">
        <div className="pointer-events-none absolute inset-x-0 top-0" aria-hidden="true">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="kittu-ui-footer-track">
              <div className="kittu-ui-footer-ant"><KittuAnt size={36} /></div>
            </div>
          </div>
        </div>
        <Container size="xl">
          <div className="pt-12 pb-20 sm:py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-start gap-2">
                <a
                  href={withBasePath('/')}
                  aria-label="Kittu UI home"
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
                    Kittu UI
                  </span>
                </a>
                <p className="max-w-xs text-sm leading-5 text-text-muted">
                  Open-source, thoughtful components
                  <br className="sm:hidden" /> for React and Angular interfaces
                </p>
              </div>

              <nav
                className="kittu-ui-footer-nav text-sm"
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
                © {new Date().getFullYear()} Kittu UI <span className="px-1.5 text-text-subtle">·</span> Built by{' '}
                <a href="https://github.com/chaitanay-kumar/kittu-ui" target="_blank" rel="noopener noreferrer" className="text-text-secondary transition-colors hover:text-text-primary">Kittu UI contributors</a>
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
