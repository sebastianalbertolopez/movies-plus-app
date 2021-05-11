function movieDetailComponentCtrl(moviesApiService) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.strLimit = 350;
    $ctrl.movie.fileUrl = `${process.env.API_URL}/files/${$ctrl.movie.file_uuid}`;
    $ctrl.movieDescriptionLimit = $ctrl.strLimit;
    $ctrl.isInitialized = true;
  };

  $ctrl.showMore = () => {
    $ctrl.movieDescriptionLimit = $ctrl.movie.description.length;
  };

  $ctrl.showLess = () => {
    $ctrl.movieDescriptionLimit = $ctrl.strLimit;
  };
}

export default {
  templateUrl: 'app/core/movies/movie-detail.component.html',
  controller: ['moviesApiService', movieDetailComponentCtrl],
  bindings: { movie: '<' }
};
