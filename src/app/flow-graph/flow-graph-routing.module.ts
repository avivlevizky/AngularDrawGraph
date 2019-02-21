import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowGraphComponent } from './flow-graph.component';


const routes: Routes = [
  {
    path: '',
    component: FlowGraphComponent,
    data: {breadcrumb: 'Flow Graph'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowGraphRoutingModule { }
