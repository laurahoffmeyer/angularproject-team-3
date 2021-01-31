import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../interfaces/movie';
import { SearchCriteriaComponent } from '../search-criteria/search-criteria.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private service: MovieService) { }

  @Input() singleMovie: Movie = {
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
  @Output() isOnWatchListMovie = new EventEmitter<any>()
  
  ngOnInit(): void {
  }

  isWatchList() {
    this.isOnWatchListMovie.emit()
  }
}
