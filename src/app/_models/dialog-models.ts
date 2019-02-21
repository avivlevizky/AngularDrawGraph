import { DialogContainerService } from '../services/dialog-container.service';
import { MatDialogRef } from '@angular/material';


/*Dialog container responsible to create the given container within the dialog container*/
export interface IDialogContainer {
    loadComponent();
}


/*All the desired components that used as dialog must extend this abstract class*/
export abstract class ContainedDialogBase {
    inputDialogData: any = null;
    dialogRef: MatDialogRef<ContainedDialogBase> = null;

    closeDialog(dialogResult?: any) {
        if (this.dialogRef) {
            this.dialogRef.close(dialogResult);
          }
    }
}

