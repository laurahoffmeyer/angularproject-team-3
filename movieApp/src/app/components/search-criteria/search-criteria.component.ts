import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css']
})
export class SearchCriteriaComponent implements OnInit {

  constructor(private service: MovieService) { }

  get movies(): Movie[] {
    return this.service.movies;
  }
  
  filterTitle: string = "";
  mainData: any;
  mainDataArray: any;

  ngOnInit(): void {
    console.log(this.movies);
  }

  searchTitle(){
    this.service.getMovieTitles(this.filterTitle).subscribe(data => {
          
      this.service.movies.splice(0, this.service.movies.length);

      this.mainData = data;
      let mainDataArray = this.mainData.results;

      mainDataArray.forEach((movie: any) => {
        this.service.movies.push(movie);
      });
      // this.backdropBg = document.getElementById('backdrop-bg') as HTMLElement;  
      // this.backdropBg.style.setProperty('--backdrop', 'url(https://image.tmdb.org/t/p/original/' + mainDataArray.backdrop_path + ')');
      this.filterTitle = "";
      console.log(this.movies);
    })
  }

  isWatchListMovie: boolean = false;

  isWatchList(i: number){
    this.isWatchListMovie = !this.isWatchListMovie;
    console.log(this.isWatchListMovie);
  }

}
