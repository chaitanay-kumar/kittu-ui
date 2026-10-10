// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, input } from '@angular/core';
import { KitSmartUploadComponent } from './smart-upload.component';
import type { UploadHandler } from './types';
@Component({
 selector:"kit-animated-file-upload", standalone:true,
 host:{'data-kit':"animated-file-upload",style:'display:block;min-width:0'},
 imports:[KitSmartUploadComponent],
template:`
<kit-smart-upload [accept]="accept()" [maxFiles]="maxFiles()" [maxSize]="maxSize()" [disabled]="disabled()" [upload]="upload()" />
`
})
export class KitAnimatedFileUploadComponent {
readonly accept=input('image/*,.pdf');readonly maxFiles=input(5);readonly maxSize=input(10*1024*1024);readonly disabled=input(false);readonly upload=input<UploadHandler>();
}
