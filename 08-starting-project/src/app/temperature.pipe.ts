// example of barebones custom pipe

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  // Every custom pipe NEEDS the transform() function implemented
  // best to implement PipeTransform for all custom pipes
  transform(
    value: string | number | null,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah',
  ) {
    if (!value) {
      return value;
    }
    let val: number;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }
    let output;
    if (inputType == 'cel' && outputType == 'fah') {
      // convert from celsius to farenheight
      output = val * (9 / 5) + 32;
    } else if (inputType == 'fah' && outputType == 'cel') {
      output = (val - 32) * (5 / 9);
    } else {
      output = val;
    }

    let symbol: '°F' | '°C';
    if (!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }

    return `${output.toFixed(2)} ${symbol}`;
  }
}
