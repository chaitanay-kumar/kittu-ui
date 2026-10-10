/** Native Angular data contracts. React render props become data or projected content. */
export interface KitItem {
  id: string;
  label: string;
  description?: string;
  value?: string | number;
  disabled?: boolean;
  children?: KitItem[];
  status?: string;
  image?: string;
  href?: string;
}
export interface KitTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}
export interface KitTableRow {
  id: string;
  [key: string]: string | number | boolean | undefined;
}
export interface KitField {
  key: string;
  label: string;
  type?: "text" | "email" | "password" | "tel";
  required?: boolean;
  minLength?: number;
}
export interface KitMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}
export interface KitGraphNode extends KitItem {
  x?: number;
  y?: number;
}
export interface KitGraphEdge {
  from: string;
  to: string;
  label?: string;
}
export interface KitPlan {
  id: string;
  label: string;
  price: number;
  features: string[];
  featured?: boolean;
}
export interface KitCompareFeature {
  id: string;
  label: string;
  values: Record<string, string | boolean>;
}
export interface KitCompareCategory {
  id: string;
  label: string;
  features: KitCompareFeature[];
}
export type KitTableAction = (
  rows: KitTableRow[],
  signal: AbortSignal,
) => void | Promise<void>;
export type KitAction = (signal: AbortSignal) => void | Promise<void>;
export type KitCollectionAction = (
  items: KitItem[],
  signal: AbortSignal,
) => void | Promise<void>;
export type KitSubmitHandler = (
  values: Record<string, string>,
  signal: AbortSignal,
) => void | Promise<void>;
export type KitChatHandler = (
  text: string,
  signal: AbortSignal,
) => Promise<string>;
