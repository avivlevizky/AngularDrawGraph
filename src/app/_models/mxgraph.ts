export interface Vertex {
    Type: number;
    Text: string;
    VertexId: number;
  }


export interface Edge {
    Start: number;
    End: number;
    Cond: string;
}

export interface JsonGraph {
    _id: string;
    _t: string;
    Vertices: Vertex[];
    Edges: Edge[];
}





