import { MessageType } from './enums';
import { JsonGraph } from './mxgraph';
import { Version } from '@angular/core';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';

 /**
  * Catalog item
  */
 export class CatalogItem {
    ArticleId: string;
    ArticleTitle: string;
    ArticleType: string;
    NumOfQuestion: number;
    Show: boolean;
}

 /**
  * User description item
  */
 export class UserDescriptionItem {
     Date: string;
     Description: string;
     _id: string;
     ID: string;
}

export interface SourceInternal extends CatalogItem {
    Description: string;
    Response: string;
    Type: string;
    Category: string;
    Keywords: string;
    Entities: string;
    MinVersion: VersionIntent;
    FailResponse: string;

}

export interface VersionIntent {
    _Build: number;
    _Major: number;
    _Minor: number;
    _Revision: number;

}

export abstract class VersionIntentString {
    static toString(_version: VersionIntent): string {
        return _version._Build + '.' + _version._Major + '.' + _version._Minor + '.' + _version._Revision ;
    }
}







