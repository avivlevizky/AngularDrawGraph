import { FlowGraphComponent } from './flow-graph.component';
import { NgModule } from '@angular/core';
import { ToolbarGraphComponent } from './toolbar-flow-graph/toolbar-graph.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { FlowGraphItemService } from 'src/app/services';
import { FlowGraphRoutingModule } from './flow-graph-routing.module';
import { ToolbarManageModule } from './toolbar-manage/toolbar-manage.module';

@NgModule({
  declarations: [
    FlowGraphComponent,
    ToolbarGraphComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlowGraphRoutingModule,
    ToolbarManageModule
  ],
  exports: [
    FlowGraphComponent,
    ToolbarGraphComponent,
    FlowGraphRoutingModule
  ],
  providers: [
    FlowGraphItemService
  ]
})
export class AppFlowGraphModule { }
