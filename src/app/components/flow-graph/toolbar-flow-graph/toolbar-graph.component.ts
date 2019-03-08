import { Component , ViewEncapsulation , OnInit, Input , ViewChild, ElementRef } from '@angular/core';
import { iconBase64 } from '../data';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-ng-toolbar-graph',
  templateUrl: './toolbar-graph.component.html',
  styleUrls: ['./toolbar-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ToolbarGraphComponent implements OnInit {
  @ViewChild('toolbarContainer') graphContainer: ElementRef;
  @Input() toolbar: mxDefaultToolbar;
  @Input() graph: mxGraph;
  @Input() editor: mxEditor;

  mxPanningHandler: mxPanningHandler;

  constructor(private dialog: MatDialog) {
  }


  ngOnInit() {
    // All the toolbar shapes (which give the user the abilty to create them by drag them)
    this.editor.setToolbarContainer(this.graphContainer.nativeElement);
    this.addVertex('Start', iconBase64.iconStar, 90, 90, 'shape=star;whiteSpace=wrap;');
    this.addVertex('Process', iconBase64.iconProcess, 125, 70, 'shape=process;whiteSpace=wrap;');
    this.addVertex('Message', iconBase64.iconRect, 100, 60, 'whiteSpace=wrap;');
    this.addVertex('Cache', iconBase64.iconCylinder, 65, 100, 'shape=cylinder;whiteSpace=wrap;');
    this.addVertex('Condition', iconBase64.iconRhombus, 60, 60, 'shape=rhombus;whiteSpace=wrap;');
    this.addVertex('Video', iconBase64.iconParallelogram, 90, 70, 'shape=parallelogram;whiteSpace=wrap;');
    this.addVertex('Image', iconBase64.iconCircle, 90, 90, 'shape=ellipse;whiteSpace=wrap;');
    this.addVertex('Stop', iconBase64.iconHexagon, 90, 80, 'shape=hexagon;whiteSpace=wrap;');
    this.mxPanningHandler = new mxPanningHandler(this.graph);
  }



  private addVertex(title, icon, w, h, style) {
    const vertex = new mxCell();
    vertex.geometry = new mxGeometry(0, 0, w, h);
    vertex.style = style;
    vertex.setVertex(true);
    this.addToolbarItem(title, this.graph, this.toolbar, vertex, icon);
  }



  private addToolbarItem(title, graph: mxGraph, toolbar: mxDefaultToolbar, prototype, image) {
    // Function that is executed when the image is dropped on
    // the graph. The cell argument points to the cell under
    // the mousepointer if there is one.
    const funct = (g, evt, cell) => {
      graph.stopEditing(false);
      const pt = g.getPointForEvent(evt);
      const vertex = g.getModel().cloneCell(prototype);
      vertex.geometry.x = pt.x;
      vertex.geometry.y = pt.y;
      graph.setSelectionCells(g.importCells([vertex], 0, 0, cell));
    };

    // Creates the image which is used as the drag icon (preview)
    const img = toolbar.addMode(title, image, funct);
    mxUtils.makeDraggable(img, graph, funct);
  }

}





