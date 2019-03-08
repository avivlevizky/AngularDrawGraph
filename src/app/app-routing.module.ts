import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';
import { CallbackComponent } from './_components';


const routes: Routes = [
  { path: 'flow_graph', loadChildren: './flow-graph/flow-graph.module#AppFlowGraphModule', canActivate: [AuthGuard]},
  { path: 'callback', component: CallbackComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'callback' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
