import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  // constructor always runs first, discouraged to put complex shit in here
  constructor() {
    console.log('CONSTRUCTOR');
  }

  // runs directly after constructor, recommended for complex init tasks
  ngOnInit() {
    console.log('ngOnInit');
  }

  // runs when changes are detected 
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes);
  }

  // discouraged, runs when angular thinks a UI render is needed, gets executed a lot
  ngDoCheck() {
    console.log('ngDoCheck');
  }

  // content is referrign to <ng-content /> for example, anything projected
  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }

  // after projected content has been checked 
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  // view is more about the html template
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  // same as above but for html template
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  // executed before component destroyed from DOM
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
