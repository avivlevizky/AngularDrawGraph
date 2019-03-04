import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';


const routes: Routes = [
  { path: '', redirectTo: 'flow_graph', pathMatch: 'full'}, // empty part is the root route
  { path: 'flow_graph', loadChildren: './flow-graph/flow-graph.module#AppFlowGraphModule'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
