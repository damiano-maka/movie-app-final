import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Series, SeriesResult } from '../models/series.model';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(serie.poster_path){
    <div class="card w-80 card-w mb-5">
      <figure>
        <img
          src="https://image.tmdb.org/t/p/w500{{ serie.poster_path }}"
          class="cursor-pointer"
          (click)="cardClicked.emit(serie)"
          alt="{{ serie.original_name }}"
        />
      </figure>
      <div
        class="card-body glass br jusitfy-center text-gray-800"
        style="background-color: var(--sfondo-list);"
      >
        <h2 class="card-title">{{ serie.name }}</h2>
        Release date: {{ serie.first_air_date | date }}
        <button
          class="btn btn-sm bton text-gray-800"
          (click)="cardClicked.emit(serie)"
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
export class CardSeriesComponent {
  @Input() cardClass!: string;
  @Input({ required: true }) serie!: SeriesResult;
  @Output() cardClicked = new EventEmitter<SeriesResult>();
}
