import headerComponent from './header/header.component';

const uiModule = angular.module('uiModule', []);

export default uiModule
  .component('header', headerComponent);
