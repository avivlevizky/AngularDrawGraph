import { OAuthModule } from 'angular-oauth2-oidc';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppFlowGraphModule } from './components/flow-graph/flow-graph.module';
import { DeleteComponent } from './components/dialogs/delete/delete.component';
import { DialogContainerComponent } from './components/dialogs/dialog-container/dialog-container.component';
import { DynamicAnchorDirective } from './components/dialogs/dialog-container/dynamic-anchor/dynamic-anchor.directive';
import { AlertComponent } from './components/alert/alert.component';
import { CallbackComponent } from './components/callback/callback.component';


@NgModule({
  declarations: [
    AppComponent,
    DeleteComponent,
    DialogContainerComponent,
    DynamicAnchorDirective,
    AlertComponent,
    CallbackComponent
    ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AppFlowGraphModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
     DeleteComponent,
     DialogContainerComponent
  ]
})
export class AppModule { }
