import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';
import { SliderComponent } from '../core/slider.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CardComponent } from '../core/card.component';
import { TmdbService } from '../services/tmdb.service';
import { MovieType } from '../models/movie.model';
import { WelcomeComponent } from '../core/welcome.component';
import ErrorComponent from '../core/error.component';
import { SliderDragComponent } from '../core/slider-drag.component';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    SliderComponent,
    RouterOutlet,
    CardComponent,
    WelcomeComponent,
    ErrorComponent,
    SliderDragComponent,
  ],
  template: `
    <div class="ml-3 mr-3">
      <app-slider-drag [movie]="movies()" (slideClicked)="click($event)" />
    </div>
    <div class="divider divider-vertical text-white divider-neutral">
      <p>Scroll left/right for other movies</p>
    </div>
    <div class="flex justify-end mr-5">
      <div class="join mr-5" style="background-color: var(--sfondo-nav);">
        @if(pageN > 1){
        <button class="join-item btn btn-lg btn-neutral" (click)="prevP()">
          «
        </button>
        }
        <a
          class="join-item btn-lg btn-neutral text-white text-2xl flex items-center text-bold"
          (click)="(null)"
        >
          {{ pageN }}
        </a>
        <button class="join-item btn btn-lg btn-neutral" (click)="nextP()">
          »
        </button>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 mt-5 p-2 justify-center">
      @for (item of movies(); track $index) {
      <app-card [movie]="item" (cardClicked)="click($event)" />
      }
    </div>
    <div class="flex justify-end mr-5 mb-5">
      <div class="join mr-5" style="background-color: var(--sfondo-nav);">
        @if(pageN > 1){
        <button class="join-item btn btn-lg btn-neutral" (click)="prevP()">
          «
        </button>
        }
        <a
          class="join-item btn-lg btn-neutral text-white text-2xl flex items-center text-bold"
          (click)="(null)"
        >
          {{ pageN }}
        </a>
        <button class="join-item btn btn-lg btn-neutral" (click)="nextP()">
          »
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export default class MoviePageComponent {
  router = inject(Router);
  auth = inject(AuthService);
  authSig = toSignal(this.auth.isAuthenticated$);
  movies = signal<MovieType[]>([]);
  tmdbService = inject(TmdbService);
  pageN: number = 1;

  ngOnInit(): void {
    this.getMovies();
  }

  click(movie: MovieType) {
    this.router.navigate(['/m', movie.id]);
    window.scrollTo(0, 0);
  }

  getMovies(): void {
    this.tmdbService.loadMovies(this.pageN).subscribe({
      next: (res) => {
        this.movies.set(res.results);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  nextP() {
    this.pageN++;
    this.getMovies();
    window.scrollTo(0, 0);
  }

  prevP() {
    this.pageN--;
    this.getMovies();
    window.scrollTo(0, 0);
  }
}
