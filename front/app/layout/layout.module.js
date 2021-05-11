import headerComponent from './header/header.component';
import uploadImageComponent from './upload-image/upload-image.component';

const layoutModule = angular.module('layoutModule', []);

export default layoutModule
  .component('header', headerComponent)
  .component('uploadImage', uploadImageComponent);
