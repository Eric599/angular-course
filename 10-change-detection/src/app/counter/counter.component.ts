// Controlling change detection in Angular
// Avoiding zone pollution
import { Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit {
  // inject NgZone to edit how change detection runs
  zone = inject(NgZone);
  count = signal(0);

  ngOnInit(): void {
    // set interval when triggered will cause Angular to run change detection for all components
    // this is okay for when we change the count but when we console log one second later it doesn't need to rerun change detection
    // so we can use NgZone to tell Angular not to run change detection

    setInterval(() => {
      this.count.set(0), 4000;
    });

    // here we use runOutsideAngular() from NgZone so change detection will not run when the interval is triggered
    // will not be watched by Zone.js
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        console.log('Just a console log that does not affect any components'),
          5000;
      });
    });
  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
