import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {FlowGraphItem, FlowGraphModelItem} from '../../../_models/flowgraph-item';
import {FlowGraphItemService} from '../../../services/flowgraph-item.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { LoaderService } from '../../../services/loader.service';
import { Subscription } from 'rxjs';
import { ContainedDialogBase } from '../../../_models/dialog-models';
import { DialogContainerService } from '../../../services/dialog-container.service';

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
      complete: () => {this.isLoadingResults = false;
                       console.log(this.dataSource.data);
                       }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}