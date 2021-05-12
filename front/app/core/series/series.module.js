import seriesComponent from './series.component';
import seriesRoutes from './series.routes';
import seriesApiService from './series.api.service';

export default angular.module('seriesModule', [])
  .component('series', seriesComponent)
  .service('seriesApiService', seriesApiService)
  .run(seriesRoutes);
