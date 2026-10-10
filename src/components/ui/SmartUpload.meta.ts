import type { KitUIComponentMeta } from '../../types/component';
const meta: KitUIComponentMeta = {
  "title": "Smart Upload",
  "description": "A validated file queue with image previews, real handler progress, abort signals, and retry.",
  "category": "Forms",
  "tagline": "A validated file queue with image previews, real handler progress, abort signals, and retry.",
  "badges": [
    "Kit Original",
    "Keyboard",
    "Reduced Motion"
  ],
  "featured": true,
  "createdAt": "2026-10-08",
  "features": [
    "A validated file queue with image previews, real handler progress, abort signals, and retry.",
    "Responsive surfaces with shared light and dark theme tokens.",
    "Visible focus, disabled states, and motion preference support."
  ],
  "props": [
    {
      "name": "upload",
      "type": "(file: File, context: UploadContext) => Promise<void>",
      "default": "undefined",
      "description": "Required to enable sending. Honor context.signal and report 0–100 through context.onProgress."
    },
    {
      "name": "accept",
      "type": "string",
      "default": "image/*,.pdf",
      "description": "Comma-separated MIME types, wildcards, or extensions. Client validation is advisory."
    },
    {
      "name": "maxSize",
      "type": "number",
      "default": "10485760",
      "description": "Maximum bytes per file."
    },
    {
      "name": "maxFiles",
      "type": "number",
      "default": "5",
      "description": "Maximum queue length."
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
  "usageCode": "import { SmartUpload } from \"@/components/ui/smart-upload\";\n\nexport function Demo() {\n  return <SmartUpload />;\n}"
};
export default meta;
