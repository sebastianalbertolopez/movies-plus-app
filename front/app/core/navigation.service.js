export default function navigationService($state, $location) {
  const service = {
    reload: () => {
      $state.reload();
    },
    goToURL: (URL) => {
      $location.url(URL);
    },
    goToMoviesListPage: () => {
      $state.go('main.home.movies');
    },
    goToSeriesListPage: () => {
      $state.go('main.home.series');
    }
  };

  return service;
}

navigationService.$inject = ['$state', '$location'];
