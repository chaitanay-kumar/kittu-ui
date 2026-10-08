# Kit UI — the Kit Fox

**Nimble by nature. Precise by design.**

Kit UI takes its name and mascot from the kit fox (*Vulpes macrotis*). Its agility, keen senses, and adaptability guide the interface: purposeful components, clear feedback, and layouts that respond to their environment.

Our philosophy is to shorten the path from intent to action, make every outcome understandable, and adapt to people rather than expecting people to adapt to the interface. Source ownership makes these principles practical: developers can inspect and shape the React or native Angular components for their own product.

## Principles

| Fox quality | Interface principle | Practical expectation |
| --- | --- | --- |
| Nimble | Keep interactions direct and dependencies purposeful | Load previews on demand; evaluate bundle cost when adding dependencies |
| Precise | Make controls and feedback unambiguous | Visible focus, accurate progress, explicit pending and failure states |
| Adaptable | Respond to the user's environment | Responsive layouts, touch and keyboard alternatives, themes, reduced motion |
| Alert | Notice intent without getting in the way | Restrained hover/focus feedback, predictable shortcuts, recoverable actions |

These are design goals, not performance benchmarks. The Angular documentation demo includes the compiler and catalog preview code; do not describe it as a minimal production consumer bundle or promise unmeasured load-time improvements.

## Original mark

The Kit Fox is an original geometric fox head, constructed from a polygon silhouette, triangular ears and eyes, and a negative-space muzzle. Angular ear and cheek diagonals give the mark its sharp, modular character. Keep the large ears and clean gaps recognizable at small sizes; do not add detail that disappears at favicon scale.

The canonical editable asset is `public/kit-fox.svg`. `src/components/layout/KitFox.tsx` uses the same geometry and inherits the surrounding text color. The logo and favicon are one-color marks; the social card adds a restrained clay accent on a warm neutral background. Preserve contrast in both themes. Decorative marks are hidden from assistive technology; interactive brand links carry the product name.

Run `npm run brand:generate` with the supported Node version to regenerate the transparent navigation logo, adaptive SVG favicon, ICO, install icons, and SVG/PNG/WebP social cards. Keep the component's path synchronized with the canonical SVG when changing the mark. Regeneration uses Sharp and native SVG artwork; no generated raster source is required.

## Name and compatibility

The public product name is **Kit UI**, with **Kit Fox** as its mascot. The former public name was Kittu UI. The existing `chaitanay-kumar/kittu-ui` repository, `/kittu-ui/` Pages address, `kittu-ui-angular` package artifact, `Kittu*` public exports, selectors, and existing integration prefixes remain compatibility identifiers. A visual rebrand does not silently break consuming applications or shared URLs. A future namespace migration should provide aliases and explicit migration instructions.

Update UI copy, documentation headings, manifests, metadata, and social assets to the current name. Preserve the original MIT notices verbatim and maintain independent upstream attribution. Kit UI is not affiliated with EasyUI.
