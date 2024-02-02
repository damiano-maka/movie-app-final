import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { MovieType } from '../models/movie.model';
import { CardComponent } from '../core/card.component';
import { Router } from '@angular/router';
import { CardSeriesComponent } from '../core/cardSeries.component';
import { SeriesResult } from '../models/series.model';

@Component({
  selector: 'app-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, CardSeriesComponent],
  template: `
    <div class="vh">
      <div class="flex justify-center gap-5 p-5">
        <label class="form-control w-full max-w-xs">
          <input
            type="text"
            #input
            placeholder="Type here"
            (keydown.enter)="getSearch(input)"
            class="input input-bordered w-full max-w-xs text-gray-300"
            style="background-color: var(--sfondo-scuro);"
          />
        </label>
        <button
          class="btn text-gray-200"
          style="background-color: var(--sfondo-list);"
          (click)="getSearch(input)"
        >
          Search
        </button>
      </div>
      @if(error){
      <div class=" p-5 vh-45 text-center text-2xl text-white">
        <h1>No Results Found</h1>
      </div>
      }@else {

      <div class="flex flex-wrap gap-3 mt-5 p-2 justify-center">
        @for (item of movies(); track $index) { @if(item.media_type == "movie"){
        <app-card [movie]="item" (cardClicked)="movieClick($event)" />
        }@else{
        <app-series [serie]="item" (cardClicked)="serieClick($event)" />
        } }
      </div>
      }
    </div>
  `,
  styles: [
    `
      .vh {
        min-height: 60vh;
      }
    `,
  ],
})
export default class SearchComponent implements OnInit {
  tmdbService = inject(TmdbService);
  movies = signal<any[]>([]);
  router = inject(Router);
  changeDetectorRef = inject(ChangeDetectorRef);
  error: boolean = false;

  movieClick(movie: MovieType) {
    this.router.navigate(['/m', movie.id]);
    window.scrollTo(0, 0);
  }

  serieClick(movie: SeriesResult) {
    this.router.navigate(['/s', movie.id]);
    window.scrollTo(0, 0);
  }

  getSearch(input: HTMLInputElement) {
    if (!input.value.trim()) {
      return;
    }

    this.tmdbService.loadSearch(input.value).subscribe({
      next: (res) => {
        if (res.results.length > 0) {
          this.movies.set(res.results);
          this.changeDetectorRef.detectChanges();
          input.value = '';
          this.changeDetectorRef.detectChanges();
        } else {
          this.error = true;
          this.changeDetectorRef.detectChanges();
          input.value = '';
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}
}
