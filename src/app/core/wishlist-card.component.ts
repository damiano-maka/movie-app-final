import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { WishList } from '../models/movieID.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    <li class="flex flex-col justify-between md:flex-row  gap-x-5 py-5">
      <div class="flex min-w-0 gap-x-4">
        <img
          class="h-20 w-20 flex-none rounded-full bg-gray-50"
          src="https://image.tmdb.org/t/p/w500{{ movie.poster_path }}"
          alt="{{ movie.title }}"
        />
        <div class="min-w-0 flex-auto">
          <p class="text-m font-semibold leading-6 text-white">
            Title : {{ movie.title }}
          </p>
          <p class="mt-1 truncate text-s leading-5 text-gray-400">
            Added by :
            <a class="cursor-pointer underline" routerLink="/profile">{{
              user
            }}</a>
          </p>
        </div>
      </div>
      <div class="shrink-0 mt-3">
        <button
          class="btn btn-sm btn-error text-white"
          (click)="cardClicked.emit(movie)"
        >
          X
        </button>
      </div>
    </li>
  `,
  styles: ``,
})
export class WishlistCardComponent {
  @Input({ required: true }) movie!: WishList;
  @Input({ required: true }) user!: string | undefined;
  @Output() cardClicked = new EventEmitter<WishList>();
  router = inject(Router);

  goWatch(movie: string) {
    this.router.navigate(['/player', movie]);
  }
}
