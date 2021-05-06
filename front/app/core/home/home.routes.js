export default function homeRoutes(routerHelper) {
  routerHelper.configureStates(getStates(), '404');
}

function getStates() {
  return [
    {
      state: 'main.home',
      config: {
        url: '/',
        template: '<home></home>',
        redirectTo: process.env.DEFAULT_PAGE_STATE
      }
    },
    {
      state: 'main.home.404',
      config: {
        url: '404',
        templateUrl: 'app/core/404/404.template.html'
      }
    }
  ];
}

homeRoutes.$inject = ['routerHelper'];
