import { FlowGraphComponent } from './flow-graph.component';
import { NgModule } from '@angular/core';
import { ToolbarGraphComponent } from './toolbar-flow-graph/toolbar-graph.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FlowGraphRoutingModule } from './flow-graph-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { FlowGraphItemService } from '../_services';
import { ToolbarManageComponent } from './toolbar-manage/toolbar-manage.component';
import { SaveFlowgraphComponent, JsonOverviewFlowGraphComponent, LoadFlowGraphComponent } from './toolbar-manage';
import { AppLoadFlowGraphModule } from './toolbar-manage/load-flowgraph/load-flowgraph.module';

@NgModule({
  declarations: [
    FlowGraphComponent,
    ToolbarGraphComponent,
    SaveFlowgraphComponent,
    JsonOverviewFlowGraphComponent,
    ToolbarManageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClipboardModule,
    FlowGraphRoutingModule,
    AppLoadFlowGraphModule
  ],
  exports: [
    FlowGraphComponent,
    ToolbarGraphComponent,
  ],
  providers: [
    FlowGraphItemService
  ],
  entryComponents: [SaveFlowgraphComponent, LoadFlowGraphComponent, JsonOverviewFlowGraphComponent]
})
export class AppFlowGraphModule { }
