import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConversationItem } from '../_models/conversation-item';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';
import {FlowGraphItem} from '../_models/flowgraph-item';



@Injectable({
  providedIn: 'root'
})
export class FlowGraphItemService {

  constructor(private _http: HttpClient, private snack: MatSnackBar) {}

  private base_url = `${environment.apiUrl}/api/FlowGraph`;

  // GetHttpHeaders(): HttpHeaders {
  //     const headers = new HttpHeaders().set('content-type', 'application/json');
  //     return headers;
  // }

  getAllFlowGraphItems(): Observable<FlowGraphItem[]> {
    return this._http.get<FlowGraphItem[]>(`${this.base_url}/get`,
    {withCredentials: true});
  }



  updateFlowGraphItem(id, item: FlowGraphItem) {
    const paramsItem = new HttpParams()
    .set('id', id);

    return this._http.put<boolean>(`${this.base_url}/put` + id, item,
      {withCredentials: true});
  }

  insertFlowGraphItem(item: FlowGraphItem) {
    return this._http.post<boolean>(`${this.base_url}/post`, item,
        {withCredentials: true});
  }




}
