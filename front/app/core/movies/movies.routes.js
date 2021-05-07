export default function moviesRoutes(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return [
    {
      state: 'main.home.movies',
      config: {
        abstract: true,
        url: 'movies',
        template: '<ui-view></ui-view>'
      }
    },
    {
      state: 'main.home.movies.list',
      config: {
        url: '/',
        template: '<movies></movies>'
      }
    },
    {
      state: 'main.home.movies.create',
      config: {
        url: '/new',
        template: '<movie-creation></movie-creation>'
      }
    },
    {
      state: 'main.home.movies.detail',
      config: {
        url: '/{id:int}',
        template: '<movie-detail movie="$ctrl.movie"></movie-detail>',
        controller: ['movie', function(movie) {
          const $ctrl = this;
          $ctrl.movie = movie;
        }],
        controllerAs: '$ctrl',
        resolve: {
          movie: ['moviesApiService', '$stateParams', async (moviesApiService, $stateParams) => {
            const data = await moviesApiService.get($stateParams.id);
            return data;
          }]
        }
      }
    }
  ];
}

moviesRoutes.$inject = ['routerHelper'];
