export default function appRoutes($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('main', {
      url: '',
      template: '<ui-view></ui-view>',
      redirectTo: process.env.DEFAULT_PAGE_STATE,
    })
    .state('main.404', {
      url: '/404',
      template: '<h1>Error</h1>',
    });

  $urlRouterProvider.otherwise('404');
}
