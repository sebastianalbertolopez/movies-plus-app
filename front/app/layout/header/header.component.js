function headerComponentCtrl(navigationService, $state) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    console.log($state.$current);
    $ctrl.pages = [
      {
        name: 'Películas',
        code: 'movies',
        isActive: isActiveState,
        onClick: () => navigationService.goToMoviesListPage()
      },
      {
        name: 'Series',
        code: 'series',
        isActive: isActiveState,
        onClick: () => navigationService.goToSeriesListPage()
      }
    ];
  };

  $ctrl.goToMoviesListPage = () => {
    navigationService.goToMoviesListPage();
  };

  function isActiveState(page) {
    return $state.$current.parent.name.split('.').pop() === page;
  }
}

export default {
  templateUrl: 'app/layout/header/header.component.html',
  controller: ['navigationService', '$state', headerComponentCtrl],
  bindings: {}
};
