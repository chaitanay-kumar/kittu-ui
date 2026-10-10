// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { ViewEncapsulation, Component, input } from '@angular/core';
import { KittuSmartUploadComponent } from './smart-upload.component';
import type { UploadHandler } from './types';
@Component({
 selector:"kittu-animated-file-upload", standalone:true,
 host:{'data-kittu':"animated-file-upload",style:'display:block;min-width:0'},
 imports:[KittuSmartUploadComponent],
template:`
<kittu-smart-upload [accept]="accept()" [maxFiles]="maxFiles()" [maxSize]="maxSize()" [disabled]="disabled()" [upload]="upload()" />
`
})
export class KittuAnimatedFileUploadComponent {
readonly accept=input('image/*,.pdf');readonly maxFiles=input(5);readonly maxSize=input(10*1024*1024);readonly disabled=input(false);readonly upload=input<UploadHandler>();
}
