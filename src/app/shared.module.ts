import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ImportGraphService, LoaderService, DialogContainerService } from './services';
import { TokenInterceptor, ErrorInterceptor, LoaderInterceptor } from './helpers';
import { ClipboardModule } from 'ngx-clipboard';
import { LoaderModule } from './components/loader/loader.module';


@NgModule({
  imports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxJsonViewerModule,
    ClipboardModule,
    LoaderModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxJsonViewerModule,
    OAuthModule,
    ClipboardModule,
    LoaderModule
  ],
  providers: [
    ImportGraphService,
    LoaderService,
    DialogContainerService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ]
})
export class SharedModule { }
