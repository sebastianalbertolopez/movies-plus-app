export default function moviesRoutes(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return [
    {
      state: 'main.home.movies',
      config: {
        url: 'movies',
        template: '<movies></movies>'
      }
    }
  ];
}

moviesRoutes.$inject = ['routerHelper'];
