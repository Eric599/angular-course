import { Component, model } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // // Implement custom two-way binding, with the input output decorators below we can now do 2 way binding [(size)]
  // @Input({ required: true }) size!: { width: string; height: string };
  // // to create 2 way binding the name HAS TO BE sizeChange in our case; (fooChange) where foo is size in our case
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  // Another way to create custom 2 way binding, only available in version 17.2+, uses signals
  size = model.required<{ width: string; height: string }>();

  onReset() {
    this.size.set({
      width: '200',
      height: '100',
    });
  }
}
