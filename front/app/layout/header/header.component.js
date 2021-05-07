function headerComponentCtrl(navigationService) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.pages = [
      {
        name: 'Películas',
        code: 'peliculas',
        onClick: () => {
          $ctrl.activePageCode = 'peliculas';
          navigationService.goToMoviesListPage();
        }
      }
    ];

    $ctrl.activePageCode = $ctrl.pages[0].code;
  };

  $ctrl.goToMoviesListPage = () => {
    navigationService.goToMoviesListPage();
  };
}

export default {
  templateUrl: 'app/layout/header/header.component.html',
  controller: ['navigationService', headerComponentCtrl],
  bindings: {}
};
