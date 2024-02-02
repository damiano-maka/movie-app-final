import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MovieType } from '../models/movie.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(movie.poster_path){
    <div class="card w-80 card-w mb-5">
      <figure>
        <img
          src="https://image.tmdb.org/t/p/w500{{ movie.poster_path }}"
          class="cursor-pointer"
          (click)="cardClicked.emit(movie)"
          alt="{{ movie.original_title }}"
        />
      </figure>
      <div
        class="card-body glass br jusitfy-center text-gray-800"
        style="background-color: var(--sfondo-list);"
      >
        <h2 class="card-title">{{ movie.title }}</h2>
        Release date: {{ movie.release_date | date }}
        <button
          class="btn btn-sm bton text-gray-800"
          (click)="cardClicked.emit(movie)"
        >
          Watch Now!
        </button>
      </div>
    </div>
    }
  `,
  styles: [
    `
      .br {
        border-radius: 0 0 10px 10px;
      }
      .bton {
        max-height: 200px;
        background-color: #acc2ef;
      }
      img {
        width: 100%;
        height: 100%;
        max-height: 500px;
        max-width: 400px;
      }
      img:hover {
        transform: scale(1.18);
        transition: ease-in-out 950ms;
      }
    `,
  ],
})
export class CardComponent {
  @Input() cardClass!: string;
  @Input({ required: true }) movie!: MovieType;
  @Output() cardClicked = new EventEmitter<MovieType>();
}
