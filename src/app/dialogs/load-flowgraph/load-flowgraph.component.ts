import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild, Inject, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource} from '@angular/material';
import {FlowGraphItem, FlowGraphModelItem} from '../../_models/flowgraph-item';
import {FlowGraphItemService} from 'src/app/services/flowgraph-item.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';
import { ContainedDialogBase } from 'src/app/_models/dialog-models';
import { DialogContainerService } from 'src/app/services/dialog-container.service';

@Component({
  selector: 'app-load-flowgraph',
  templateUrl: './load-flowgraph.component.html',
  styleUrls: ['./load-flowgraph.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})


export class LoadFlowGraphComponent extends ContainedDialogBase implements OnInit, OnDestroy {
  displayedColumns: string[] = ['_t', 'Description'];
  dataSource: MatTableDataSource<FlowGraphItem>;
  expandedElement: FlowGraphModelItem[];
  isLoadingResults = true;
  subscription: Subscription;


  constructor(private database: FlowGraphItemService,
    public loaderService: LoaderService,
    public dialogRef: MatDialogRef<LoadFlowGraphComponent>,
    public snackBar: MatSnackBar,
    public dialogContainerService: DialogContainerService) {
      super();
      this.dataSource = new MatTableDataSource<FlowGraphItem> ();
    }

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.database.getAllFlowGraphItems().subscribe(data => console.info(data));
    this.subscription = this.database.getAllFlowGraphItems().subscribe({
      next: data => this.dataSource.data = data,
      error: err => console.error(err),
      complete: () => {this.isLoadingResults = false; }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
