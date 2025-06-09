import { inject, Injectable, signal } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Task, TaskStatus } from './task.model';

@Injectable({
  // root: Can be injected into any component, uses Application Root Environment Injector
  providedIn: 'root',
})
export class TasksService {
  constructor() {}
  private loggingService = inject(LoggingService);
  private tasks = signal<Task[]>([]);

  // read only signal so tasks don't get accidentally manipulated
  // tasks is a WriteableSignal
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('Adding new task ' + taskData.title);
  }

  updateTask(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
    this.loggingService.log('Updating new task ' + taskId);
  }
}
