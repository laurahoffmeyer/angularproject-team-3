import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {

  @Input() wLMovies: Movie = {
    title: "",
    id: 0,
    overview: "",
    release_date: "",
    vote_average: 0,
    genre_ids: [],
    backdrop_path: "",
    poster_path: "",
    watchList: false
  }
  @Input() index: any;
  
  constructor(private service: MovieService) { }

  ngOnInit(): void {
  }

  removeFromWatchlist(index: any) {
    this.service.watchListArray.splice(index, 1);
  }

}
