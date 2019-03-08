// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type, Inject, Output, Injectable, ComponentRef, OnDestroy } from '@angular/core';
import { DynamicAnchorDirective } from './dynamic-anchor/dynamic-anchor.directive';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { IDialogContainer, ContainedDialogBase } from 'src/app/models';
import { DialogContainerService } from 'src/app/services';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})


export class DialogContainerComponent implements OnInit, OnDestroy, IDialogContainer {
  @ViewChild(DynamicAnchorDirective) appDynamicAnchor: DynamicAnchorDirective;
  containedComponent: Type<ContainedDialogBase>;
  containedComponentRef: ComponentRef<ContainedDialogBase>;
  subscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dialogContainerService: DialogContainerService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<any>) {
  }

  ngOnInit() {
    this.subscription = this.dialogContainerService.getContainedObservable().subscribe(c => this.containedComponent = c);
    this.loadComponent();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.containedComponent);
    const viewContainerRef = this.appDynamicAnchor.viewContainerRef;
    viewContainerRef.clear();
    this.containedComponentRef = viewContainerRef.createComponent(componentFactory);
    ( this.containedComponentRef.instance as ContainedDialogBase).inputDialogData = this.data;
    ( this.containedComponentRef.instance as ContainedDialogBase).dialogRef = this.dialogRef;


  }


}
