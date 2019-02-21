export interface FlowGraphItem {
    _id: string;
    _t: string;
    Description: string;
    FlowGraphs: FlowGraphModelItem[];
  }

export interface FlowGraphModelItem {
    TimeStamp: Date;
    Comment: string;
    XML: string;
    JSON: string;
}
