import type { KittuUIComponentMeta } from '../../types/component';
const meta: KittuUIComponentMeta = {
  "title": "AI Prompt Composer",
  "description": "Compose prompts with attachments and suggestions, preserving drafts through failure and cancellation.",
  "category": "Forms",
  "tagline": "Compose prompts with attachments and suggestions, preserving drafts through failure and cancellation.",
  "badges": [
    "Kittu Original",
    "Keyboard",
    "Reduced Motion"
  ],
  "featured": true,
  "createdAt": "2026-10-08",
  "features": [
    "Compose prompts with attachments and suggestions, preserving drafts through failure and cancellation.",
    "Responsive surfaces with shared light and dark theme tokens.",
    "Visible focus, disabled states, and motion preference support."
  ],
  "props": [
    {
      "name": "onSend",
      "type": "(payload: PromptPayload, signal: AbortSignal) => Promise<void>",
      "default": "undefined",
      "description": "Required for sending. Honor signal for cancellation."
    },
    {
      "name": "suggestions",
      "type": "string[]",
      "default": "sample suggestions",
      "description": "Suggestion buttons replace the draft."
    },
    {
      "name": "maxAttachments",
      "type": "number",
      "default": "4",
      "description": "Attachment count limit."
    },
    {
      "name": "maxAttachmentSize",
      "type": "number",
      "default": "10485760",
      "description": "Maximum bytes per attachment."
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
  "usageCode": "import { AIPromptComposer } from \"@/components/ui/ai-prompt-composer\";\n\nexport function Demo() {\n  return <AIPromptComposer />;\n}"
};
export default meta;
