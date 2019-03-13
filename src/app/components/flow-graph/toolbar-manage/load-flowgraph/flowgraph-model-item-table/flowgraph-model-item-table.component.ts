import { Component, Input } from '@angular/core';
import { LoadFlowGraphComponent } from '../load-flowgraph.component';
import { FlowGraphModelItem, FlowGraphItem } from 'src/app/models';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { FlowGraphItemService, ImportGraphService } from 'src/app/services';
import { Router } from '@angular/router';
import { DeleteComponent } from 'src/app/components/dialogs/delete/delete.component';

@Component({
  selector: 'app-flowgraph-model-item-table',
  templateUrl: './flowgraph-model-item-table.component.html',
  styleUrls: ['./flowgraph-model-item-table.component.css']
})
export class FlowGraphModelItemTableComponent {
  @Input() data: FlowGraphModelItem[];
  @Input() parentData: FlowGraphItem;
  @Input() dialogRef: MatDialogRef<LoadFlowGraphComponent>;


  displayedColumns: string[] = [ 'Actions', 'TimeStamp', 'Comment', 'IdentityName'];

  constructor(private database: FlowGraphItemService,
              private impotGraphService: ImportGraphService,
              public router: Router,
              private importGraphService: ImportGraphService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {}


  onClickCopyLoad(element: FlowGraphModelItem) {
    try {
      console.log(element);
      this.impotGraphService.ImportXmlGraph(this.parentData._id, this.parentData._t, element.xml);
      this.snackBar.open('FlowGraph is loaded successfully', null, {duration: 1500});
      this.dialogRef.close();
    } catch (e) {
      this.snackBar.open('Unable to complete the operation', null, {duration: 1500});
      console.exception(e);
    }

  }

   onClickDelete(id: string, item: FlowGraphModelItem) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px',
      data: {caller: 'FlowGraph'}
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if (await this.deleteFlowGraphItem(id, item)) {
        this.snackBar.open('The flowGraph ID ' + id + ' is successfully deleted', null, {duration: 1500});
        this.dialogRef.close();
      } else {
        console.error('Bad request from webapi when trying to delete the flowGraph');
        this.snackBar.open('Failded to delete the selected FlowGraph', null, {duration: 1500});

      }

        this.dialog.open(LoadFlowGraphComponent, {width: '700px', height: '500px'});
      }
    });
  }

  private async deleteFlowGraphItem(id: string, item: FlowGraphModelItem): Promise<boolean> {
   // let isDeleteRequestSuccess: boolean;
    const index: number = this.data.findIndex(x => x === item);
    this.data.splice(index, 1);
    return await this.database.updateFlowGraphItem(id, this.parentData).toPromise();


    // .subscribe({
    //   next: respond => isDeleteRequestSuccess = respond,
    //   error: e => console.exception('Exception when trying to save exist FlowGraph' + e),
    //   complete: () => {return isDeleteRequestSuccess;}
    // });
  }


  clickStopper(event) {
    event.stopPropagation();
    return;
  }



}
