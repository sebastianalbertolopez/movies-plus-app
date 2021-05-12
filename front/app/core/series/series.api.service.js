export default function seriesApiService($http, $q) {
  const service = {
    list: () => {
      return $http.get(`${process.env.API_URL}/series/`)
        .then(res => res.data.body)
        .catch(err => err.data);
    },
    get: (id) => {
      return $http.get(`${process.env.API_URL}/series/${id}`)
        .then(res => res.data.body)
        .catch(err => err.data);
    }
  };

  return service;
}

seriesApiService.$inject = ['$http', '$q'];
