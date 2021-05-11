export default function utilsApiService($http, $q) {
  const service = {
    getGenders: () => {
      return $http.get(`${process.env.API_URL}/utils/genders`)
        .then(res => res.data.body)
        .catch(err => err.data);
    }
  };

  return service;
}

utilsApiService.$inject = ['$http', '$q'];
