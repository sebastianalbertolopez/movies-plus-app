function movieCreationComponentCtrl(moviesApiService) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    console.log('nueva peli');
    $ctrl.isInitialized = true;
  };
}

export default {
  templateUrl: 'app/core/movies/movie-creation.component.html',
  controller: ['moviesApiService', movieCreationComponentCtrl],
  bindings: {}
};
