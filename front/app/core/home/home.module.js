import homeComponent from './home.component';
import homeRoutes from './home.routes';

export default angular.module('homeModule', [])
  .component('home', homeComponent)
  .run(homeRoutes);
