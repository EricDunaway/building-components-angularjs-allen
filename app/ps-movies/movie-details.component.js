(function () {
  var controller = function ($stateParams) {
    var model = this;
    model.id = $stateParams.id;
  };
  var module = angular.module("PsMovies");
  module.component("movieDetails", {
    templateUrl: "/ps-movies/movie-details.component.html",
    controllerAs: "model",
    controller: ["$stateParams", controller]
  });
})();
