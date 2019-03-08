import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowGraphModelItemTableComponent } from './load-flowgraph/flowgraph-model-item-table/flowgraph-model-item-table.component';
import { SharedModule } from 'src/app/shared.module';
import { ToolbarManageComponent } from './toolbar-manage.component';
import { SaveFlowgraphComponent } from './save-flowgraph/save-flowgraph.component';
import { JsonOverviewFlowGraphComponent } from './json-overview-flowgraph/json-overview-flowgraph.component';
import { LoadFlowGraphComponent } from './load-flowgraph/load-flowgraph.component';


@NgModule({
  declarations: [
    ToolbarManageComponent,
    SaveFlowgraphComponent,
    JsonOverviewFlowGraphComponent,
    LoadFlowGraphComponent,
    FlowGraphModelItemTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ToolbarManageComponent,
    SaveFlowgraphComponent,
    JsonOverviewFlowGraphComponent,
    LoadFlowGraphComponent,
    FlowGraphModelItemTableComponent
  ],
  entryComponents: [SaveFlowgraphComponent, LoadFlowGraphComponent, JsonOverviewFlowGraphComponent]
})
export class ToolbarManageModule { }
