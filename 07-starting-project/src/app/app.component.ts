import { Component, computed, inject } from '@angular/core';

import { NgIf } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthDirective } from './auth/auth.directive';
import { AuthService } from './auth/auth.service';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AuthComponent, LearningResourcesComponent, NgIf, AuthDirective],
})
export class AppComponent {
  private authService = inject(AuthService);

  // computed() function is used to create a computed signal,
  // it is a read-only signal that derives its value from other signals.
  isAdmin = computed(() => this.authService.activePermission() === 'admin');
}
