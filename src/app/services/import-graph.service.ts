import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportGraphService {
  private subjectJsonGraph = new Subject<any>();
  private subjectXmlGraph = new Subject<any>();
  private subjectClickCopyJSON = new Subject<any>();

  constructor() { }


  ImportGraphAsJSON(jsonGraph: string) {
    this.subjectJsonGraph.next(jsonGraph);
  }

  getGraphAsJSON(): Observable<any> {
    return this.subjectJsonGraph.asObservable();
  }


  ImportXmlGraph(id?, t?, xml?: string) {
    this.subjectXmlGraph.next({id, t, xml});
  }


  ImportCopyJSON(json: string) {
    this.subjectClickCopyJSON.next(json);
  }


  getClickCopyJSONasObservable(): Observable<any> {
    return this.subjectClickCopyJSON.asObservable();
  }


  getXmlGraphAsObservable(): Observable<any> {
    return this.subjectXmlGraph.asObservable();
  }
}
