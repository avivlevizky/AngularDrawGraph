import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';
import { FlowGraphItem } from '../_models/flowgraph-item';



@Injectable({
  providedIn: 'root'
})
export class FlowGraphItemService {

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  private baseUrl = `${environment.apiUrl}/api/FlowGraph`;

  // GetHttpHeaders(): HttpHeaders {
  //     const headers = new HttpHeaders().set('content-type', 'application/json');
  //     return headers;
  // }

  getAllFlowGraphItems(): Observable<FlowGraphItem[]> {
    return this.http.get<FlowGraphItem[]>(`${this.baseUrl}/`,
    {withCredentials: false});
  }



  updateFlowGraphItem(id, item: FlowGraphItem) {
    const paramsItem = new HttpParams()
    .set('id', id);

    return this.http.put<boolean>(`${this.baseUrl}/` + id, item,
      {withCredentials: false});
  }

  insertFlowGraphItem(item: FlowGraphItem) {
    return this.http.post<boolean>(`${this.baseUrl}/`, item,
        {withCredentials: false});
  }




}
