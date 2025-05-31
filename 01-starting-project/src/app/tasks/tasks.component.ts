import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TaskComponent } from './task/task.component'
import { NewTaskComponent } from './new-task/new-task.component'
import { NewTaskData } from './task/task.model'

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

  dummyTasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]

  get selectedUserTasks() {
    return this.dummyTasks.filter((task) => task.userId == this.userId)
  }

  onCompletedTask(id: string) {
    this.dummyTasks = this.dummyTasks.filter((task) => task.id !== id)
  }

  onCreateTask() {
    this.isNewTask = true
    console.log('New task for ' + this.name)
  }

  onCanceledAddTask() {
    this.isNewTask = false
  }

  onAddTask(taskData: NewTaskData) {
    this.dummyTasks.push({
      id: new Date().getDate().toString(),
      userId: this.userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate,
    })
    this.isNewTask = false
  }
}
