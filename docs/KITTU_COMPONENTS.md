# Kittu original components

These eight additions follow the upstream source-plus-metadata convention. Run `npm run component:sync` after edits; the catalog, registry, raw source JSON, sitemap, and llms.txt derive from those files. Interactive examples live in `src/components/docs/KittuDemos.tsx` and appear in the directory and detail pages. Each metadata file documents props and usage.

| Component | Interaction and recovery |
| --- | --- |
| Elastic Sheet | Open a native modal; drag its handle or choose snap buttons. Arrow keys resize, Home/End select extremes, Escape closes. Native dialog contains focus and restores it to the opener. Custom children can show loading, errors, and actions. |
| Smart Upload | Choose or drop files, inspect image previews, then upload. Validate extension/MIME, size, and count. The transport reports progress and receives an AbortSignal. Cancel interrupts an attempt; retry creates a fresh signal. Remove revokes previews. Unmount aborts requests and revokes URLs. |
| Liquid Command Palette | Open with a button or Cmd/Ctrl K; filter commands; Up/Down, Home/End, and Enter navigate and execute. Disabled commands are skipped. Async failures keep the dialog open for retry. Escape closes. |
| Hold-to-Confirm | Hold pointer, Space, or Enter for the configured duration. Release, blur, pointer cancellation, or Escape cancels before completion. Pending locks reentry; a rejected callback enables retry. Success can be reset. |
| Swipe Action List | Swipe left to reveal an action or use Show actions. Pending blocks duplicate actions. Resolve hides the item locally; rejection preserves it for retry. Restore resets the local view; it does not reverse a server action. |
| Interactive Data Card | Expand a linked details region; invoke an async action with pending, success, and failure feedback. Supports external loading/error states and custom detail content. |
| Timeline Scrubber | Native range supports pointer/touch and arrow, Home/End keyboard navigation. Previous/Next are explicit alternatives. Empty, loading, and disabled timelines remain readable. |
| AI Prompt Composer | Enter text, pick suggestions, add/remove attachments, then send with a button or Cmd/Ctrl Enter. Failed/cancelled requests preserve the draft and attachments. Success clears them. Pending blocks edits and duplicate sends. |

## Transport contracts

Smart Upload and AI Prompt Composer do not send data unless an application provides a handler. The site demos explicitly simulate transport locally; files and prompts stay in the browser. A filename or prompt containing `fail` demonstrates failure. Wire handlers to your own service, honor the provided AbortSignal, and reject promises on failure. Client file checks are usability checks; validate files again on your server.

```tsx
<SmartUpload upload={async (file, { signal, onProgress }) => {
  // Use your transport's byte-progress events to call onProgress(0..100).
  const response = await fetch('/api/files', { method: 'POST', body: file, signal });
  if (!response.ok) throw new Error('Upload failed');
  onProgress(100);
}} />

<AIPromptComposer onSend={async ({ text, attachments }, signal) => {
  const form = new FormData();
  form.append('text', text);
  attachments.forEach(file => form.append('attachments', file));
  const response = await fetch('/api/prompts', { method: 'POST', body: form, signal });
  if (!response.ok) throw new Error('Send failed');
}} />
```

## Themes, motion, and deployment

New components use `src/lib/kittu-controls.css` and theme variables with fallbacks. Visible focus, wrapping content, native controls, status announcements, and reduced-motion rules are shared. Include the generated companion stylesheet when copying source manually; registry installation includes it automatically. The Kittu Ant is an original SVG with generated PNG install icons and a social card.

There is no deployed Kittu UI domain. URLs default to `http://localhost:5173`, with indexing disabled. Set `VITE_SITE_URL` to the real origin when available, then regenerate and build with that same environment variable. The destination registry's default-branch installation commands become usable only after the branch is merged. No npm package publication is part of this handoff.

Inherited code-snippet demos use `example-client`, `example-model`, and reserved `example.com` URLs as illustrations. They do not describe a Kittu UI SDK or hosted AI service.
