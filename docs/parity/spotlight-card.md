# Spotlight Card parity review

React reference: [SpotlightCard](../../src/components/ui/SpotlightCard.tsx) and the Spotlight Shader detail showcase in [ComponentDetailPage](../../src/components/docs/ComponentDetailPage.tsx).

## Contract and migration

The Angular component renders one native host with two pointer-transparent spotlight layers and a relative z-index-10 projected-content container. It follows spotlightColor (`rgba(56, 189, 248, 0.08)`), spotlightSize (350) and className defaults; undefined inputs restore defaults. Ordinary HTML attributes, style bindings and events apply directly to the host. The former generic collection, selection, disclosure, loading/action and status API is removed. Content, links and buttons belong to the consuming application.

Coordinates start at -1000/-1000, follow mouse client coordinates relative to the host's current bounding rectangle, and reset on mouse leave. Ambient radius/color are configurable; a zero radius follows React's useMotionTemplate quirk (its falsy numeric fragment is omitted, yielding invalid CSS, so the last valid painted gradient remains); the border radius is 220px with white at 18% opacity. Source classes, padding, surface/border colors, clipping, layer positions/radius, hover behavior and 300ms CSS transitions are reproduced. Component-layer CSS allows utility classes to override defaults. Native event listeners are removed on component destruction.

React spreads HTML props after its internal mouse handlers. Angular's optional `onMouseMove` and `onMouseLeave` callback inputs preserve that precedence: a supplied callback replaces internal tracking/reset; explicitly undefined disables the corresponding internal handler. The default sentinel distinguishes omitted inputs from those overrides. Callbacks receive native MouseEvent, the framework equivalent of React's synthetic mouse event. Native `(mousemove)`/`(mouseleave)` listeners can observe events while retaining internal tracking. Parent `group` hover reveals the layers as React's selectors do. Both implementations restrict hover styling to hover-capable devices; neither changes these CSS transitions for OS reduced motion.

The website projects the same heading, description, code label and white dot, with the same dimensions, typography and spacing. No runtime dependency or third-party icon was added.

## Validation coverage and limits

Consuming-app comparisons exercise defaults/undefined bindings, custom color/radius, transparent/zero-radius glow, utility overrides, inline styles, pointer movement/leave, handler replacement/removal and ancestor-group hover in Chromium desktop/mobile emulation. Styles, radial gradients, geometry, colors, transition properties/timing and content are compared directly with the actual React component. Website comparisons cover both themes. Projected keyboard interaction, native attributes and listener disposal are checked independently. Zero-width borders are normalized because their styles/colors do not render.

Settled styles are compared after CSS transitions; exact intermediate frames and rapid reversal timing are not measured. Other browser engines, physical touch devices and SSR remain unverified. This is a baseline for the recorded coverage, not proof of universal parity.

## Recorded results (2026-10-10)

- 34 focused checks validated: 26 consuming-app/native interaction checks passed, plus all eight website/desktop-hover/mobile screenshot checks passed against the final production build. Consuming-app cases include five configurations × four pointer states × both frameworks across both themes and motion preferences on desktop/mobile. The shared blanket reduced-motion rule excludes this port to preserve React's transition behavior.
- All 24 catalog/framework-navigation checks passed, including complete-catalog rendering/disposal in both themes.
- Packaged contract passed for defaults/undefined, reactive gradients, mouse coordinates/reset, override precedence and interactive projected markup.
- Strict Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1 consumers compiled all 116 selectors plus explicit/optional spotlight bindings and projected controls.
- All 117 unit tests passed. Production build and 289 SEO checks passed.
- Lint passed with 21 existing warnings and no new warnings.
- Desktop, hovered desktop and mobile screenshot pairs were visually inspected.

| View | React | Angular |
| --- | --- | --- |
| Desktop | [Screenshot](screenshots/spotlight-card-react-desktop.png) | [Screenshot](screenshots/spotlight-card-angular-desktop.png) |
| Hovered desktop | [Screenshot](screenshots/spotlight-card-react-hover.png) | [Screenshot](screenshots/spotlight-card-angular-hover.png) |
| Mobile | [Screenshot](screenshots/spotlight-card-react-mobile.png) | [Screenshot](screenshots/spotlight-card-angular-mobile.png) |
