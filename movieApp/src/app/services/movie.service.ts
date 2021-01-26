import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies: Movie[] = []

  constructor(private http: HttpClient) { }

  apiKey: string = "b7c1d24c6344d255a94091d79d6ac5af";

  getMovieTitles(filterTitle: string) {
     return this.http.get("https://api.themoviedb.org/3/search/movie?", {
       params: { api_key: this.apiKey, query: filterTitle, include_adult: "false" }
     });
   }
  
}
