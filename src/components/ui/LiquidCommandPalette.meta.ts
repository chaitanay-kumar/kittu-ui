import type { KitUIComponentMeta } from '../../types/component';
const meta: KitUIComponentMeta = {
  "title": "Liquid Command Palette",
  "description": "A searchable command dialog with arrow navigation, disabled commands, and async feedback.",
  "category": "Navigation",
  "tagline": "A searchable command dialog with arrow navigation, disabled commands, and async feedback.",
  "badges": [
    "Kit Original",
    "Keyboard",
    "Reduced Motion"
  ],
  "featured": true,
  "createdAt": "2026-10-08",
  "features": [
    "A searchable command dialog with arrow navigation, disabled commands, and async feedback.",
    "Responsive surfaces with shared light and dark theme tokens.",
    "Visible focus, disabled states, and motion preference support."
  ],
  "props": [
    {
      "name": "commands",
      "type": "LiquidCommand[]",
      "default": "navigation examples",
      "description": "Unique IDs, labels, optional keywords, disabled state, and onSelect callbacks."
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
  "usageCode": "import { LiquidCommandPalette } from \"@/components/ui/liquid-command-palette\";\n\nexport function Demo() {\n  return <LiquidCommandPalette />;\n}"
};
export default meta;
