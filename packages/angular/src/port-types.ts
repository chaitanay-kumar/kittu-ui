/** Native Angular data contracts. React render props become data or projected content. */
export interface KittuItem {
  id: string;
  label: string;
  description?: string;
  value?: string | number;
  disabled?: boolean;
  children?: KittuItem[];
  status?: string;
  image?: string;
  href?: string;
}
export interface KittuTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}
export interface KittuTableRow {
  id: string;
  [key: string]: string | number | boolean | undefined;
}
export interface KittuField {
  key: string;
  label: string;
  type?: "text" | "email" | "password" | "tel";
  required?: boolean;
  minLength?: number;
}
export interface KittuMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}
export interface KittuGraphNode extends KittuItem {
  x?: number;
  y?: number;
}
export interface KittuGraphEdge {
  from: string;
  to: string;
  label?: string;
}
export interface KittuPlan {
  id: string;
  label: string;
  price: number;
  features: string[];
  featured?: boolean;
}
export interface KittuCompareFeature {
  id: string;
  label: string;
  values: Record<string, string | boolean>;
}
export interface KittuCompareCategory {
  id: string;
  label: string;
  features: KittuCompareFeature[];
}
export type KittuTableAction = (
  rows: KittuTableRow[],
  signal: AbortSignal,
) => void | Promise<void>;
export type KittuAction = (signal: AbortSignal) => void | Promise<void>;
export type KittuCollectionAction = (
  items: KittuItem[],
  signal: AbortSignal,
) => void | Promise<void>;
export type KittuSubmitHandler = (
  values: Record<string, string>,
  signal: AbortSignal,
) => void | Promise<void>;
export type KittuChatHandler = (
  text: string,
  signal: AbortSignal,
) => Promise<string>;
