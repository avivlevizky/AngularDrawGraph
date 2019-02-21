import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebAPIService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }



  public getDbHash(collection: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/api/MongoDB/getDbHash/` + collection ,
            {withCredentials: true});
}
}
