export default function routerHelperProvider($stateProvider, $urlRouterProvider) {
  function routerHelper($state) {
    let hasOtherwise = false;

    function configureStates(states, otherwisePath) {
      states.forEach((state) => {
        $stateProvider.state(state.state, state.config);
      });

      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;
        $urlRouterProvider.otherwise(otherwisePath);
      }
    }

    function getStates() {
      return $state.get();
    }

    return {
      configureStates,
      getStates,
    };
  }

  routerHelper.$inject = ['$state'];
  this.$get = routerHelper;
}

routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
