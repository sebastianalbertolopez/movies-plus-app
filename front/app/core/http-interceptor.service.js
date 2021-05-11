export default function httpInterceptor($q, $location, $injector) {
  const service = {
    responseError: (rejection) => {
      console.log('rejection', rejection);
      console.log('rejection_data', rejection.data);
      if (rejection.data) {
        if (rejection.data.status === 404) {
          $location.path('/404');
          return $q(() => null);
        }

        ($injector.get('commonService')).error(rejection.data.message);
      }

      return $q.reject(rejection);
    }
  };

  return service;
}

httpInterceptor.$inject = ['$q', '$location', '$injector'];
