(function () {
  var psMovies = function ($http) {
    var getMovies = function () {
      return $http.get("/movies.json").then((response) => {
        return response.data;
      });
    };

    return {
      getMovies: getMovies,
    };
  };

  var app = angular.module("PsMovies");
  app.factory("psMoviesService", psMovies);
})();
