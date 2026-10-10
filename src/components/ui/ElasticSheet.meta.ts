import type { KitUIComponentMeta } from '../../types/component';
const meta: KitUIComponentMeta = {
  "title": "Elastic Sheet",
  "description": "A draggable bottom sheet with snap positions, native modal focus containment, and keyboard resizing.",
  "category": "Overlays",
  "tagline": "A draggable bottom sheet with snap positions, native modal focus containment, and keyboard resizing.",
  "badges": [
    "Kit Original",
    "Keyboard",
    "Reduced Motion"
  ],
  "featured": true,
  "createdAt": "2026-10-08",
  "features": [
    "A draggable bottom sheet with snap positions, native modal focus containment, and keyboard resizing.",
    "Responsive surfaces with shared light and dark theme tokens.",
    "Visible focus, disabled states, and motion preference support."
  ],
  "props": [
    {
      "name": "snapPositions",
      "type": "number[]",
      "default": "[35, 65, 90]",
      "description": "Viewport height percentages, clamped to 20–95."
    },
    {
      "name": "onSnapChange",
      "type": "(position: number) => void",
      "default": "undefined",
      "description": "Called when a drag or keyboard resize settles."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "default": "demo content",
      "description": "Sheet content."
    },
    {
      "name": "title",
      "type": "string",
      "default": "Make room for the details",
      "description": "Dialog title."
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
  "usageCode": "import { ElasticSheet } from \"@/components/ui/elastic-sheet\";\n\nexport function Demo() {\n  return <ElasticSheet />;\n}"
};
export default meta;
