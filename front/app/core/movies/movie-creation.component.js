function movieCreationComponentCtrl(moviesApiService, navigationService, commonService, utilsApiService) {
  const $ctrl = this;

  $ctrl.$onInit = async () => {
    $ctrl.movie = {};

    $ctrl.genders = await utilsApiService.getGenders();

    $ctrl.isInitialized = true;
    $ctrl.savingInProcess = false;
  };

  $ctrl.save = async () => {
    $ctrl.savingInProcess = true;

    const movie = {
      code: $ctrl.movie.code,
      name: $ctrl.movie.name,
      originalName: $ctrl.movie.originalName,
      duration: $ctrl.movie.duration,
      image: $ctrl.movie.image,
      year: $ctrl.movie.year,
      gendersIds: $ctrl.movie.genders.map(gender => gender.id),
      description: $ctrl.movie.description
    };

    const response = await moviesApiService.save(movie).catch(err => commonService.error(err.data.message));
    if (response) {
      $ctrl.savingInProcess = false;
      commonService.success(`Se generó la película ${response.name}`);

      navigationService.goToMovieDetailPage(response.id);
    }
  };

  $ctrl.goToMoviesListPage = () => navigationService.goToMoviesListPage();

  $ctrl.isValidForm = () => $ctrl.movieCreationForm.$valid && $ctrl.movie.image && $ctrl.movie.genders.length;
}

export default {
  templateUrl: 'app/core/movies/movie-creation.component.html',
  controller: [
    'moviesApiService',
    'navigationService',
    'commonService',
    'utilsApiService',
    movieCreationComponentCtrl
  ],
  bindings: {}
};
