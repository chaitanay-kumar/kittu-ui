import type { KittuUIComponentMeta } from '../../types/component';
const meta: KittuUIComponentMeta = {
  "title": "Hold-to-Confirm",
  "description": "Deliberate confirmation with visible hold progress, early cancellation, and async recovery.",
  "category": "Buttons",
  "tagline": "Deliberate confirmation with visible hold progress, early cancellation, and async recovery.",
  "badges": [
    "Kittu Original",
    "Keyboard",
    "Reduced Motion"
  ],
  "featured": true,
  "createdAt": "2026-10-08",
  "features": [
    "Deliberate confirmation with visible hold progress, early cancellation, and async recovery.",
    "Responsive surfaces with shared light and dark theme tokens.",
    "Visible focus, disabled states, and motion preference support."
  ],
  "props": [
    {
      "name": "duration",
      "type": "number",
      "default": "1200",
      "description": "Hold duration in milliseconds, minimum 250."
    },
    {
      "name": "label",
      "type": "string",
      "default": "Hold to confirm",
      "description": "Button label."
    },
    {
      "name": "onConfirm",
      "type": "() => void | Promise<void>",
      "default": "undefined",
      "description": "Resolve to confirm; reject to enable retry."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "description": "Disable new interactions."
    }
  ],
  "accessibility": [
    "All pointer interactions have keyboard alternatives.",
    "State changes are announced with semantic status regions.",
    "Motion is removed under prefers-reduced-motion."
  ],
  "usageCode": "import { HoldToConfirm } from \"@/components/ui/hold-to-confirm\";\n\nexport function Demo() {\n  return <HoldToConfirm />;\n}"
};
export default meta;
