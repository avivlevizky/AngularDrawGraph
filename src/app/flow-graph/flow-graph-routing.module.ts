import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowGraphComponent } from './flow-graph.component';


const routes: Routes = [
  {
    path: '',
    component: FlowGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowGraphRoutingModule { }
