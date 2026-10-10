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

## Names and integration identifiers

The public product name is **Kit UI**, with **Kit Fox** as its mascot. The canonical repository is `chaitanay-kumar/kit-ui`, the implementation branch is `feat/kit-ui-library`, and the Pages site uses `/kit-ui/`.

Use `kit-ui-angular` for Angular package imports, `Kit*` for public Angular exports, `kit-*` for element selectors, and `kitButton` / `kitNeonEdgeButton` for button directives. CSS, DOM data attributes, storage keys, and iframe messages use the `kit` prefix. The root npm project is `kit-ui`.

This namespace migration changes consumer imports and templates. Follow [the migration guide](KIT_NAMESPACE_MIGRATION.md) when updating an existing application. New examples and commands must use the current identifiers.

Preserve original MIT notices verbatim and maintain independent upstream attribution. Kit UI is not affiliated with EasyUI.
