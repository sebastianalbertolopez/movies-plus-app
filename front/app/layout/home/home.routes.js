export default function homeRoutes(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return [
    {
      state: 'main.home',
      config: {
        url: '/',
        template: '<h1>Home</h1>',
      },
    },
  ];
}

homeRoutes.$inject = ['routerHelper'];
