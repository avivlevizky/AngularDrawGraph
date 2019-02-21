// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type, Inject, Output, Injectable, ComponentRef, OnDestroy } from '@angular/core';
import { DynamicAnchorDirective } from './dynamic-anchor/dynamic-anchor.directive';
import { DialogContainerService } from 'src/app/services/dialog-container.service';
import { ContainedDialogBase, IDialogContainer } from 'src/app/_models/dialog-models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

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
    (<ContainedDialogBase>this.containedComponentRef.instance).inputDialogData = this.data;
    (<ContainedDialogBase>this.containedComponentRef.instance).dialogRef = this.dialogRef;


  }


}
