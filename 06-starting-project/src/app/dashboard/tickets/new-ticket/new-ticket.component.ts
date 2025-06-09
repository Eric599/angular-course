import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements AfterViewInit, OnInit {
  // access elements within the html of new-ticket.component.html
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // Can also use ViewChildren to get multiple elements
  //@ViewChildren(ButtonComponent) buttons?

  @Output() add = new EventEmitter<{ title: string, request: string }>();

  ngOnInit() {
    // this is still undefined in ngOnInit() only guaranteed in ngAfterViewInit()
    // !!!IF YOU USE SIGNAL THEN YOU DO GET ACCESS HERE!!!
    console.log('ngOnInit');
    console.log(this.form?.nativeElement);
  }

  // Guarantees we have access to what we accessed from ViewChild, as long as it is found
  ngAfterViewInit() {
    console.log('ngAfterViewInit');

    // We get access to this guaranteed
    console.log(this.form?.nativeElement);
  }

  onSubmit(title: string, request: string) {
    this.add.emit({title: title, request: request})
    // clear form after submission
    this.form?.nativeElement.reset();
  }
}
