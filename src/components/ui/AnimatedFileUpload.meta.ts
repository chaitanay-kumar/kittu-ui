import type { KittuUIComponentMeta } from '../../types/component';

const meta: KittuUIComponentMeta = {
  title: 'Animated File Upload',
  description: 'A minimal, physical drag-and-drop file uploader with smooth drop reaction, independent file upload tracking, progressive state morphing, and accessible retry flows.',
  category: 'Forms',
  tagline: 'Physical drag-and-drop file uploader with per-file progress morphing',
  badges: ['Drag & Drop', 'Forms', 'Spring Physics'],
  createdAt: '2026-08-21',
  features: [
    'Subtle physical dropzone scaling and border reaction without exaggerated AI glow',
    'Automatic mime-type detection and contextual file icon attribution',
    'Multi-file queue management with independent Uploading → Processing → Complete stages',
    'Self-morphing progress bar into checkmark state with non-aggressive error recovery',
    'Customizable file constraints (maxSize, maxFiles, accept) with accessible screen reader labels',
  ],
  props: [
    { name: 'multiple', type: 'boolean', default: 'true', description: 'Allow multiple files selection and upload' },
    { name: 'accept', type: 'string | string[]', default: 'undefined', description: 'Accepted MIME types or file extensions (e.g. image/*, .pdf)' },
    { name: 'maxSize', type: 'number', default: '26214400 (25MB)', description: 'Maximum file size in bytes' },
    { name: 'maxFiles', type: 'number', default: '10', description: 'Maximum number of concurrent files in list' },
    { name: 'dropTitle', type: 'string', default: "'Drop files here'", description: 'Primary drop target heading' },
    { name: 'dropSubtitle', type: 'string', default: "'or browse from your device'", description: 'Secondary call-to-action text' },
    { name: 'variant', type: "'standard' | 'compact'", default: "'standard'", description: 'Display density mode' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all interactions and file picking' },
    { name: 'onFilesSelected', type: '(files: File[]) => void', default: 'undefined', description: 'Callback triggered when files are chosen' },
    { name: 'onUploadComplete', type: '(file: UploadFileItem) => void', default: 'undefined', description: 'Callback fired on successful upload completion' },
    { name: 'uploadHandler', type: '(file, onProgress) => Promise<void>', default: 'undefined', description: 'Custom async upload handler returning a promise' },
  ],
  accessibility: [
    'Keyboard accessible dropzone triggerable via Enter or Space key',
    'Hidden semantic file input accessible to assistive technologies',
    'Aria-live announcements for file upload progression, completion, and error states',
    'Respects prefers-reduced-motion with instant state changes',
  ],
  usageCode: `import { AnimatedFileUpload } from "@/components/ui/animated-file-upload";

export function Demo() {
  return (
    <div className="max-w-md mx-auto p-4">
      <AnimatedFileUpload
        multiple
        maxSize={10 * 1024 * 1024}
        accept="image/*,application/pdf"
        onFilesSelected={(files) => console.log('Selected:', files)}
        onUploadComplete={(file) => console.log('Uploaded:', file.name)}
      />
    </div>
  );
}`,
};

export default meta;
