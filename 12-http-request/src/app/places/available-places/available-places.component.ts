import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isLoading = signal(false);
  error = signal('');
  // MAKE SURE TO REGISTER IN main.ts or else it won't work, can include it in providers[] here but better to
  // put it in root so you don't need to repeat this step in all components
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // returns an observable so we need to subscribe!
    // get() creates a get request bluepring and subscribe() triggers it
    this.isLoading.set(true);
    const httpClientSubscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((resData) => /* unpack array of Places*/ resData.places))
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (error) => this.error.set(error.message),
        complete: () => this.isLoading.set(false),
      });

    // best practice to destroy
    this.destroyRef.onDestroy(() => httpClientSubscription.unsubscribe());
  }
}
