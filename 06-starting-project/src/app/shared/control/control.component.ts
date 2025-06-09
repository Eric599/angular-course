import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  ContentChild,
  ElementRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  // adding control class to host component (app-control) for styling, all app-control instances will have this class
  host: {
    class: 'control',
    '(click)': 'onClick()', // can also define event listeners for host component
  },
})
export class ControlComponent implements AfterContentInit {
  // instead of using host: {} like above, can also use below
  // this is old and discouraged though
  // @HostBinding('class') clazz = 'control';
  @Input({ required: true }) label!: string;

  // can't use @ViewChildren or @ViewChild to access projected components (ex: <ng-content />) instead we can do this
  // we set the template variable input where it is defined (new-ticket.component.html)
  @ContentChild('input') private control?: ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  >;

  constructor() {
    // Execution: This hook is executed after every change detection cycle.
    //            This means that it will run every time Angular updates the DOM.
    // Use case: This is useful for synchronizing state with the DOM,
    //            such as reading layout data or updating the DOM after changes.
    //             It is helpful when dealing with external libraries that need to interact with the DOM.
    // Trigger: It's triggered after every change detection cycle.
    afterRender(() => {
      console.log('After render');
    });

    // Execution: This hook is executed only once after the next rendering cycle.
    //            It will not run again unless the component is re-rendered.
    // Use case: This is useful for one-time initialization tasks,
    //            such as setting up third-party libraries or
    //            browser-only APIs that need to interact with the DOM once the component is rendered.
    // Trigger: It's triggered once after the next change detection cycle.
    afterNextRender(() => {
      console.log('AfterNext render');
    });
  }

  // use Content init here because we are accessin projected component. <ng-content />
  ngAfterContentInit() {
    console.log('AfterContentInit');
    console.log(this.control?.nativeElement);
  }

  // programatically gettign access to host element
  private el = inject(ElementRef);

  onClick() {
    console.log('clicked');
    console.log(this.el);
    console.log(this.control);
  }
}
