import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { switchMap } from 'rxjs';
import { ResponseByID } from '../models/movieID.model';
import { CommonModule } from '@angular/common';
import { MovieType } from '../models/movie.model';
import { SliderDragComponent } from '../core/slider-drag.component';
import { AuthService, User } from '@auth0/auth0-angular';
import { PostService } from '../services/post.service';
import { Series, SeriesResult } from '../models/series.model';
@Component({
  selector: 'app-series-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SliderDragComponent, RouterLink],
  template: `
    @if (user$ | async; as user) {
    <div class="overflow-hidden bck py-5 sm:py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
        >
          <div class="lg:pr-8 lg:pt-3">
            <div class="lg:max-w-lg lg:py-28">
              <h2 class="text-base font-semibold leading-7 text-gray-400">
                Status: {{ series?.first_air_date }}
              </h2>
              <p
                class="mt-2 text-5xl font-bold tracking-tight text-gray-200 sm:text-5xl"
              >
                {{ series?.name }}
              </p>
              <p class="mt-6 text-lg leading-8 text-white">
                {{ series?.overview }}
              </p>
              <dl
                class="mt-5 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
              >
                <div class="flex w-full justify-center">
                  <button
                    class="grid h-10 card btn btn-error hover:text-white"
                    [routerLink]="['/players', series?.id]"
                  >
                    Watch Now !
                  </button>
                  <div class="divider divider-horizontal"></div>
                  <div class="flex flex-col">
                    <button
                      class="grid h-10 card btn btn-success"
                      (click)="addMovie(series!, user.nickname)"
                    >
                      Add to wishlist !
                    </button>
                    <span
                      *ngIf="isSuccess === true"
                      class="mt-3 inline-flex items-center rounded-md bg-success px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20 mt-3"
                      >Movie added successfully!</span
                    >
                    <span
                      *ngIf="isSuccess === false"
                      class="mt-3 inline-flex items-center rounded-md bg-error px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10"
                      >Oops, something went wrong!
                    </span>
                  </div>
                </div>
              </dl>
            </div>
          </div>
          <img
            src="https://image.tmdb.org/t/p/w500/{{ series!.poster_path }}"
            width="200"
            height="200"
            alt="Product screenshot"
            class="rounded-xl shadow-xl ring-1 ring-gray-400/10 w-full"
          />
        </div>
      </div>
    </div>

    <div class="divider divider-vertical text-white divider-neutral">
      <p>Recommendations of the same category</p>
    </div>
    <div class="ml-3 mr-3">
      <app-slider-drag
        [movie]="seriess()"
        (slideClicked)="clickRecom($event)"
      />
    </div>
    <div class="divider divider-vertical text-white divider-neutral">
      <p>Scroll left/right for other movies</p>
    </div>

    }
  `,
  styles: ``,
})
export default class SeriesDetailsComponent implements OnInit {
  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  service = inject(TmdbService);

  series!: SeriesResult | null | undefined;

  seriess = signal<SeriesResult[]>([]);
  router = inject(Router);
  usersService = inject(PostService);
  user$ = inject(AuthService).user$;
  auth = inject(AuthService);

  isSuccess!: boolean;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  clickRecom(series: SeriesResult) {
    this.router.navigate([`/m/${series.id}`]);
    this.series = series as SeriesResult;
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap((params) => this.service.loadSingleSer(params['id'])))
      .subscribe((details: SeriesResult) => {
        this.series = details;
      });
    this.getMovies();
  }
  getMovies(): void {
    this.service.loadSeries(1).subscribe({
      next: (res) => {
        this.seriess.set(res.results);
      },
      error: (err) => {},
    });
  }

  async addMovie(
    series: SeriesResult,
    user: string | undefined
  ): Promise<void> {
    const userID = user as string;
    const movieX = {
      backdrop_path: series.backdrop_path as string,
      poster_path: series.poster_path as string,
      title: series.name,
      id: JSON.stringify(series.id),
    };
    const { backdrop_path, poster_path, title, id } = movieX;

    try {
      await this.usersService.addMovie(
        { backdrop_path, poster_path, title, id },
        id,
        userID
      );
      this.isSuccess = true;
      this.changeDetectorRef.detectChanges();
    } catch (error) {
      this.isSuccess = false;
      this.changeDetectorRef.detectChanges();
    }
  }
}
