import { Injectable, Type } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogContainerComponent } from '../_dialogs/dialog-container/dialog-container.component';
import { IDialogContainer, ContainedDialogBase } from '../_models/dialog-models';
@Injectable({
  providedIn: 'root'
})
export class DialogContainerService {
  private containerTypeSubject: ReplaySubject<Type<any>>;
  private dialogRef: MatDialogRef<any> = null;

  constructor(private dialog: MatDialog) {
    this.containerTypeSubject = new ReplaySubject<Type<any>>();

   }

// tslint:disable-next-line: max-line-length
  OpenComponentWithinContainerDialog<C extends Type<IDialogContainer>, R extends Type<ContainedDialogBase>>(containerDialogType: C, componentResideType: R, matDialogConfig?: MatDialogConfig): MatDialogRef<R> {
     this.containerTypeSubject.next(componentResideType);
     this.dialogRef = this.dialog.open(containerDialogType, matDialogConfig);
     return this.dialogRef;
   }


  getContainedObservable(): Observable<any> {
    return this.containerTypeSubject.asObservable();
  }

  // CloseDialog(data?: any) {
  //   if (this.dialogRef) {
  //     this.dialogRef.close(data);
  //   }
  // }


}
