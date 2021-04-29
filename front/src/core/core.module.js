import routerHelperProvider from './router-helper.provider';

const coreModule = angular.module('core', []);

export default coreModule
  .provider('routerHelper', routerHelperProvider);
