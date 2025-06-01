import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TasksService } from '../tasks.service'

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string
  @Output() closeForm = new EventEmitter<void>()
  // enteredTitle = signal('') can also use signal like this, html does not need to change
  enteredTitle = ''
  enteredDate = ''
  enteredSummary = ''
  // another way to use DI without a constructor
  private tasksService = inject(TasksService)

  onCancelTask() {
    console.log('task canceled')
    this.closeForm.emit()
  }

  onSubmit() {
    this.tasksService.addUserTask(this.userId, {
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate,
    })
    this.closeForm.emit()
  }
}
