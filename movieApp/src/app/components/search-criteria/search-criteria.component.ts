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

  get watchListArray(): Movie[] {
    return this.service.watchListArray;
  }
  
  movieId: any;
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

  isWatchList(i: number){   

    let movieId = this.movies[i].id;
    console.log("movieID =" + movieId);

    this.movies[i].watchList = !this.movies[i].watchList;


      this.service.getMovieId(movieId).subscribe(data => {
        console.log(this.movies[i].watchList)

        if (this.movies[i].watchList) {  
        console.log("add to list");
        this.service.watchListArray.push(this.movies[i]);
        console.log(this.service.watchListArray);
        // console.log(i);
      } 
      else if (!this.movies[i].watchList) {
      let selectedMovie = (movieId: any) => this.watchListArray[i].id = movieId;
      console.log(movieId);
      
      console.log(this.service.watchListArray.findIndex(selectedMovie));
       console.log(selectedMovie);
        // let newIndex = this.service.watchList[i]
        // console.log(newIndex);
        // this.service.watchList.splice(newIndex, 1);
        // console.log(i);
        console.log("remove from list");
        console.log(this.service.watchListArray);
      }
      })  
  }
}
