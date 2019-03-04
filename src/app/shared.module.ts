import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { LoaderModule } from './_loader/loader.module';
import { ImportGraphService } from './_services';
import { LoaderService } from './_services';
import { DialogContainerService } from './_services';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})
export class SharedModule { }
