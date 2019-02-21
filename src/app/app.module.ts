import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { SharedModule } from './shared.module';
import { DialogContainerComponent } from './dialogs/dialog-container/dialog-container.component';
import { DynamicAnchorDirective } from './dialogs/dialog-container/dynamic-anchor/dynamic-anchor.directive';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    DeleteComponent,
    DialogContainerComponent,
    DynamicAnchorDirective
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
