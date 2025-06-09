import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})

// when using ngOnInit it's best to implement OnInit to make sure you actually implement ngOnInit
// also protects from typos

// export class ServerStatusComponent implements OnInit, AfterViewInit, OnDestroy {
//   currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
//   // return type of what is returned from setInterval, interesting typescript shit
//   private interval?: ReturnType<typeof setInterval>;

//   constructor() {}

//   // ngOnInit lifecyle called after the component's constructor and after Angular has initialized all data-bound properties,
//   // including those decorated with @Input()
//   ngOnInit() {
//     this.interval = setInterval(() => {
//       const rnd = Math.random();

//       if (rnd < 0.5) {
//         this.currentStatus = 'online';
//       } else if (rnd < 0.9) {
//         this.currentStatus = 'offline';
//       } else {
//         this.currentStatus = 'unknown';
//       }
//     }, 5000);
//   }

//   ngAfterViewInit() {
//     console.log('after view init');
//   }

//   ngOnDestroy() {
//     console.log('onDestroy');
//     clearTimeout(this.interval);
//   }
// }

// example using more modern destroy useref instead of ngOnDestroy() hook
export class ServerStatusComponent implements OnInit, AfterViewInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  // return type of what is returned from setInterval, interesting typescript shit
  destroyRef = inject(DestroyRef);

  constructor() {
    // example of setting up a subscription to track the changes of current status
    // this is how you do it with signals
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  // ngOnInit lifecyle called after the component's constructor and after Angular has initialized all data-bound properties,
  // including those decorated with @Input()
  ngOnInit() {
    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearTimeout(interval);
    });
  }

  ngAfterViewInit() {
    console.log('after view init');
  }
}
