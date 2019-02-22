import {Component , ViewEncapsulation , OnInit, Input , ViewChild, ElementRef, Inject, SimpleChanges} from '@angular/core';
import {iconBase64} from '../data';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTabGroup} from '@angular/material';
import {Vertex, Edge, JsonGraph} from '../../_models/mxgraph';
import { SaveFlowgraphComponent } from './save-flowgraph/save-flowgraph.component';
import { JsonOverviewFlowGraphComponent } from './json-overview-flowgraph/json-overview-flowgraph.component';
import { LoadFlowGraphComponent } from 'src/app/dialogs/load-flowgraph/load-flowgraph.component';
import { ImportGraphService } from 'src/app/services/import-graph.service';
import { ShapeFlowType } from 'src/app/_models/enums';

declare var require: any;
const Graph = require('../../../../node_modules/graph-data-structure');

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
  @Input() codec: mxCodec;

  // Constants for dialog size
  readonly WIDTH_DIALOG = '700px';
  readonly HEIGHT_DIALOG = '700px';

  mxPanningHandler: mxPanningHandler;

  constructor(public dialog: MatDialog,
              private impotGraphService: ImportGraphService) {
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
    const funct = function(g, evt, cell) {
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


  onClickNew() {
    this.impotGraphService.ImportXmlGraph();
  }

  // Handler to the JsonGraph button
  onClickManage() {
    try {
      this.dialog.open(LoadFlowGraphComponent, {
        width: this.WIDTH_DIALOG,
        height: this.HEIGHT_DIALOG
      });
    } catch (e) {
      this.dialog.open(LoadFlowGraphComponent, {width: this.WIDTH_DIALOG, height: this.HEIGHT_DIALOG});
    }
  }


  onClickJSON() {
    try {
      this.dialog.open(JsonOverviewFlowGraphComponent, {
        width: this.WIDTH_DIALOG,
        data: {json: this.exportGraphTojson()}
      });
    } catch (e) {
      this.dialog.open(JsonOverviewFlowGraphComponent, {
        width: this.WIDTH_DIALOG,
        data: {json: ''}
      });
    }
  }



  onClickSave() {
    try {
      const nodeXml = this.codec.encode(this.graph.model);
      const currentGraphModel: mxGraphModel = this.editor.graph.getModel();

      this.dialog.open(SaveFlowgraphComponent, {
        width: this.WIDTH_DIALOG,
        data: {xml: mxUtils.getPrettyXml(nodeXml), json: this.exportGraphTojson(), _id: currentGraphModel.graphID}
      });
    } catch (e) {
      this.dialog.open(SaveFlowgraphComponent, {
        width: this.WIDTH_DIALOG,
        data: {xml: '', json: '', _id: null}
      });
    }
  }


  // Helper function that help us to process the showen graph into valid json graph
  private exportGraphTojson() {
    const nodesDict: {[id: number]: Vertex} = {};
    const yCorrdinates: {[id: number]: number} = {};
    const Vertices: Vertex[] = [], Edges: Edge[] = [];
    const mxCells: {[id: number]: mxCell} = this.graph.model.cells;
    const _t: string = this.graph.model.graphTitle;
    const _id: string = this.graph.model.graphID;
    const graph = Graph();
    let type = null;

    for (const id of Object.keys(mxCells)) {
      if (mxCells[id].vertex) {
        const regexp: RegExp = new RegExp('(^|\\w;)shape=\\w*');
        const matchedResult = regexp.test(mxCells[id].style) ? (regexp.exec(mxCells[id].style))[0].toLowerCase().toString() : '';
        switch (matchedResult) {
            case 'shape=star': {
              type = ShapeFlowType.Start;
              break;
            }
            case 'shape=process': {
              type = ShapeFlowType.Action;
              break;
            }
            case 'shape=rhombus': {
              type = ShapeFlowType.Condition;
              break;
            }
            case 'shape=cylinder': {
              type = ShapeFlowType.Cache;
              break;
            }
            case 'shape=parallelogram': {
              type = ShapeFlowType.Video;
              break;
            }
            case 'shape=ellipse': {
              type = ShapeFlowType.Image;
              break;
            }
            case 'shape=hexagon': {
              type = ShapeFlowType.Escape;
              break;
            }
            default: {
              type = ShapeFlowType.Message;
              break;
            }
          }
          graph.addNode(parseInt(id, 10));
          nodesDict[parseInt(id, 10)] = {Type: type, Text: mxCells[id].value, VertexId: parseInt(id, 10)};
          yCorrdinates[parseInt(id, 10)] = mxCells[id].geometry.y;
        }

        if (mxCells[id].edge) {
          graph.addEdge(parseInt(mxCells[id].source.id, 10), parseInt(mxCells[id].target.id, 10));
          Edges.push({Start: parseInt(mxCells[id].source.id, 10), End: parseInt(mxCells[id].target.id, 10), Cond: mxCells[id].value});
        }
      }

      const graphVertices: number[] = graph.topologicalSort();

      for (let i = 0; i < graphVertices.length; i++) {
        const parentId: number =  graphVertices[i].valueOf();
        if (!Vertices.find((node) => (node.VertexId === parentId))) {
          Vertices.push(nodesDict[parentId]);
        }

        const childrensVertices: number[] = graph.adjacent(parentId);
        childrensVertices.sort((n1, n2) =>  yCorrdinates[n1] - yCorrdinates[n2]);
        childrensVertices.forEach((nodeId) => Vertices.push(nodesDict[nodeId]));

      }

      return {_t, Vertices, Edges};


  }
}




