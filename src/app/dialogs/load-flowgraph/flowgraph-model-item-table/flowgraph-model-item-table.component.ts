import { Component, OnInit, Input } from '@angular/core';
import { FlowGraphModelItem, FlowGraphItem } from 'src/app/_models/flowgraph-item';
import { FlowGraphItemService } from 'src/app/services/flowgraph-item.service';
import { ImportGraphService } from 'src/app/services/import-graph.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/dialogs/delete/delete.component';
import { LoadFlowGraphComponent } from '../load-flowgraph.component';

@Component({
  selector: 'app-flowgraph-model-item-table',
  templateUrl: './flowgraph-model-item-table.component.html',
  styleUrls: ['./flowgraph-model-item-table.component.css']
})
export class FlowGraphModelItemTableComponent {
  @Input('data') data: FlowGraphModelItem[];
  @Input('parentData') parentData: FlowGraphItem;
  @Input('dialogRef') dialogRef: MatDialogRef<LoadFlowGraphComponent>;


  displayedColumns: string[] = [ 'Actions', 'TimeStamp', 'Comment'];

  constructor(private database: FlowGraphItemService,
     private impotGraphService: ImportGraphService,
     public router: Router,
     private importGraphService: ImportGraphService,
     public snackBar: MatSnackBar,
     public dialog: MatDialog) {}


  onClickCopyLoad(element: FlowGraphModelItem) {
    try {
      if (this.router.url === '/flow_graph') {
        this.impotGraphService.ImportXmlGraph(this.parentData._id, this.parentData._t, element.XML);
        this.snackBar.open('FlowGraph is loaded successfully', null, {duration: 1500});
      }

      if (this.router.url === '/new_intent') {
        this.importGraphService.ImportCopyJSON(element.JSON);
        this.snackBar.open('JSON graph is copied', null, {duration: 1500});
      }

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
