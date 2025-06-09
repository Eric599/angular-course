import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { SortPipe } from './sort.pipe';
import { TemperaturePipe } from './temperature.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DatePipe, TemperaturePipe, SortPipe],
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  onReset(index: number) {
    // we can't just update the index like below since we are using a pipe to sort the array
    // this.historicTemperatures[index] = 18;

    // since our pipe is modifying the whole array, when a value inside the array changes, angular does not know to rerun the pipe, it uses a cache
    // updating value inside array means we are still pointing to the same array in memory
    // By modifying the actual array instead of a value inside of array we can trigger angular to re run the pipe
    // https://academind.com/tutorials/reference-vs-primitive-values
    // Section 8: Section 8: Transforming Values with Pipes - Deep Dive
    //  170. Understanding How Pipes Are Executed
    // 171. Can also disable the caching by setting pure to false in pipe, BE CAREFUL DOING THIS COULD IMPACT PERFORMANCE

    const arr = [...this.historicTemperatures];
    arr[index] = 18;
    this.historicTemperatures = arr;
  }
}
