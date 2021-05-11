function movieDetailComponentCtrl(moviesApiService, commonService, navigationService) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.fileUrl = `${process.env.API_URL}/files/${$ctrl.movie.file.uuid}`;
    $ctrl.gendersName = $ctrl.movie.genders.map(gender => gender.name).join(', ');

    $ctrl.actions = [
      {
        name: 'Modificar',
        action: () => { $ctrl.update(); }
      },
      {
        name: 'Eliminar',
        action: $ctrl.delete
      }
    ];

    $ctrl.strLimit = 350;
    $ctrl.movieDescriptionLimit = $ctrl.strLimit;

    $ctrl.isInitialized = true;
  };

  $ctrl.showMore = () => {
    $ctrl.movieDescriptionLimit = $ctrl.movie.description.length;
  };

  $ctrl.showLess = () => {
    $ctrl.movieDescriptionLimit = $ctrl.strLimit;
  };

  $ctrl.update = () => {
    navigationService.goToMovieUpdatePage($ctrl.movie.id);
  };

  $ctrl.delete = async () => {
    await moviesApiService.delete($ctrl.movie.id).catch(err => commonService.error(err));
    commonService.success(`Se eliminó la película ${$ctrl.movie.name}`);
    navigationService.goToMoviesListPage();
  };
}

export default {
  templateUrl: 'app/core/movies/movie-detail.component.html',
  controller: ['moviesApiService', 'commonService', 'navigationService', movieDetailComponentCtrl],
  bindings: { movie: '<' }
};
