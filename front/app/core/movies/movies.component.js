function moviesComponentCtrl(moviesApiService, navigationService) {
  const $ctrl = this;

  $ctrl.$onInit = async () => {
    $ctrl.movies = await moviesApiService.list().catch((err) => { alert(err.message); });
    if ($ctrl.movies) {
      angular.forEach($ctrl.movies, (movie) => {
        movie.fileUrl = `${process.env.API_URL}/files/${movie.file_uuid}`;
      });
    }

    $ctrl.isInitialized = true;
  };

  $ctrl.createMovie = () => navigationService.goToMovieCreationPage();

  $ctrl.goToMovieDetail = id => navigationService.goToMovieDetailPage(id);
}

export default {
  templateUrl: 'app/core/movies/movies.component.html',
  controller: ['moviesApiService', 'navigationService', moviesComponentCtrl],
  bindings: {}
};
