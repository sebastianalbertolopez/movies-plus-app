function movieDetailComponentCtrl(moviesApiService) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.isInitialized = true;
  };
}

export default {
  templateUrl: 'app/core/movies/movie-detail.component.html',
  controller: ['moviesApiService', movieDetailComponentCtrl],
  bindings: { movie: '<' }
};
