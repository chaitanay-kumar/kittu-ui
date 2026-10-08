export interface UploadContext {
  signal: AbortSignal;
  onProgress: (percent: number) => void;
}
export type UploadHandler = (
  file: File,
  context: UploadContext,
) => Promise<void>;
export interface PromptPayload {
  text: string;
  attachments: File[];
}
export type SendHandler = (
  payload: PromptPayload,
  signal: AbortSignal,
) => Promise<void>;
export interface LiquidCommand {
  id: string;
  label: string;
  keywords?: string;
  disabled?: boolean;
  onSelect: () => void | Promise<void>;
}
export interface SwipeItem {
  id: string;
  title: string;
  description?: string;
}
export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  time?: string;
}
export function acceptsFile(file: File, accept: string): boolean {
  return (
    !accept.trim() ||
    accept.split(",").some((raw) => {
      const rule = raw.trim().toLowerCase();
      return rule.startsWith(".")
        ? file.name.toLowerCase().endsWith(rule)
        : rule.endsWith("/*")
          ? file.type.toLowerCase().startsWith(rule.slice(0, -1))
          : file.type.toLowerCase() === rule;
    })
  );
}
