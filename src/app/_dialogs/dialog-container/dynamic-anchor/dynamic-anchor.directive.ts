import { Directive, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[appDynamicAnchor]'
})
export class DynamicAnchorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
