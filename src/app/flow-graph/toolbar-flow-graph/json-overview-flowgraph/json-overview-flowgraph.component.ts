import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { JsonGraph } from 'src/app/_models/mxgraph';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-json-overview-flowgraph-overview',
  templateUrl: './json-overview-flowgraph.component.html',
  styleUrls: ['./json-overview-flowgraph.component.css']
})
export class JsonOverviewFlowGraphComponent {

  jsonData: JsonGraph;
  currentData: any;

  constructor(public dialogRef: MatDialogRef<JsonOverviewFlowGraphComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, public snackBar: MatSnackBar) {
      this.jsonData = data.json;
      this.currentData = JSON.stringify(this.jsonData);
    }


    openSnackBar() {
      this.snackBar.open('JSON graph is copied', null, {duration: 650});
      this.dialogRef.close();
    }

}
