import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../interfaces/movie';
import { Genre } from '../../interfaces/genre';
import { AppRoutingModule } from 'src/app/app-routing.module'

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
})

export class SearchCriteriaComponent implements OnInit {
  showWatchList: boolean = false;
  showMovieResults: boolean = false;
  
  watchlistClicked() {
    this.showWatchList = true;
    this.showMovieResults = false;
  }

  constructor(private service: MovieService) {}

  get movieArray(): Movie[] {
    return this.service.movieArray;
  }
  get watchlistArray(): Movie[] {
    return this.service.watchlistArray;
  }
  get genreArray(): Genre[] {
    return this.service.genreArray;
  }

  filterTitle: string = '';

  filterGenre: string = '';

  // Rating Values
  filterRating: any;
  filterRatingGTE: string = '';
  filterRatingLTE: string = '';

  filterReleaseYear: string = '';

  movieId: any;
  mainData: any;
  mainDataArray: any;

  ngOnInit(): void {
    this.service.getGenreArray().subscribe((data) => {
      this.mainData = data;
      let mainDataArray = this.mainData.genres;

      mainDataArray.forEach((genre: Genre) => {
        this.service.genreArray.push(genre);
      });
    });
  }

  searchTitle() {
    this.service.getMovieTitles(this.filterTitle).subscribe((data) => {
      this.service.movieArray.splice(0, this.service.movieArray.length);

      this.mainData = data;
      let mainDataArray = this.mainData.results;

      mainDataArray.forEach((movie: Movie) => {
        this.service.movieArray.push(movie);
      });

      this.filterTitle = '';
    });
    this.showMovieResults = true;
    this.showWatchList = false;
  }

  searchFilters() {
    if ((this.filterRating = 1)) {
      this.filterRatingGTE = '10';
      this.filterRatingLTE = '10';
    } else if ((this.filterRating = 2)) {
      this.filterRatingGTE = '10';
      this.filterRatingLTE = '8';
    } else if ((this.filterRating = 3)) {
      this.filterRatingGTE = '10';
      this.filterRatingLTE = '5';
    } else if ((this.filterRating = 4)) {
      this.filterRatingGTE = '4';
      this.filterRatingLTE = '1';
    } else if ((this.filterRating = 5)) {
      this.filterRatingGTE = '1';
      this.filterRatingLTE = '1';
    } else {
      this.filterRatingGTE = '';
      this.filterRatingLTE = '';
    }

    this.service
      .getMovieFilters(
        this.filterGenre,
        this.filterRatingGTE,
        this.filterRatingLTE,
        this.filterReleaseYear
      )
      .subscribe((data) => {
        this.service.movieArray.splice(0, this.service.movieArray.length);

        this.mainData = data;
        let mainDataArray = this.mainData.results;

        mainDataArray.forEach((movie: Movie) => {
          this.service.movieArray.push(movie);
        });

        this.filterTitle = '';
        this.filterGenre = '';
        this.filterRating = '';
        this.filterReleaseYear = '';
      });
      this.showMovieResults = true;
      this.showWatchList = false;  
  }

  isWatchList(i: number) {
    let movieId = this.movieArray[i].id;
    this.movieArray[i].watchlist = !this.movieArray[i].watchlist;

    this.service.getMovieId(movieId).subscribe((data) => {
      if (this.movieArray[i].watchlist) {
        this.service.watchlistArray.push(this.movieArray[i]);
      } else if (!this.movieArray[i].watchlist) {
        let wlArrayMovieIndex = this.service.watchlistArray.indexOf(
          this.movieArray[i]
        );
        this.service.watchlistArray.splice(wlArrayMovieIndex, 1);
      }
    });
  }
}
