export default function homeRoutes(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return [
    {
      state: 'main.home',
      config: {
        url: '/',
        template: '<home></home>',
      },
    },
  ];
}

homeRoutes.$inject = ['routerHelper'];
