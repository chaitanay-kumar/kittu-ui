import type {TemplateRef} from '@angular/core';

/** React label nodes become text or an Angular template. */
export type StretchSwitchLabel = string | number | boolean | TemplateRef<unknown> | null;
export type StretchSwitchChangeHandler = (checked: boolean) => void;
