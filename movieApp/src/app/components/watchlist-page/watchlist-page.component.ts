import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {

  constructor(private service: MovieService) { }

  @Input() wlMovie: Movie = {
    title: "",
    id: 0,
    overview: "",
    release_date: "",
    vote_average: 0,
    genre_ids: [],
    backdrop_path: "",
    poster_path: "",
    watchlist: false
  }
  @Input() index: any;
  
  ngOnInit(): void {
  }

  removeFromWatchlist(index: any) {
    this.wlMovie.watchlist = false
    this.service.watchlistArray.splice(index, 1);
  }

}
