import moviesComponent from './movies.component';
import movieCreationComponent from './movie-creation.component';
import movieDetailComponent from './movie-detail.component';
import movieUpdateComponent from './movie-update.component';
import moviesRoutes from './movies.routes';
import moviesApiService from './movies.api.service';

export default angular.module('moviesModule', [])
  .component('movies', moviesComponent)
  .component('movieCreation', movieCreationComponent)
  .component('movieDetail', movieDetailComponent)
  .component('movieUpdate', movieUpdateComponent)
  .service('moviesApiService', moviesApiService)
  .run(moviesRoutes);
