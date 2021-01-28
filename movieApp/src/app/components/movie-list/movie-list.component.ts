import { Component, OnInit } from '@angular/core';
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

  get movies(): Movie[] {
    return this.service.movies;
  }

  isWatchListMovie: boolean = false;
  
  ngOnInit(): void {
  }

  isWatchList(i: number) {
   this.isWatchListMovie = !this.isWatchListMovie;
    console.log(this.isWatchListMovie);
    console.log(this.movies[i].id);
  }
}
