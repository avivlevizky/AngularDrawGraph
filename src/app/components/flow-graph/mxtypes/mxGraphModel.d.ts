declare class mxGraphModel{
    cells:{[id:number]:mxCell};
    graphTitle: string;
    graphID: string;
    nextId:number;
    root:mxCell;
    addListener(eventName:any, funct:any);
    beginUpdate();
    endUpdate();
    clear();


}