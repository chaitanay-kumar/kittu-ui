/** Native implementations for components with independent state/data contracts. */
export const COMPLEX_PORTS = [
  {
    id: "advanced-data-table",
    kind: "plain" as const,
    description:
      "A responsive data table with sorting, global and column filters, selection, column visibility, row details, pagination and application-owned bulk actions.",
    inputs: [
      "data: KittuTableRow[]",
      "columns: KittuTableColumn[]",
      "label: string",
      "loading: boolean",
      "error: string",
      "disabled: boolean",
      "page: number (two-way)",
      "pageSize: number",
      "selectedIds: string[] (two-way)",
      "bulkAction: KittuTableAction",
    ],
    outputs: ["rowSelect: KittuTableRow", "bulkComplete: KittuTableRow[]"],
    imports: "import type { KittuTableAction } from './port-types';",
    template: `<section class="kittu-control kittu-surface kittu-stack" [attr.aria-busy]="loading()||busy()"><h3>{{label()}}</h3><label>Search rows<input type="search" [value]="query()" [disabled]="disabled()" (input)="query.set($any($event.target).value);page.set(1)" /></label><details><summary>Columns and filters</summary><div class="kittu-stack">@for(column of columns();track column.key){<div class="kittu-row"><label><input type="checkbox" [checked]="!hidden().includes(column.key)" [disabled]="disabled()||(!hidden().includes(column.key)&&visibleColumns().length===1)" (change)="toggleColumn(column.key)" />{{column.label}}</label>@if(column.filterable){<label>Filter {{column.label}}<select [disabled]="disabled()" [value]="filters()[column.key]||''" (change)="filter(column.key,$any($event.target).value)"><option value="">All</option>@for(value of options(column.key);track value){<option [value]="value">{{value}}</option>}</select></label>}</div>}</div></details><div class="kittu-row"><span>{{selectedIds().length}} selected</span><button type="button" [disabled]="disabled()||busy()||!selectedRows().length" (click)="apply()">{{busy()?'Applying…':'Apply bulk action'}}</button></div>@if(error()){<p role="alert">{{error()}}</p>}@if(loading()){<p role="status">Loading rows…</p>}@else{<div class="k-table-scroll" tabindex="0" aria-label="Scrollable data table"><table><caption class="sr-only">{{label()}}</caption><thead><tr><th scope="col"><input type="checkbox" aria-label="Select all filtered rows" [checked]="allSelected()" [disabled]="disabled()||busy()||!filtered().length" (change)="toggleAll()" /></th>@for(column of visibleColumns();track column.key){<th scope="col" [attr.aria-sort]="sortKey()===column.key?(direction()===1?'ascending':'descending'):'none'"><button type="button" [disabled]="disabled()||column.sortable===false" (click)="sort(column.key)">{{column.label}} {{sortKey()===column.key?(direction()===1?'↑':'↓'):''}}</button></th>}<th scope="col">Details</th></tr></thead><tbody>@for(row of paginated();track row.id){<tr><td><input type="checkbox" [attr.aria-label]="'Select row '+row.id" [checked]="selectedIds().includes(row.id)" [disabled]="disabled()||busy()" (change)="toggleRow(row.id)" /></td>@for(column of visibleColumns();track column.key){<td>{{row[column.key]}}</td>}<td><button type="button" [disabled]="disabled()" [attr.aria-expanded]="expanded().includes(row.id)" (click)="expand(row)">Details <span class="sr-only">{{row.id}}</span></button></td></tr>@if(expanded().includes(row.id)){<tr><td [attr.colspan]="visibleColumns().length+2"><pre class="k-code">{{details(row)}}</pre></td></tr>}}@empty{<tr><td [attr.colspan]="visibleColumns().length+2">No matching rows.</td></tr>}</tbody></table></div>}<div class="kittu-row"><button type="button" [disabled]="disabled()||safePage()<=1" (click)="page.set(safePage()-1)">Previous page</button><span>Page {{safePage()}} of {{pages()}} · {{filtered().length}} rows</span><button type="button" [disabled]="disabled()||safePage()>=pages()" (click)="page.set(safePage()+1)">Next page</button></div><p role="status">{{status()}}</p>@if(actionError()){<p role="alert">{{actionError()}}</p>}</section>`,
    body: `readonly label=input('Workspace tasks');readonly data=input<KittuTableRow[]>([{id:'1',name:'Design tokens',status:'Ready',priority:1},{id:'2',name:'Angular components',status:'In progress',priority:2},{id:'3',name:'Documentation',status:'Ready',priority:3}]);readonly columns=input<KittuTableColumn[]>([{key:'name',label:'Task',sortable:true},{key:'status',label:'Status',sortable:true,filterable:true},{key:'priority',label:'Priority',sortable:true}]);readonly disabled=input(false);readonly loading=input(false);readonly error=input('');readonly page=model(1);readonly pageSize=input(5);readonly selectedIds=model<string[]>([]);readonly bulkAction=input<KittuTableAction>();readonly rowSelect=output<KittuTableRow>();readonly bulkComplete=output<KittuTableRow[]>();readonly query=signal('');readonly sortKey=signal('');readonly direction=signal(1);readonly filters=signal<Record<string,string>>({});readonly hidden=signal<string[]>([]);readonly expanded=signal<string[]>([]);readonly busy=signal(false);readonly status=signal('');readonly actionError=signal('');private controller?:AbortController;private destroyed=false;
readonly visibleColumns=computed(()=>this.columns().filter(c=>!this.hidden().includes(c.key)));readonly size=computed(()=>Math.max(1,Math.min(100,Math.floor(this.pageSize()))));readonly filtered=computed(()=>{const query=this.query().toLowerCase();const rows=this.data().filter(row=>Object.values(row).some(value=>String(value).toLowerCase().includes(query))&&Object.entries(this.filters()).every(([key,value])=>!value||String(row[key])===value));const key=this.sortKey();if(!key)return rows;return [...rows].sort((a,b)=>this.direction()*(typeof a[key]==='number'&&typeof b[key]==='number'?(a[key] as number)-(b[key] as number):String(a[key]??'').localeCompare(String(b[key]??''),undefined,{numeric:true})));});readonly pages=computed(()=>Math.max(1,Math.ceil(this.filtered().length/this.size())));readonly safePage=computed(()=>Math.max(1,Math.min(this.pages(),this.page())));readonly paginated=computed(()=>this.filtered().slice((this.safePage()-1)*this.size(),this.safePage()*this.size()));readonly selectedRows=computed(()=>this.data().filter(row=>this.selectedIds().includes(row.id)));readonly allSelected=computed(()=>this.filtered().length>0&&this.filtered().every(row=>this.selectedIds().includes(row.id)));
constructor(){inject(DestroyRef).onDestroy(()=>{this.destroyed=true;this.controller?.abort();});}options(key:string):string[]{return [...new Set(this.data().map(row=>String(row[key]??'')))];}filter(key:string,value:string):void{this.filters.update(v=>({...v,[key]:value}));this.page.set(1);}sort(key:string):void{if(this.sortKey()===key)this.direction.update(v=>-v);else{this.sortKey.set(key);this.direction.set(1);}}toggleColumn(key:string):void{this.hidden.update(a=>a.includes(key)?a.filter(k=>k!==key):[...a,key]);}toggleRow(id:string):void{this.selectedIds.update(a=>a.includes(id)?a.filter(k=>k!==id):[...a,id]);}toggleAll():void{const ids=this.filtered().map(r=>r.id);this.selectedIds.update(a=>this.allSelected()?a.filter(id=>!ids.includes(id)):[...new Set([...a,...ids])]);}expand(row:KittuTableRow):void{this.expanded.update(a=>a.includes(row.id)?a.filter(id=>id!==row.id):[...a,row.id]);this.rowSelect.emit(row);}details(row:KittuTableRow):string{return JSON.stringify(row,null,2);}async apply():Promise<void>{if(this.disabled()||this.busy()||!this.selectedRows().length)return;this.actionError.set('');const rows=[...this.selectedRows()];const handler=this.bulkAction();if(!handler){this.bulkComplete.emit(rows);this.status.set('Bulk action requested.');return;}const controller=new AbortController();this.controller=controller;this.busy.set(true);try{await handler(rows,controller.signal);if(!this.destroyed&&!controller.signal.aborted){this.bulkComplete.emit(rows);this.status.set('Bulk action completed.');}}catch(error){if(!this.destroyed)this.actionError.set(error instanceof Error?error.message:'Bulk action failed. Selection preserved.');}finally{if(!this.destroyed)this.busy.set(false);}}`,
  },
  {
    id: "dependency-trace",
    kind: "plain" as const,
    description:
      "An SVG dependency graph with selectable nodes, highlighted connections and keyboard-accessible node buttons.",
    inputs: [
      "nodes: KittuGraphNode[]",
      "connections: KittuGraphEdge[]",
      "selected: string (two-way)",
      "label: string",
      "disabled: boolean",
    ],
    outputs: ["nodeSelect: KittuGraphNode", "nodeHover: string | null"],
    template: `<section class="kittu-control kittu-surface kittu-stack"><h3>{{label()}}</h3><div class="k-graph"><svg viewBox="0 0 400 260" aria-hidden="true">@for(edge of edges();track edge.from+'-'+edge.to){<line [attr.x1]="point(edge.from).x" [attr.y1]="point(edge.from).y" [attr.x2]="point(edge.to).x" [attr.y2]="point(edge.to).y" [class.k-connected]="edge.from===selected()||edge.to===selected()" />}</svg>@for(node of positioned();track node.id){<button type="button" class="k-graph-node" [style.left.%]="node.x/4" [style.top.%]="node.y/2.6" [disabled]="disabled()||node.disabled" [attr.aria-pressed]="selected()===node.id" (click)="select(node)" (pointerenter)="nodeHover.emit(node.id)" (pointerleave)="nodeHover.emit(null)">{{node.label}}</button>}</div><p role="status">{{selected()?'Selected node: '+selected():'Select a dependency to inspect its connections.'}}</p></section>`,
    body: `readonly nodes=input<KittuGraphNode[]>([{id:'client',label:'Client'},{id:'api',label:'API'},{id:'db',label:'Database'}]);readonly connections=input<KittuGraphEdge[]>([{from:'client',to:'api'},{from:'api',to:'db'}]);readonly selected=model('');readonly label=input('Dependency trace');readonly disabled=input(false);readonly nodeSelect=output<KittuGraphNode>();readonly nodeHover=output<string|null>();readonly positioned=computed(()=>this.nodes().map((node,i)=>({...node,x:Math.max(45,Math.min(355,node.x??200+Math.cos(i/Math.max(1,this.nodes().length)*Math.PI*2-Math.PI/2)*135)),y:Math.max(30,Math.min(230,node.y??130+Math.sin(i/Math.max(1,this.nodes().length)*Math.PI*2-Math.PI/2)*85))})));readonly edges=computed(()=>this.connections().filter(edge=>this.nodes().some(n=>n.id===edge.from)&&this.nodes().some(n=>n.id===edge.to)));point(id:string):{x:number;y:number}{return this.positioned().find(n=>n.id===id)??{x:0,y:0};}select(node:KittuGraphNode):void{if(this.disabled()||node.disabled)return;this.selected.set(node.id);this.nodeSelect.emit(node);}`,
  },
  {
    id: "pricing",
    kind: "plain" as const,
    description:
      "Selectable pricing plans with monthly/yearly billing, real price inputs and an application-owned selection event.",
    inputs: [
      "plans: KittuPlan[]",
      "yearly: boolean (two-way)",
      "yearlyDiscount: number",
      "currency: string",
      "disabled: boolean",
    ],
    outputs: ["planSelect: { plan: KittuPlan; yearly: boolean }"],
    template: `<section class="kittu-control kittu-stack"><label class="kittu-row"><input type="checkbox" [checked]="yearly()" [disabled]="disabled()" (change)="yearly.set($any($event.target).checked)" />Yearly billing · {{yearlyDiscount()}}% discount</label><div class="k-pricing">@for(plan of plans();track plan.id){<article class="kittu-surface kittu-stack" [class.k-featured]="plan.featured"><h3>{{plan.label}}</h3><p class="k-price">{{price(plan)}} <small>/{{yearly()?'year':'month'}}</small></p><ul>@for(feature of plan.features;track $index){<li>{{feature}}</li>}</ul><button type="button" [disabled]="disabled()" (click)="planSelect.emit({plan,yearly:yearly()})">Choose {{plan.label}}</button></article>}</div></section>`,
    body: `readonly plans=input<KittuPlan[]>([{id:'starter',label:'Starter',price:12,features:['Core components','One workspace']},{id:'team',label:'Team',price:24,features:['Shared workspace','Team controls'],featured:true}]);readonly yearly=model(false);readonly yearlyDiscount=input(20);readonly currency=input('USD');readonly disabled=input(false);readonly planSelect=output<{plan:KittuPlan;yearly:boolean}>();price(plan:KittuPlan):string{const value=this.yearly()?plan.price*12*(1-Math.max(0,Math.min(100,this.yearlyDiscount()))/100):plan.price;try{return new Intl.NumberFormat('en',{style:'currency',currency:this.currency()}).format(value);}catch{return value.toFixed(2)+' '+this.currency();}}`,
  },
  {
    id: "smart-comparison",
    kind: "plain" as const,
    description:
      "Searchable plan comparison with differences-only filtering, collapsible categories and plan selection.",
    inputs: [
      "plans: KittuPlan[]",
      "features: KittuCompareFeature[]",
      "categories: KittuCompareCategory[]",
      "selected: string (two-way)",
      "disabled: boolean",
    ],
    outputs: ["planSelect: KittuPlan"],
    imports: "import type { KittuCompareCategory } from './port-types';",
    template: `<section class="kittu-control kittu-surface kittu-stack"><label>Find a feature<input type="search" [value]="query()" [disabled]="disabled()" (input)="query.set($any($event.target).value)" /></label><label class="kittu-row"><input type="checkbox" [checked]="differences()" [disabled]="disabled()" (change)="differences.set($any($event.target).checked)" />Show differences only</label><div class="k-table-scroll" tabindex="0" aria-label="Plan comparison"><table><thead><tr><th scope="col">Feature</th>@for(plan of plans();track plan.id){<th scope="col"><button type="button" [disabled]="disabled()" [attr.aria-pressed]="selected()===plan.id" (click)="selected.set(plan.id);planSelect.emit(plan)">{{plan.label}}</button></th>}</tr></thead><tbody>@for(group of groups();track group.id){<tr><th [attr.colspan]="plans().length+1"><button type="button" [attr.aria-expanded]="!collapsed().includes(group.id)" (click)="toggle(group.id)">{{group.label}}</button></th></tr>@if(!collapsed().includes(group.id)){@for(feature of filtered(group.features);track feature.id){<tr><th scope="row">{{feature.label}}</th>@for(plan of plans();track plan.id){<td>{{cell(feature.values[plan.id])}}</td>}</tr>}@empty{<tr><td [attr.colspan]="plans().length+1">No matching features.</td></tr>}}}</tbody></table></div></section>`,
    body: `readonly plans=input<KittuPlan[]>([{id:'starter',label:'Starter',price:12,features:[]},{id:'team',label:'Team',price:24,features:[]}]);readonly features=input<KittuCompareFeature[]>([{id:'components',label:'Components',values:{starter:true,team:true}},{id:'members',label:'Members',values:{starter:'1',team:'Unlimited'}},{id:'support',label:'Priority support',values:{starter:false,team:true}}]);readonly categories=input<KittuCompareCategory[]>([]);readonly selected=model('');readonly disabled=input(false);readonly planSelect=output<KittuPlan>();readonly query=signal('');readonly differences=signal(false);readonly collapsed=signal<string[]>([]);readonly groups=computed(()=>this.categories().length?this.categories():[{id:'features',label:'Plan features',features:this.features()}]);filtered(features:KittuCompareFeature[]):KittuCompareFeature[]{return features.filter(f=>f.label.toLowerCase().includes(this.query().toLowerCase())&&(!this.differences()||new Set(this.plans().map(p=>f.values[p.id])).size>1));}cell(value:string|boolean|undefined):string{return value===true?'Included':value===false?'Not included':value??'—';}toggle(id:string):void{this.collapsed.update(a=>a.includes(id)?a.filter(x=>x!==id):[...a,id]);}`,
  },
  {
    id: "chat",
    kind: "plain" as const,
    description:
      "An application-connected conversation with sending, cancellation, retry, preserved drafts and accessible message history.",
    inputs: [
      "messages: KittuMessage[] (two-way)",
      "sendHandler: KittuChatHandler",
      "disabled: boolean",
      "label: string",
    ],
    outputs: ["messageSent: KittuMessage"],
    template: `<section class="kittu-control kittu-surface kittu-stack"><h3>{{label()}}</h3><ol class="k-chat-log" aria-label="Conversation">@for(message of messages();track message.id){<li [class.k-chat-user]="message.role==='user'"><strong>{{message.role==='user'?'You':'Assistant'}}</strong><p>{{message.text}}</p></li>}@empty{<li>No messages yet.</li>}</ol><form class="kittu-stack" (submit)="send($event)"><label>Message<textarea [value]="draft()" [disabled]="disabled()||busy()" (input)="draft.set($any($event.target).value)" required rows="3"></textarea></label><button type="submit" [disabled]="disabled()||busy()||!draft().trim()||!sendHandler()">{{busy()?'Sending…':error()?'Retry message':'Send message'}}</button>@if(busy()){<button type="button" (click)="cancel()">Cancel</button>}</form>@if(!sendHandler()){<p>Connect a chat handler to send messages.</p>}@if(error()){<p role="alert">{{error()}}</p>}<p role="status">{{status()}}</p></section>`,
    body: `readonly messages=model<KittuMessage[]>([]);readonly sendHandler=input<KittuChatHandler>();readonly disabled=input(false);readonly label=input('Conversation');readonly draft=signal('');readonly busy=signal(false);readonly error=signal('');readonly status=signal('');readonly messageSent=output<KittuMessage>();private controller?:AbortController;private destroyed=false;constructor(){inject(DestroyRef).onDestroy(()=>{this.destroyed=true;this.controller?.abort();});}async send(event:SubmitEvent):Promise<void>{event.preventDefault();const handler=this.sendHandler();const text=this.draft().trim();if(!handler||!text||this.disabled()||this.busy())return;const controller=new AbortController();this.controller=controller;this.error.set('');this.status.set('Sending message…');this.busy.set(true);try{const reply=await handler(text,controller.signal);if(this.destroyed||controller.signal.aborted)return;const message:KittuMessage={id:crypto.randomUUID(),role:'user',text};this.messages.update(a=>[...a,message,{id:crypto.randomUUID(),role:'assistant',text:reply}]);this.messageSent.emit(message);this.draft.set('');this.status.set('Message received.');}catch(error){if(!this.destroyed&&!controller.signal.aborted){this.error.set(error instanceof Error?error.message:'Sending failed. Your draft is preserved.');this.status.set('Sending failed.');}}finally{if(!this.destroyed&&this.controller===controller){this.busy.set(false);this.controller=undefined;}}}cancel():void{this.controller?.abort();this.controller=undefined;this.busy.set(false);this.status.set('Cancelled. Your draft is preserved.');}`,
  },
  {
    id: "ai-response",
    kind: "plain" as const,
    description:
      "Application-provided response text with optional progressive reveal, reasoning disclosure, sources and clipboard feedback.",
    inputs: [
      "text: string",
      "reasoning: string",
      "sources: KittuItem[]",
      "state: 'idle' | 'pending' | 'success' | 'error'",
      "error: string",
      "streaming: boolean",
      "charactersPerSecond: number",
    ],
    outputs: ["retry: void"],
    template: `<article class="kittu-control kittu-surface kittu-stack" [attr.aria-busy]="state()==='pending'"><h3>Assistant response</h3>@if(reasoning()){<details><summary>Reasoning details</summary><p>{{reasoning()}}</p></details>}<p class="k-response-text">{{rendered()}}</p>@if(state()==='pending'){<p role="status">Response pending…</p>}@if(state()==='error'){<p role="alert">{{error()||'Response failed.'}}</p><button type="button" (click)="retry.emit()">Retry response</button>}<ul>@for(source of sources();track source.id){<li>@if(source.href){<a [href]="source.href" target="_blank" rel="noopener noreferrer">{{source.label}}</a>}@else{ {{source.label}} }</li>}</ul><button type="button" [disabled]="!text()" (click)="copy()">Copy response</button><p role="status">{{status()}}</p></article>`,
    body: `readonly text=input('An application-provided answer appears here.');readonly reasoning=input('');readonly sources=input<KittuItem[]>([]);readonly state=input<'idle'|'pending'|'success'|'error'>('idle');readonly error=input('');readonly streaming=input(false);readonly charactersPerSecond=input(40);readonly rendered=signal('');readonly status=signal('');readonly retry=output<void>();private timer:ReturnType<typeof setInterval>|undefined;constructor(){inject(DestroyRef).onDestroy(()=>clearInterval(this.timer));effect(()=>{const text=this.text();const streaming=this.streaming();const speed=Math.max(1,Math.min(1000,this.charactersPerSecond()));clearInterval(this.timer);if(!streaming||typeof matchMedia==='undefined'||matchMedia('(prefers-reduced-motion: reduce)').matches){this.rendered.set(text);return;}let index=0;this.rendered.set('');this.timer=setInterval(()=>{index=Math.min(text.length,index+Math.max(1,Math.ceil(speed/20)));this.rendered.set(text.slice(0,index));if(index>=text.length)clearInterval(this.timer);},50);});}async copy():Promise<void>{try{await navigator.clipboard.writeText(this.text());this.status.set('Copied.');}catch{this.status.set('Clipboard unavailable. Select the response to copy it manually.');}}`,
  },
];
