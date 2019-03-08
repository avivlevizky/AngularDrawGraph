import { MaterialModule } from './../../material.module';
import { LoaderComponent } from './loader.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoaderComponent
  ]

})
export class LoaderModule { }
