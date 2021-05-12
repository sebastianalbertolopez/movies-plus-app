export default function seriesRoutes(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return [
    {
      state: 'main.home.series',
      config: {
        abstract: true,
        url: 'series',
        template: '<ui-view></ui-view>'
      }
    },
    {
      state: 'main.home.series.list',
      config: {
        url: '/',
        template: '<series></series>'
      }
    }
  ];
}

seriesRoutes.$inject = ['routerHelper'];
