// example of Structural Directive
// used within ng-template tag or prefixed with *

import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  // alias makes it so we can assign userType to appAuth
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  // tells angular we want to get access to what is inside the ng-template tag
  private templateRef = inject(TemplateRef);
  // reference to the place in the DOM where this template being used
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    // effect function runs when auth service signals or userType signal changes
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        // take content between ng-content and render what is in between instead
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        // remove any view
        this.viewContainerRef.clear();
      }
    });
  }
}
