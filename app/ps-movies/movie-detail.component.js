(function () {
  var controller = function ($stateParams) {
    var model = this;
    model.id = $stateParams.id;
  };
  var module = angular.module("PsMovies");
  module.component("movieDetail", {
    templateUrl: "/ps-movies/movie-detail.component.html",
    controllerAs: "model",
    controller: ["$stateParams", controller],
  });
})();
