export default function appRoutes($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('main', {
      url: '',
      template: '<ui-view></ui-view>',
      resolve: {
        // Se define en el state raíz del módulo que primero obtenga la configuración local para que esté disponible en todo momento
        /* localSettingsResolve: ['localSettings', (localSettings) => {
          return localSettings.getSettings();
        }], */
      },
      redirectTo: process.env.DEFAULT_PAGE_STATE,
    })
    .state('main.404', {
      url: '/404',
      template: '<h1>Error</h1>',
    });

  $urlRouterProvider.otherwise('404');
}
