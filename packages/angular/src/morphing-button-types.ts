import type {TemplateRef} from '@angular/core';
export type ButtonStatusState='idle'|'loading'|'success'|'error';
export type MorphingButtonVariant='primary'|'secondary'|'danger'|'ghost';
/** Undefined uses the default Lucide icon; null removes it. */
export type MorphingButtonIcon=TemplateRef<unknown>|null;
