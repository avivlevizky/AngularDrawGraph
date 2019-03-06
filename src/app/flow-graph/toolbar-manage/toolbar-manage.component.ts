import { Component, OnInit, Input } from '@angular/core';
import { ImportGraphService } from 'src/app/_services';
import { MatDialog } from '@angular/material';
import { LoadFlowGraphComponent } from '../toolbar-flow-graph/load-flowgraph/load-flowgraph.component';
import { JsonOverviewFlowGraphComponent } from '../toolbar-flow-graph/json-overview-flowgraph/json-overview-flowgraph.component';
import { SaveFlowgraphComponent } from '../toolbar-flow-graph/save-flowgraph/save-flowgraph.component';
import { Vertex, Edge, ShapeFlowType } from 'src/app/_models';

declare var require: any;
const Graph = require('../../../../node_modules/graph-data-structure');

@Component({
  selector: 'app-toolbar-manage',
  templateUrl: './toolbar-manage.component.html',
  styleUrls: ['./toolbar-manage.component.css']
})

export class ToolbarManageComponent implements OnInit {
  @Input() codec: mxCodec;
  @Input() toolbar: mxDefaultToolbar;
  @Input() graph: mxGraph;
  @Input() editor: mxEditor;

  // Constants for dialog size
  readonly WIDTH_DIALOG = '700px';
  readonly HEIGHT_DIALOG = '560px';

  constructor(private dialog: MatDialog,
              private impotGraphService: ImportGraphService) { }

  ngOnInit() {
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
    const vertices: Vertex[] = [];
    const edges: Edge[] = [];
    const mxCells: {[id: number]: mxCell} = this.graph.model.cells;
    const graphTitle: string = this.graph.model.graphTitle;
    // const _id: string = this.graph.model.graphID;
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
          edges.push({Start: parseInt(mxCells[id].source.id, 10), End: parseInt(mxCells[id].target.id, 10), Cond: mxCells[id].value});
        }
      }

    const graphVertices: number[] = graph.topologicalSort();

    for (const v of graphVertices) {
        const parentId: number =  v.valueOf();
        if (!vertices.find((node) => (node.VertexId === parentId))) {
          vertices.push(nodesDict[parentId]);
        }

        const childrensVertices: number[] = graph.adjacent(parentId);
        childrensVertices.sort((n1, n2) =>  yCorrdinates[n1] - yCorrdinates[n2]);
        childrensVertices.forEach((nodeId) => vertices.push(nodesDict[nodeId]));

      }

    return {graphTitle, vertices, edges};


  }
}
