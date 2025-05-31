import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NewTaskData } from '../task/task.model'

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() cancelTask = new EventEmitter<void>()
  @Output() newTask = new EventEmitter<NewTaskData>()
  // enteredTitle = signal('') can also use signal like this, html does not need to change
  enteredTitle = ''
  enteredDate = ''
  enteredSummary = ''

  onCancelTask() {
    console.log('task canceled')
    this.cancelTask.emit()
  }

  onSubmit() {
    this.newTask.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate,
    })
  }
}
