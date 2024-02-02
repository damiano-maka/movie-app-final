import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Movies } from '../models/movie.model';
import { ResponseByID } from '../models/movieID.model';
import { Observable } from 'rxjs';
import { Series, SeriesResult } from '../models/series.model';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  http = inject(HttpClient);

  private apiKey = '2245e7b70e506bfeca959594cb82c0b9';
  private baseUrl = 'https://api.themoviedb.org/3';

  addApiKey(url: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}api_key=${this.apiKey}`;
  }

  loadMovies(number: number): Observable<Movies> {
    const url = this.addApiKey(
      `${this.baseUrl}/trending/movie/week?include_video=true&language=en-US&page=${number}&sort_by=popularity.desc`
    );
    return this.http.get<Movies>(url);
  }

  loadSingle(id: number): Observable<ResponseByID> {
    const url = this.addApiKey(`${this.baseUrl}/movie/${id}`);
    return this.http.get<ResponseByID>(url);
  }

  loadSeries(number: number): Observable<Series> {
    const url = this.addApiKey(
      `${this.baseUrl}/trending/tv/week?include_video=true&language=en-US&page=${number}&sort_by=popularity.desc`
    );
    return this.http.get<Series>(url);
  }

  loadSingleSer(id: number): Observable<SeriesResult> {
    const url = this.addApiKey(`${this.baseUrl}/tv/${id}`);
    return this.http.get<SeriesResult>(url);
  }

  loadSearch(query: string): Observable<Movies> {
    const url = this.addApiKey(
      `${this.baseUrl}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
    );
    return this.http.get<Movies>(url);
  }
}
