import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild, ElementRef, Input, Inject, OnDestroy} from '@angular/core';
import {MatTableDataSource, MatTabGroup, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatCard} from '@angular/material';
import { FlowGraphItem, FlowGraphModelItem } from 'src/app/_models/flowgraph-item';
import { FlowGraphItemService } from 'src/app/services/flowgraph-item.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Intent } from 'src/app/_models/intent';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { LoaderService } from 'src/app/services/loader.service';



@Component({
  selector: 'app-save-flowgraph-tab',
  templateUrl: './save-flowgraph.component.html',
  styleUrls: ['./save-flowgraph.component.css']
})
export class SaveFlowgraphComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['choose', '_t', 'Description'];
  dataSource: MatTableDataSource<FlowGraphItem>;
  // data: FlowGraphItem[] = [];
  clickCopyJSONObservable: Observable<string>;
  choosenFlowGraph: FlowGraphItem;
  newFlowGraphItemForm: FormGroup;
  newFlowGraphModelsForm: FormGroup;
  xml: string;
  json: object;
  graphID: string;
  isLoadingResults: boolean;
  subscriptionsList: Subscription[];
  matCardName: MatCardType;
  isExistingGraph: boolean;

  constructor(private flowGraphItemService: FlowGraphItemService,
              public dialogRef: MatDialogRef<SaveFlowgraphComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              public snackBar: MatSnackBar,
              private loaderService: LoaderService) {
      this.xml = data.xml;
      this.json = data.json;
      this.graphID = data._id;
      this.dataSource = new MatTableDataSource<FlowGraphItem>();
      this.matCardName = MatCardType.newSave;
      this.isExistingGraph = false;
  }

  ngOnInit() {
    this.initNewFlowGraphForm();
    this.isLoadingResults = true;
    this.subscriptionsList = [];
    this.subscriptionsList.push(this.loaderService.loaderState.subscribe(state => this.isLoadingResults = state.show));
    this.subscriptionsList.push(this.flowGraphItemService.getAllFlowGraphItems().subscribe(data => {
         this.checkExistFlowGraphAndFillData(data);
      })
    );
  }


  ngOnDestroy(): void {
    this.subscriptionsList.forEach(s => s.unsubscribe());
  }

  private checkExistFlowGraphAndFillData(data: FlowGraphItem[]) {
    const index = data.findIndex(e => e._id === this.graphID);
    // this.choosenFlowGraph = data.find(e => e._id === this.graphID);

    if (index > -1) {
      this.choosenFlowGraph = Object.assign({}, data[index]);
      data.splice(index, 1);
      data.unshift(this.choosenFlowGraph);
      this.isExistingGraph = true;
    } else {
      this.isExistingGraph = false;
    }

    this.dataSource.data = data;
  }


  onRadioClick(element: FlowGraphItem) {
    this.choosenFlowGraph = element;
    this.isExistingGraph = true;
  }

  private initNewFlowGraphForm() {
    // const flowGraphModelItem: FlowGraphModelItem = {TimeStamp: new Date(),Comment:'',XML:this.xml,JSON: this.json}
    this.newFlowGraphModelsForm = new FormGroup({
      TimeStamp: new FormControl(new Date()),
      Comment: new FormControl(''),
      XML: new FormControl(this.xml),
      JSON: new FormControl(this.json)
    });


    this.newFlowGraphItemForm = new FormGroup({
      _t: new FormControl('', {validators: [Validators.required]}),
      Description: new FormControl(''),
      FlowGraphs: this.newFlowGraphModelsForm
    });
  }



  onSaveExistGraph(event) {
    this.newFlowGraphItemForm.get('_t').setValue(this.choosenFlowGraph._t);
    this.newFlowGraphItemForm.get('_t').disable();
    this.newFlowGraphItemForm.get('Description').setValue(this.choosenFlowGraph.description);
    this.newFlowGraphItemForm.get('Description').disable();
    this.newFlowGraphItemForm.get('FlowGraphs').setValue(this.choosenFlowGraph.flowGraphs);
    // console.info(this.newFlowGraphModelsForm.get('TimeStamp').value);

  }

  onSubmit(event) {
    try {
       let isSuccessfulRequest: boolean;
       if (!this.isExistingGraph) { // New FlowGraph item
        const formFlowGraphItem = Object.assign({}, this.newFlowGraphItemForm.value);
        formFlowGraphItem.FlowGraphs = [formFlowGraphItem.FlowGraphs];
        formFlowGraphItem.FlowGraphs[0].JSON._t = formFlowGraphItem._t;
        formFlowGraphItem.FlowGraphs[0].JSON = JSON.stringify(formFlowGraphItem.FlowGraphs[0].JSON);
        this.flowGraphItemService.insertFlowGraphItem(formFlowGraphItem).subscribe({
          next: respond => isSuccessfulRequest = respond,
          error: e => console.exception('Exception when trying to save exist FlowGraph' + e),
          complete: () => this.checkSaveGraphRespond(isSuccessfulRequest)
        });
      }

       if (this.isExistingGraph) { // Add exist to FlowGraph item
        const clonedObject: FlowGraphModelItem = Object.assign({}, this.newFlowGraphModelsForm.value) ;
        const clonedObjectJSON: any = clonedObject.json;
        clonedObjectJSON._t = this.choosenFlowGraph._t;
        clonedObject.json = JSON.stringify(clonedObjectJSON);
        this.choosenFlowGraph.flowGraphs.push(clonedObject);
        this.flowGraphItemService.updateFlowGraphItem(this.choosenFlowGraph._id, this.choosenFlowGraph)
        .subscribe({
          next: respond => isSuccessfulRequest = respond,
          error: e => console.exception('Exception when trying to save exist FlowGraph' + e),
          complete: () => this.checkSaveGraphRespond(isSuccessfulRequest)
        });
      }
    } catch (e) {
      this.snackBar.open('Failed to save the flowGraph', null, {duration: 1500});
      console.exception(e);
    }
  }

  private checkSaveGraphRespond(isSuccessfulRequest: boolean) {
    if (isSuccessfulRequest) {
      this.dialogRef.close();
      this.snackBar.open('The flowGraph is successfully saved', null, {duration: 1500});
    } else {
      this.snackBar.open('Failed to save the flowGraph', null, {duration: 1500});
      console.error('Bad request from webapi when trying to save the flowGraph');
    }
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export enum MatCardType {
  newSave,
  newSaveForm
}


