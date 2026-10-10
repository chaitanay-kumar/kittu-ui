/** Standalone native consumer with no host theme stylesheet. */
import '@angular/compiler';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { KittuAdvancedDataTableComponent } from '../../packages/angular/dist/fesm2022/kittu-ui-angular.mjs';
class Consumer {readonly rows=[{id:'one',name:'First record'},{id:'two',name:'Second record'}];readonly columns=[{id:'name',header:'Name',accessorKey:'name',sortable:true}];}
Component({selector:'parity-table',standalone:true,imports:[KittuAdvancedDataTableComponent],template:`<kittu-advanced-data-table title="Standalone table" [data]="rows" [columns]="columns"/>`})(Consumer);
document.body.style.margin='0';document.body.style.padding='16px';
const wrapper=document.createElement('div');wrapper.style.maxWidth='672px';wrapper.style.margin='auto';wrapper.innerHTML='<parity-table></parity-table>';document.body.append(wrapper);
void bootstrapApplication(Consumer,{providers:[provideZonelessChangeDetection()]});
