import { FlowGraphComponent } from './flow-graph.component';
import { NgModule } from '@angular/core';
import { ToolbarGraphComponent } from './toolbar-flow-graph/toolbar-graph.component';
import { ClipboardModule } from 'ngx-clipboard';
import { LoadFlowGraphComponent } from './toolbar-flow-graph/load-flowgraph/load-flowgraph.component';
// tslint:disable-next-line:max-line-length
import { SaveFlowgraphComponent } from './toolbar-flow-graph/save-flowgraph/save-flowgraph.component';
import { JsonOverviewFlowGraphComponent } from './toolbar-flow-graph/json-overview-flowgraph/json-overview-flowgraph.component';
import { FlowGraphRoutingModule } from './flow-graph-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { FlowGraphItemService } from '../services/flowgraph-item.service';
import { AppLoadFlowGraphModule } from './toolbar-flow-graph/load-flowgraph/load-flowgraph.module';


@NgModule({
  declarations: [
    FlowGraphComponent,
    ToolbarGraphComponent,
    SaveFlowgraphComponent,
    JsonOverviewFlowGraphComponent
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
