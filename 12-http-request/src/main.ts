import { bootstrapApplication } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

// providing http client once in the root so it does not need to be included in all components
bootstrapApplication(AppComponent, { providers: [provideHttpClient()] }).catch(
  (err) => console.error(err),
);

//If using modules just inject in root AppModule like below

// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { provideHttpClient } from '@angular/common/http';

// @NgModule({
//   declarations: [
//     AppComponent,
//     PlacesComponent,
//     // ... etc
//   ],
//   imports: [BrowserModule, FormsModule],
//   providers: [provideHttpClient()],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
