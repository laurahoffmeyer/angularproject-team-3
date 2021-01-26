import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit  {

  constructor(private service: MovieService) {}

  get movies(): Movie[] {
    return this.service.movies;
  }

  filterTitle: string = "";
  mainData: any;
  mainDataArray: any;

  ngOnInit(): void {
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
    })
  }
}