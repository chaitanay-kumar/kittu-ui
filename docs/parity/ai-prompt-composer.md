# AI Prompt Composer parity review

React is the source of truth: [component](../../src/components/ui/AIPromptComposer.tsx), [demo](../../src/components/docs/KitDemos.tsx), and [shared control styles](../../src/lib/kit-controls.css).

## Changes and migration

Angular previously nested controls inside their labels, producing different grid spacing, used a differently named send input, and omitted the attachment size from rejection feedback. Labels are now siblings of the textarea/file input and reference unique IDs, matching React's structure. Feedback strings and default suggestion text match React. The preview now uses the same width, fonts, line heights, theme borders and native file-control styling.

Use `onSend: SendHandler` to match React's callback name. `SendHandler` accepts `PromptPayload` (`text: string`, `attachments: File[]`) and `AbortSignal`, returning `Promise<void>`. Existing `sendHandler` remains as a deprecated compatibility alias; `onSend` takes precedence when both are supplied. The export `KitAIPromptComposerComponent` and selector `kit-ai-prompt-composer` remain unchanged.

Other inputs retain the React contract: suggestions default to Explain this simply / Help me find a direction / Review my draft, `disabled` defaults false, `maxAttachments` defaults 4, and `maxAttachmentSize` defaults 10 MiB. The textarea retains four rows and an 8000-character limit. Empty/whitespace text or a missing handler prevents sending. Ctrl/Command Enter submits the same request as the Send button.

```html
<kit-ai-prompt-composer [onSend]="send" [suggestions]="suggestions" />
```

Cancellation and errors retain text and attachments. Successful sending clears both. Only one request can be active; cancellation permits a new request, and the previous request's completion cannot clear or settle the new one. Destruction aborts the active signal. Files are checked as a batch against the count and per-file size; invalid batches do not partially attach, and the file input resets after each selection. These behaviors follow React's implementation.

The global package stylesheet remains required, as documented. The same shared CSS supplies hover, focus, disabled feedback and reduced-motion behavior in both frameworks. Host applications can provide fonts/theme tokens; the website-specific typography adjustments apply only to this Angular demonstration.

## Validation and limits

Focused browser checks exercise both frameworks on desktop/mobile: suggestion insertion, attachments/removal/count rejection, pending disabled controls, failure recovery, cancellation and Ctrl+Enter success. Both light/dark themes compare geometry, typography, colors, radii, placeholder, hover and focus styles against the rendered React component.

The built-package contract verifies defaults, no-handler disabled submission, unique labels, count/size limits, trimmed payloads, pending exclusion, cancellation, stale request isolation, success/failure, disabled controls, alias precedence and destruction abort. Strict consuming applications compile `onSend` against Angular 20.0, 20.3, 21 and 22.

Validation passed: 8 focused browser checks, all 24 catalog/sidebar checks, the built-package contract, four Angular consumer builds, 117 existing unit tests and production build with 289 SEO checks. Lint passes with 21 inherited warnings. Geometry allows a one-pixel tolerance; remaining style values are compared directly. The browser checks also compare actual website preview widths.

Verification covers Chromium desktop/mobile emulation. Physical devices, Safari/Firefox, Angular SSR and exhaustive accessibility coverage remain unverified. No new dependency was introduced. The demonstration follows the actual React font fallback as well as its declared font family. No React implementation changed.

## Screenshots

| View | React | Angular |
| --- | --- | --- |
| Desktop | [Screenshot](screenshots/ai-prompt-composer-react-desktop.png) | [Screenshot](screenshots/ai-prompt-composer-angular-desktop.png) |
| Mobile | [Screenshot](screenshots/ai-prompt-composer-react-mobile.png) | [Screenshot](screenshots/ai-prompt-composer-angular-mobile.png) |
