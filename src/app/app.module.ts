import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteComponent } from './_dialogs/delete/delete.component';
import { SharedModule } from './shared.module';
import { DialogContainerComponent } from './_dialogs/dialog-container/dialog-container.component';
import { DynamicAnchorDirective } from './_dialogs/dialog-container/dynamic-anchor/dynamic-anchor.directive';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';


@NgModule({
  declarations: [
    AppComponent,
    DeleteComponent,
    DialogContainerComponent,
    DynamicAnchorDirective,
    AlertComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
     DeleteComponent,
     DialogContainerComponent
  ]
})
export class AppModule { }
