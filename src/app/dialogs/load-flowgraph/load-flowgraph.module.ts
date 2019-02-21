import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadFlowGraphComponent } from './load-flowgraph.component';
import { FlowGraphModelItemTableComponent } from './flowgraph-model-item-table/flowgraph-model-item-table.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [
    LoadFlowGraphComponent,
    FlowGraphModelItemTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoadFlowGraphComponent,
    FlowGraphModelItemTableComponent
  ]
})
export class AppLoadFlowGraphModule { }
