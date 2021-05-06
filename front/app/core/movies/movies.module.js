import moviesComponent from './movies.component';
import moviesRoutes from './movies.routes';

export default angular.module('moviesModule', [])
  .component('movies', moviesComponent)
  .run(moviesRoutes);
