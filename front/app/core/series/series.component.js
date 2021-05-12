function seriesComponentCtrl(seriesApiService, navigationService, commonService) {
  const $ctrl = this;

  $ctrl.$onInit = async () => {
    $ctrl.series = await seriesApiService.list().catch(err => commonService.error(err.message));
    if ($ctrl.series) {
      angular.forEach($ctrl.series, (serie) => {
        serie.fileUrl = `${process.env.API_URL}/files/${serie.file_uuid}`;
      });
    }

    $ctrl.actions = [
      {
        name: 'Agregar',
        action: $ctrl.createSerie
      }
    ];

    $ctrl.isInitialized = true;
  };

  $ctrl.createMovie = () => console.log('Create Serie');

  $ctrl.goToSerieDetail = id => console.log('Serie Details', id);
}

export default {
  templateUrl: 'app/core/series/series.component.html',
  controller: ['seriesApiService', 'navigationService', 'commonService', seriesComponentCtrl],
  bindings: {}
};
