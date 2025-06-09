import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // registering service with this providers parameter makes it available to all elements used within it
  // so all components used within tasks.html will get access to this service. !!Only provides one instance of it, nice!!
  // This uses Element Injector
  // OTHER SERVICES WILL NOT WORK INSIDE TasksService IF YOU USE APPROACH BELOW
  // providers: [TasksService],
})
export class TasksComponent {}
