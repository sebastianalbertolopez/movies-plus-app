import headerComponent from './header/header.component';
import pageHeaderComponent from './page-header/page-header.component';
import uploadFileComponent from './upload-file/upload-file.component';

const layoutModule = angular.module('layoutModule', []);

export default layoutModule
  .component('header', headerComponent)
  .component('pageHeader', pageHeaderComponent) // <page-header></page-header>
  .component('uploadFile', uploadFileComponent);
