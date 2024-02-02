import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieType } from '../models/movie.model';
import { SeriesResult } from '../models/series.model';
import { ResponseByID } from '../models/movieID.model';

@Component({
  selector: 'app-slider-drag',
  standalone: true,
  imports: [],
  template: `
    <div id="rowposter" class="rowposter mt-5 mb-5">
      @for (m of movie; track $index) {
      <img
        id="imggggg"
        src="https://image.tmdb.org/t/p/w500/{{ m.poster_path }}"
        alt="movie-pic"
        class="cursor-pointer"
        (click)="slideClicked.emit(m)"
      />
      }
    </div>
  `,
  styleUrls: ['./slider-drag.component.css'],
})
export class SliderDragComponent implements OnInit {
  @Input({ required: true }) movie!: any[];
  @Output() slideClicked = new EventEmitter<any>();

  ngOnInit(): void {}
}
