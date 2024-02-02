import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CardComponent } from '../core/card.component';
import { AuthService } from '@auth0/auth0-angular';
import { PostService } from '../services/post.service';
import { WishList } from '../models/movieID.model';
import { WishlistCardComponent } from '../core/wishlist-card.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-mylist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CardComponent, WishlistCardComponent, RouterLink],
  template: `
    @if (userO | async; as user) {
    <div class="navbar" style="background-color: var(--sfondo-nav);">
      <b class="text-xl text-white mx-auto">WISH LIST</b>
    </div>
    <div class=" p-3 vh">
      @if (movies().length > 0) {
      <ul role="list" class="p-3">
        @for (movie of movies(); track $index) {
        <app-wishlist-card
          [movie]="movie"
          [user]="user.name"
          (cardClicked)="onDeleteButtonClick(movie.id, user?.nickname)"
        />
        }
      </ul>
      }@else {
      <div class=" p-5 vh-45 text-center">
        <h1>NO ITEMS ON LIST</h1>
        <button
          class="btn btn-sm btn-primary mt-5 text-white"
          routerLink="/home"
        >
          Go back home
        </button>
      </div>
      }
    </div>
    }@else{
    <h1>USER NOT FOUND | ERROR | PLEASE LOG IN AGAIN</h1>
    }
  `,
  styles: [
    `
      .vh {
        min-height: 60vh;
      }
    `,
  ],
})
export default class MylistComponent {
  http = inject(HttpClient);

  userO = inject(AuthService).user$;
  auth = inject(AuthService);
  usersService = inject(PostService);
  nickname!: string | undefined;
  movies = signal<WishList[]>([]);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.auth.user$.subscribe((user) => {
      this.nickname = user?.nickname;
      this.fetchData(this.nickname as string);
    });
  }

  async fetchData(userid: string) {
    try {
      const movies = await this.usersService.getMoviesCollection(userid);
      this.movies.set(movies);
      this.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  onDeleteButtonClick(movie: string, userid: string | undefined) {
    this.usersService
      .deleteUserDocument(movie, userid)
      .then(() => {
        console.log('Movie deleted successfully!');
        location.reload();
      })
      .catch((error) => {
        console.error('Error deleting movie:', error);
      });
  }
}
/*     <div class="flex flex-wrap gap-3 mt-5 p-2 justify-center">
      @for (movie of movies(); track $index) {
        <div class="card card-w mb-5 glass">
            <figure><img src="https://image.tmdb.org/t/p/w500{{movie.poster_path}}" class="cursor-pointer" alt="{{movie.title}}"/></figure>
          <div class="card-body jusitfy-center">
            <h2 class="card-title">{{movie.title}}</h2>
            <br><button class="btn btn-sm btn-error bton" (click)="onDeleteButtonClick(movie.id, user?.nickname)">Remove</button>
          </div>
        </div>
      }
    </div> */
