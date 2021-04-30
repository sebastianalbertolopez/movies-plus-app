import routerHelperProvider from './services/router-helper.provider';

const coreModule = angular.module('core', []);

export default coreModule
  .provider('routerHelper', routerHelperProvider);
