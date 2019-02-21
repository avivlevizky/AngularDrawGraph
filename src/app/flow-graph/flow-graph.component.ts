import {AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { URL_IMAGE_BACKGROUND } from './data';
import { JsonGraph } from '../_models/mxgraph';
import {ImportGraphService} from '../services/import-graph.service';
import {Subscription, Observable} from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { ShapeFlowType } from '../_models/enums';
@Component({
  selector: 'app-flow-graph',
  templateUrl: './flow-graph.component.html',
  styleUrls: ['./flow-graph.component.css']
})
export class FlowGraphComponent implements AfterViewInit, OnDestroy {


  @ViewChild('graphContainer') graphContainer: ElementRef;

  /*Properties*/
  container: any;
  editor: mxEditor;
  graph: mxGraph;
  toolbar: mxDefaultToolbar;
  subscriptionJsonImport: Subscription;
  subscriptionMxGraphModelImport: Subscription;
  codec: mxCodec;





  constructor(private importGraph: ImportGraphService,
              public loaderService: LoaderService) {
      this.editor = new mxEditor();
      this.graph =  this.editor.graph;
      this.toolbar = this.editor.toolbar;
      this.codec = new mxCodec();
      this.subscriptionJsonImport = this.importGraph.getGraphAsJSON().subscribe(jsonGraph => {
        try {
          const parsedGraph: JsonGraph = JSON.parse(jsonGraph);
          this.importJsonToGraph(parsedGraph);
        } catch (e) {
          console.exception('Exception on init the flowGraph component' + e);
          alert('Invalid JSON graph input');
        }

      });

      this.subscriptionMxGraphModelImport = this.importGraph.getXmlGraphAsObservable().subscribe(data => {
        try {
          this.importXMLToGraph(data._id, data._t, data.xml);
        } catch (e) {
          alert('Invalid mxGraphModel object');
        }

      });
  }



  ngAfterViewInit() {
    this.container = this.graphContainer.nativeElement;
    this.container.style.background = URL_IMAGE_BACKGROUND;
    this.editor.setGraphContainer(this.container);
    this.graph.dropEnabled = true;
    this.graph.setHtmlLabels(true);
    this.graph.setConnectable(true);   // Enables new connections in the graph
    this.graph.setMultigraph(false);

    // Create handler for the del key which delete the seleted objects from the graph
    const keyHandler = new mxKeyHandler(this.graph);
    keyHandler.bindKey(46, (evt, state) => {
      if (keyHandler.graph.isEnabled()) {
        keyHandler.graph.removeCells();
      }
    });

    // Create handler for mouse wheel event for zoom in and zoom out
    this.container.addEventListener('mousewheel', (evt) => this.zoomGraphWheel(evt));

    /*Temporary: only the check how the graph render/proccess the json graph from data.ts file*/
    // this.importJsonToGraph(GraphDataExample);
    }


   ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionJsonImport.unsubscribe();
    this.subscriptionMxGraphModelImport.unsubscribe();

 }


  // Helper function that help us the know the direction of the wheel mouse scroll
  private zoomGraphWheel(evt: WheelEvent) {
    if (evt.deltaY > 0) {
      this.graph.zoomIn();
    }
    if (evt.deltaY < 0) {
      this.graph.zoomOut();
    }
  }



  private importXMLToGraph(id?: string, t?: string, xmlGraph?: string) {
    const currentGraphModel: mxGraphModel = this.editor.graph.getModel();
    try {
        currentGraphModel.beginUpdate();
        this.editor.graph.removeCells(this.editor.graph.getChildVertices(this.editor.graph.getDefaultParent()));
        currentGraphModel.clear();
        if (xmlGraph != null) {
          const parsedXML = mxUtils.parseXml(xmlGraph);
          const decodedGraph: mxGraphModel = this.codec.decode(parsedXML.documentElement);
          currentGraphModel.cells = decodedGraph.cells;
          currentGraphModel.nextId = decodedGraph.nextId;
          currentGraphModel.root = decodedGraph.root;
        }
     } catch (e) {
       alert('Unable to decode to given XML');
       console.exception('Unable in importXMLToGraph when decode the given XML: ' + e);
     } finally {
      currentGraphModel.graphID = id;
      currentGraphModel.graphTitle = t;
      currentGraphModel.endUpdate();

      // currentGraphModel.execute();
      // new mxGraphLayout(this.graph).execute(this.graph.getDefaultParent());
      // new mxHierarchicalLayout(this.graph, 'west').execute(this.graph.getDefaultParent());
     }
  }

 // Helper function that help us to process the given json graph into valid mxgraph
  private importJsonToGraph(jsonGraph: JsonGraph) {
    const _id = jsonGraph._id;
    const Title = jsonGraph._t;
    const Vertices = jsonGraph.Vertices;
    const Edges = jsonGraph.Edges;
    const map = new Map<number, any>();
    let graphModel: mxGraphModel;

    try {
      const parent = this.graph.getDefaultParent();
      graphModel = this.editor.graph.getModel();
      graphModel.beginUpdate();

      let temp: any;

      Vertices.forEach((node) => {
        switch (node.Type) {
          case ShapeFlowType.Start: {
            temp =  this.graph.insertVertex(parent, node.VertexId, node.Text, 0, 0, 90, 90, 'shape=star;whiteSpace=wrap;');
            break;
          }
          case ShapeFlowType.Action: {
            temp = this.graph.insertVertex(parent, node.VertexId, node.Text, 0, 0, 100, 80, 'shape=process;whiteSpace=wrap;');
            break;
          }
          case ShapeFlowType.Message: {
            temp = this.graph.insertVertex(parent, node.VertexId, node.Text, 0, 0, 100, 60, 'whiteSpace=wrap;');
            break;
          }
          case ShapeFlowType.Condition: {
            temp = this.graph.insertVertex(parent, node.VertexId, node.Text, 0, 0, 100, 60, 'shape=rhombus;whiteSpace=wrap;');
            break;
          }
          case ShapeFlowType.Cache: {
            temp = this.graph.insertVertex(parent, node.VertexId, node.Text, 0, 0, 100, 60, 'shape=cylinder;whiteSpace=wrap;');
            break;
          }
          case ShapeFlowType.Video: {
            temp = this.graph.insertVertex(parent, node.VertexId, node.Text, 0, 0, 100, 60, 'shape=parallelogram;whiteSpace=wrap;');
            break;
          }
          case ShapeFlowType.Image: {
            temp = this.graph.insertVertex(parent, node.VertexId, node.Text, 0, 0, 100, 60, 'shape=ellipse;whiteSpace=wrap;');
            break;
          }
          case ShapeFlowType.Escape: {
            temp = this.graph.insertVertex(parent, node.VertexId, node.Text, 0, 0, 100, 60, 'shape=hexagon;whiteSpace=wrap;');
            break;
          }
          /*Need to add more cases to the other shapes*/
        }

        map.set(node.VertexId, temp);

      });

      Edges.forEach((edge) => {
        this.graph.insertEdge(parent, '', edge.Cond, map.get(edge.Start), map.get(edge.End), 'align= unset;');
      });

    } catch (e) {
      console.exception('Exception when importJsonToGraph: ' + e);
    } finally {
      graphModel.endUpdate();
      graphModel.graphTitle = Title;
      graphModel.graphID = _id;
      new mxHierarchicalLayout(this.graph, 'west').execute(this.graph.getDefaultParent());
    }

  }







}
