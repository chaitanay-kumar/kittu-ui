# Batch 3 integration review

React is the source of truth. This batch integrates five independently reviewed component PRs onto `feat/kit-ui-library`, preserving their original commits.

| Component | PR | Evidence |
| --- | --- | --- |
| Hamburger Menu | #20 | [Controlled API, keyboard, geometry and motion](hamburger-menu.md) |
| Expandable Search | #21 | [Query, focus, forms and interrupted motion](expandable-search.md) |
| Smooth Accordion | #22 | [Content, state, forms and interrupted height](smooth-accordion.md) |
| Stretch Switch | #23 | [Controlled/uncontrolled state, pointer and spring motion](stretch-switch.md) |
| Reveal Card | #24 | [Projection, transformed geometry, glare and motion](reveal-card.md) |

Independent integration checks include 10 Hamburger Menu, 24 Expandable Search plus two strengthened fade cases, and 12 Smooth Accordion browser cases. Stretch Switch and Reveal Card received independent source reviews and their focused desktop/mobile suites; results and practical limits are recorded in their component reports.

The final combined revision passes the production build (all 116 registry entries and 289 SEO pages), 117 unit tests, lint with existing warnings, all 20 component contract checks, and strict installed-package compilation on Angular 20.0.0, 20.3.33, 21.2.25 and 22.2.1. The combined catalog, Angular interaction and framework-tab browser regression passes all 52 desktop/mobile cases.

Shared registrations, CSS exclusions, public types, examples and generated catalog outputs were reconciled across all five PRs. The central tracker now records 20 validated baselines and 96 components awaiting review. Validation covers the documented Chromium fixtures; the user's final QA of all components remains outstanding.
