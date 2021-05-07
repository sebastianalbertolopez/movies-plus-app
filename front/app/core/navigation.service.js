export default function navigationService($state, $location) {
  const service = {
    reload: () => {
      $state.reload();
    },
    goToURL: (URL) => {
      $location.url(URL);
    },
    goToMoviesListPage: () => {
      $state.go('main.home.movies.list');
    },
    goToMovieCreationPage: () => {
      $state.go('main.home.movies.create');
    },
    goToMovieDetailPage: (id) => {
      $state.go('main.home.movies.detail', { id });
    }
  };

  return service;
}

navigationService.$inject = ['$state', '$location'];
