import type { KittuUIComponentMeta } from '../../types/component';
const meta: KittuUIComponentMeta = {
  "title": "Timeline Scrubber",
  "description": "Navigate events with a native range control, previous/next buttons, and spoken event details.",
  "category": "Navigation",
  "tagline": "Navigate events with a native range control, previous/next buttons, and spoken event details.",
  "badges": [
    "Kittu Original",
    "Keyboard",
    "Reduced Motion"
  ],
  "featured": true,
  "createdAt": "2026-10-08",
  "features": [
    "Navigate events with a native range control, previous/next buttons, and spoken event details.",
    "Responsive surfaces with shared light and dark theme tokens.",
    "Visible focus, disabled states, and motion preference support."
  ],
  "props": [
    {
      "name": "events",
      "type": "TimelineEvent[]",
      "default": "sample events",
      "description": "Unique IDs, titles, descriptions, and display times."
    },
    {
      "name": "onChange",
      "type": "(event, index) => void",
      "default": "undefined",
      "description": "Called for pointer and keyboard navigation."
    },
    {
      "name": "loading",
      "type": "boolean",
      "default": "false",
      "description": "Display a loading state."
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
  "usageCode": "import { TimelineScrubber } from \"@/components/ui/timeline-scrubber\";\n\nexport function Demo() {\n  return <TimelineScrubber />;\n}"
};
export default meta;
