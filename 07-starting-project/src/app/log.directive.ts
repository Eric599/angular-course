//The point of this directive is to demonstrate how to apply a directive to multiple components
//  without repeatedly adding appLog to each tag in the html

import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()',
  },
})
export class LogDirective {
  // getting access to host element
  elementRef = inject(ElementRef);

  onLog() {
    console.log(this.elementRef.nativeElement);
  }
}
