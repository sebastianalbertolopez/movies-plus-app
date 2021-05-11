export default function moviesApiService($http, $q) {
  const service = {
    list: () => {
      return $http.get(`${process.env.API_URL}/movies/`)
        .then(res => res.data.body)
        .catch(err => err.data);
    },
    get: (id) => {
      return $http.get(`${process.env.API_URL}/movies/${id}`)
        .then(res => res.data.body)
        .catch(err => err.data);
    },
    save: (model) => {
      return $http.post(`${process.env.API_URL}/movies/`, model)
        .then(res => res.data.body)
        .catch(err => err.data);
    },
    update: (model) => {
      return $http.put(`${process.env.API_URL}/movies/`, model)
        .then(res => res.data.body)
        .catch(err => err.data);
    },
    delete: (id) => {
      return $http.delete(`${process.env.API_URL}/movies/${id}`)
        .then(res => res.data.body)
        .catch(err => err.data);
    }
  };

  return service;
}

moviesApiService.$inject = ['$http', '$q'];
