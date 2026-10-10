import type { KitUIComponentMeta } from '../../types/component';
const meta: KitUIComponentMeta = {
  "title": "Interactive Data Card",
  "description": "An expandable summary with linked detail controls and async action feedback.",
  "category": "Feedback",
  "tagline": "An expandable summary with linked detail controls and async action feedback.",
  "badges": [
    "Kit Original",
    "Keyboard",
    "Reduced Motion"
  ],
  "featured": true,
  "createdAt": "2026-10-08",
  "features": [
    "An expandable summary with linked detail controls and async action feedback.",
    "Responsive surfaces with shared light and dark theme tokens.",
    "Visible focus, disabled states, and motion preference support."
  ],
  "props": [
    {
      "name": "summary",
      "type": "ReactNode",
      "default": "sample summary",
      "description": "Collapsed summary."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "default": "sample details",
      "description": "Expanded content."
    },
    {
      "name": "onAction",
      "type": "() => void | Promise<void>",
      "default": "undefined",
      "description": "Async detail action."
    },
    {
      "name": "error",
      "type": "string",
      "default": "undefined",
      "description": "External loading error."
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "false",
      "description": "Show a loading summary."
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
  "usageCode": "import { InteractiveDataCard } from \"@/components/ui/interactive-data-card\";\n\nexport function Demo() {\n  return <InteractiveDataCard />;\n}"
};
export default meta;
