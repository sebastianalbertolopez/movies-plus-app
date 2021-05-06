function headerComponentCtrl(navigationService) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.pages = [
      {
        name: 'Movies',
        code: 'movies',
        onClick: () => {
          $ctrl.activePageCode = 'movies';
          navigationService.goToMoviesListPage();
        }
      },
      {
        name: 'Series',
        code: 'series',
        onClick: () => {
          $ctrl.activePageCode = 'series';
          navigationService.goToSeriesListPage();
        }
      }
    ];

    $ctrl.activePageCode = $ctrl.pages[0].code;
  };

  $ctrl.goToHomePage = () => {
    navigationService.goToMoviesListPage();
  };
}

export default {
  templateUrl: 'app/layout/header/header.component.html',
  controller: ['navigationService', headerComponentCtrl],
  bindings: {}
};
