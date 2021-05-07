export default function moviesApiService($http, $q) {
  const service = {
    list: () => {
      return new Promise((resolve, reject) => {
        $http.get(`${process.env.API_URL}/movies/`)
          .then((res) => { resolve(res.data.body); })
          .catch(err => reject(err.data));
      });
    },
    get: (id) => {
      return new Promise((resolve, reject) => {
        $http.get(`${process.env.API_URL}/movies/${id}`)
          .then((res) => { resolve(res.data.body); })
          .catch(err => reject(err.data));
      });
    }
  };

  return service;
}

moviesApiService.$inject = ['$http', '$q'];
