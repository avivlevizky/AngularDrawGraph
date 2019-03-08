declare class mxEditor{
    constructor();
    graph: mxGraph;
    toolbar: mxDefaultToolbar;
    setGraphContainer(container:any);
    setToolbarContainer(container:any);
    writeGraphModel();
    readGraphModel(node);
    zoomIn();
}