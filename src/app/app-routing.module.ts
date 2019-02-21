import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'flow_graph', pathMatch: 'full'}, // empty part is the root route
  { path: 'flow_graph', loadChildren: './flow-graph/flow-graph.module#AppFlowGraphModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
