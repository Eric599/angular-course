// service that will be used in another service (TasksService)
// other service must be provided in root or registered in main.ts file. Will not work if using Element Injector
// Will not work because Services are not part of DOM and will not reach out to Platform Environment Injector
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  log(message: string) {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}]: ${message}`);
  }
}
