import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TaskComponent } from './task/task.component'
import { NewTaskComponent } from './new-task/new-task.component'
import { TasksService } from './tasks.service'

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  isNewTask = false
  @Input({ required: true }) userId!: string
  @Input({ required: true }) name?: string
  @Output() newTask = new EventEmitter<string>()
  private tasksService

  // using tasks service with DI so there is only one instance of it
  // shortcut way in typescript
  // constructor(private tasksService: TasksService) {}
  constructor(tasksService: TasksService) {
    this.tasksService = tasksService
  }

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId)
  }

  onCreateTask() {
    this.isNewTask = true
    console.log('New task for ' + this.name)
  }

  onCloseAddTask() {
    this.isNewTask = false
  }
}
