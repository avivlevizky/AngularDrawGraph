import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildrenCallback } from '@angular/router';
import { AuthGuard } from './guards';
import { AppFlowGraphModule } from './components/flow-graph/flow-graph.module';
import { CallbackComponent } from './components/callback/callback.component';

const callBackFlowGraphModule: LoadChildrenCallback = () => AppFlowGraphModule;

const routes: Routes = [
  { path: 'flow_graph', loadChildren: callBackFlowGraphModule, canActivate: [AuthGuard]},
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
