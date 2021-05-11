import homeModule from './home/home.module';
import moviesModule from './movies/movies.module';
import routerHelperProvider from './router-helper.provider';
import navigationService from './navigation.service';
import commonService from './common.service';
import utilsApiService from './utils.api.service';
import httpInterceptor from './http-interceptor.service';

const coreModule = angular.module('coreModule', [
  homeModule.name,
  moviesModule.name
]);
export default coreModule
  .provider('routerHelper', routerHelperProvider)
  .service('navigationService', navigationService)
  .service('commonService', commonService)
  .service('httpInterceptor', httpInterceptor)
  .service('utilsApiService', utilsApiService);
