// Generated from authored native templates in scripts/generate-angular-ports.ts.
import { Component, computed, input, model, output } from '@angular/core';
import type { KittuGraphNode, KittuGraphEdge } from './port-types';

@Component({
 selector:"kittu-dependency-trace", standalone:true,
 host:{'data-kittu':"dependency-trace",style:'display:block;min-width:0'},
 template:`
<section class="kittu-control kittu-surface kittu-stack">
<h3>{{label()}}</h3>
<div class="k-graph">
<svg viewBox="0 0 400 260" aria-hidden="true">@for(edge of edges();track edge.from+'-'+edge.to){<line [attr.x1]="point(edge.from).x" [attr.y1]="point(edge.from).y" [attr.x2]="point(edge.to).x" [attr.y2]="point(edge.to).y" [class.k-connected]="edge.from===selected()||edge.to===selected()" />}</svg>@for(node of positioned();track node.id){<button type="button" class="k-graph-node" [style.left.%]="node.x/4" [style.top.%]="node.y/2.6" [disabled]="disabled()||node.disabled" [attr.aria-pressed]="selected()===node.id" (click)="select(node)" (pointerenter)="nodeHover.emit(node.id)" (pointerleave)="nodeHover.emit(null)">{{node.label}}</button>}</div>
<p role="status">{{selected()?'Selected node: '+selected():'Select a dependency to inspect its connections.'}}</p>
</section>
`
})
export class KittuDependencyTraceComponent {
readonly nodes=input<KittuGraphNode[]>([{id:'client',label:'Client'},{id:'api',label:'API'},{id:'db',label:'Database'}]);readonly connections=input<KittuGraphEdge[]>([{from:'client',to:'api'},{from:'api',to:'db'}]);readonly selected=model('');readonly label=input('Dependency trace');readonly disabled=input(false);readonly nodeSelect=output<KittuGraphNode>();readonly nodeHover=output<string|null>();readonly positioned=computed(()=>this.nodes().map((node,i)=>({...node,x:Math.max(45,Math.min(355,node.x??200+Math.cos(i/Math.max(1,this.nodes().length)*Math.PI*2-Math.PI/2)*135)),y:Math.max(30,Math.min(230,node.y??130+Math.sin(i/Math.max(1,this.nodes().length)*Math.PI*2-Math.PI/2)*85))})));readonly edges=computed(()=>this.connections().filter(edge=>this.nodes().some(n=>n.id===edge.from)&&this.nodes().some(n=>n.id===edge.to)));point(id:string):{x:number;y:number}{return this.positioned().find(n=>n.id===id)??{x:0,y:0};}select(node:KittuGraphNode):void{if(this.disabled()||node.disabled)return;this.selected.set(node.id);this.nodeSelect.emit(node);}
}
