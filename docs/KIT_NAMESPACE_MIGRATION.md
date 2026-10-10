# Migrating to the Kit UI namespace

Kit UI now uses `kit` throughout its repository, packages, Angular API, styles, and tooling. This is a breaking namespace migration; update imports and templates together. Component behavior and the React-first parity work remain unchanged.

| Previous identifier | Current identifier |
| --- | --- |
| `chaitanay-kumar/kittu-ui` | `chaitanay-kumar/kit-ui` |
| `feat/kittu-ui-library` | `feat/kit-ui-library` |
| Pages `/kittu-ui/` | Pages `/kit-ui/` |
| Root npm project `kittu-ui` | `kit-ui` |
| Angular package `kittu-ui-angular` | `kit-ui-angular` |
| Angular exports `KittuButton`, `KittuUIComponentMeta`, etc. | `KitButton`, `KitUIComponentMeta`, etc. |
| Element selectors `kittu-*` | `kit-*` |
| Directives `kittuButton`, `kittuNeonEdgeButton` | `kitButton`, `kitNeonEdgeButton` |
| CSS classes and custom properties `kittu-*`, `--kittu-*` | `kit-*`, `--kit-*` |
| Data attributes `data-kittu*` | `data-kit*` |
| Theme storage key `kittu-ui-theme` | `kit-ui-theme` |
| Iframe messages `kittu-angular-height`, `kittu-theme` | `kit-angular-height`, `kit-theme` |

Update your Git remote:

```sh
git remote set-url origin https://github.com/chaitanay-kumar/kit-ui.git
git fetch origin
git switch feat/kit-ui-library
```

Build the Angular artifact with `npm run angular:build`. Install the resulting `public/downloads/kit-ui-angular-0.1.0.tgz` in consumers and change imports to `kit-ui-angular`, including the styles entry point. Update standalone component imports and every template selector or directive in the same change. No old namespace aliases are exported.

The existing npm script names (`dev`, `build`, `angular:build`, `component:new`, and the verification scripts) remain valid. Documentation filenames and generated source links now use Kit names. Rebuild copied component sources and custom fixtures so DOM markers, stylesheet rules, and iframe protocols agree.

A saved preference under the previous theme storage key is not read by the new site; users can select their theme again. GitHub redirects the old repository address, but update bookmarks and integrations to the canonical address. Historical Git commits and original third-party license notices are preserved.
