export interface FlowGraphItem {
    _id: string;
    _t: string;
    description: string;
    flowGraphs: FlowGraphModelItem[];
  }

export interface FlowGraphModelItem {
    timeStamp: Date;
    comment: string;
    xml: string;
    json: string;
}
