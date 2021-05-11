function movieUpdateComponentCtrl(moviesApiService, navigationService, commonService, utilsApiService) {
  const $ctrl = this;

  $ctrl.$onInit = async () => {
    $ctrl.genders = await utilsApiService.getGenders();

    console.log($ctrl.genders);
    $ctrl.isInitialized = true;
    $ctrl.savingInProcess = false;
  };

  $ctrl.save = async () => {
    $ctrl.savingInProcess = true;

    const movie = {
      id: $ctrl.movie.id,
      code: $ctrl.movie.code,
      name: $ctrl.movie.name,
      originalName: $ctrl.movie.originalName,
      duration: $ctrl.movie.duration,
      file: $ctrl.movie.file,
      year: $ctrl.movie.year,
      gendersIds: $ctrl.movie.genders.map(gender => gender.id),
      description: $ctrl.movie.description
    };

    const response = await moviesApiService.update(movie).catch(err => commonService.error(err.data.message));
    if (response) {
      $ctrl.savingInProcess = false;
      commonService.success(`Se modificó la película ${response.name}`);

      navigationService.goToMovieDetailPage(response.id);
    }
  };

  $ctrl.goToMoviesListPage = () => navigationService.goToMoviesListPage();

  $ctrl.isValidForm = () => $ctrl.movieUpdateForm.$valid && $ctrl.movie.file && $ctrl.movie.genders.length;
}

export default {
  templateUrl: 'app/core/movies/movie-update.component.html',
  controller: [
    'moviesApiService',
    'navigationService',
    'commonService',
    'utilsApiService',
    movieUpdateComponentCtrl
  ],
  bindings: { movie: '<' }
};
