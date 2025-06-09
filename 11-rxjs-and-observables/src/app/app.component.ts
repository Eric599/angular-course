// Obserbable example
// Sometimes you can use signals and observables interchangeably
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  count = signal(0);
  private destroyRef = inject(DestroyRef);

  // we can turn a signal into an observable like below, best practice to put $ at end of name
  countObservable$ = toObservable(this.count);

  // as above we can also convert an observable to a signal
  // don't want to subscribe here we want the observable object
  // !!OBSERVABLES HAVE NO INITIAL VALUE, SIGNALS DO, MORE CONFIG FOR SETTING INIT VALUES!!
  interval$ = interval(1000);
  // convert to signal
  // also set up initial value is possible in toSignal function
  // when converting to signal we don't even need to cleanup the subscription, done automatically
  intervalSignal = toSignal(this.interval$, { initialValue: 0 }); // now we can use it as a regular signal

  // Creating a custom Observable from scratch with RxJs
  /**
   * @param {function}: p1 - function that gets executed when observable is subscribed to
   *
   */
  customObservable$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    // below we define what will happen when we call observable.next(), here we just print every 1 second
    const interval = setInterval(() => {
      // can also emit an error if needed
      // subscriber.error()
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log(`emitting new val `);
      timesExecuted++;

      subscriber.next({ message: 'New Valuese' });
    }, 2000);
  });

  constructor() {
    // effect runs when signal inside effect function changes
    // effect(() => {
    //   console.log(`clicked button ${this.count()} times`);
    // });

    // instead of using signal and effect() function like above we can use the observable below
    const subscription = this.countObservable$.subscribe({
      next: (val) => console.log(`Ewic clicked ${val}`),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngOnInit(): void {
    // interval generates new number every interval milliseconds
    // need to call subscribe otherwise rxjs will never trigger this interval
    // pipe() can be used to manipulate whatever is generated
    // interval() returns a number so this pipe will use the map() operator to manipulate the number
    const subscription = interval(1000)
      .pipe(
        map((val) => {
          // here we take the number generated from interval and multiply by 2
          // can also add more than map() operator we can chain map() to another operator
          val * 2;
        }),
      )
      .subscribe({
        // next triggers after every new value emitted
        next: (val) => {
          console.log(val);
        },
        // called if observable does not emit anymore numbers (not really useful in this case)
        complete: () => {},
        // triggered if error happens
        error: () => {},
      });

    // subscribe to our new custom Observable
    this.customObservable$.subscribe({
      next: (val) => console.log(val),
      // executes once complete
      complete: () => console.log('completed!!!'),
      error: () => console.log('error happened'),
    });

    // cleanup observable from interval()
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onClick() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
