import type {TemplateRef} from '@angular/core';
/** Angular TemplateRef maps to ReactNode; strings render as plain text. */
export interface AccordionItem{id:string;title:string;subtitle?:string;content:string|number|boolean|null|undefined|TemplateRef<unknown>;}
