import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { LoaderModule } from './loader/loader.module';
import { ImportGraphService } from './services/import-graph.service';
import { LoaderService } from './services/loader.service';
import { DialogContainerComponent } from './dialogs/dialog-container/dialog-container.component';
import { DialogContainerService } from './services/dialog-container.service';
import { WebAPIService } from './services/web-api.service';

@NgModule({
  imports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxJsonViewerModule,
    LoaderModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxJsonViewerModule,
    LoaderModule
  ],
  providers: [
    ImportGraphService,
    LoaderService,
    DialogContainerService,
    WebAPIService
    ]
})
export class SharedModule { }
