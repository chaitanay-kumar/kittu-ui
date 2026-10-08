import type { KittuUIComponentMeta } from '../../types/component';
const meta: KittuUIComponentMeta = {
  "title": "Swipe Action List",
  "description": "Swipe to reveal item actions, with explicit keyboard-accessible controls and retry feedback.",
  "category": "Feedback",
  "tagline": "Swipe to reveal item actions, with explicit keyboard-accessible controls and retry feedback.",
  "badges": [
    "Kit Original",
    "Keyboard",
    "Reduced Motion"
  ],
  "featured": true,
  "createdAt": "2026-10-08",
  "features": [
    "Swipe to reveal item actions, with explicit keyboard-accessible controls and retry feedback.",
    "Responsive surfaces with shared light and dark theme tokens.",
    "Visible focus, disabled states, and motion preference support."
  ],
  "props": [
    {
      "name": "items",
      "type": "SwipeItem[]",
      "default": "sample items",
      "description": "Unique IDs, titles, and optional descriptions."
    },
    {
      "name": "actionLabel",
      "type": "string",
      "default": "Archive",
      "description": "Action label."
    },
    {
      "name": "onAction",
      "type": "(item: SwipeItem) => void | Promise<void>",
      "default": "undefined",
      "description": "Resolve to hide locally, reject to preserve the item."
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
  "usageCode": "import { SwipeActionList } from \"@/components/ui/swipe-action-list\";\n\nexport function Demo() {\n  return <SwipeActionList />;\n}"
};
export default meta;
