// Example of custom  attribute directive,
// Attribute directive — because it's applied to an existing element (<a>) using a selector like a[appLinkDirective]
// the goal of this is to verify if user wants to visit link when clicking on <a> tag

import { Directive, Input } from '@angular/core';

@Directive({
  // we are saying that only a tags can call it and it is called appLinkdirective
  selector: 'a[appLinkDirective]',
  standalone: true,
  // listening to host element (element using this directive)
  // in this case looking for when user clicks on host element (<a> in our case right now)
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  @Input() queryParam: string = 'myApp';

  constructor() {
    console.log('SafeLink Working!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const isLeaving = window.confirm('Are you sure you want to leave?');

    if (isLeaving) {
      // getting link from anchor element
      const destination = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href =
        destination + '?from=' + this.queryParam;
      return;
    }

    event.preventDefault();
  }
}
